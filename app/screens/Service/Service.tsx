import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useInstance } from 'react-ioc';
import { useDispatch } from 'react-redux';
import { MainStackProps } from '../../navigation/types';
import style from './style';
import { Header } from '../../components/Header';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { CHEVRON_RIGHT, SEARCH } from '../../resources/images';
import { Separator } from '../../components/Separator';
import { RadioGroup } from '../../components/controls';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { useMount } from '../../lib/hooks';
import { UserRepository } from '../../model/repositories/UserRepository';
import { useAppSelector } from '../../redux/hooks/selectors';
import { IAppointmentServices } from '../../lib/types';
import { StockButton } from '../../components/buttons/StockButton';
import I18n from '../../resources/localization/translations';
import { setAppointmentServices } from '../../redux/actions';
import SafeRefreshControl from '../../components/SafeRefreshControl';
import styles from '../Discount/style';

export function Service(props: StackScreenProps<MainStackProps>) {
  const dispatch = useDispatch();

  const reduxEntry = useInstance(EntryViewModels);
  const userModel = useInstance(UserRepository);
  const reduxAppointmentServices = useAppSelector(state => state.appointmentServices);

  const [appointmentServices, setMyAppointmentServices] = useState<{[key: string]: IAppointmentServices[]}>({});
  const [stock, setStock] = useState<IAppointmentServices[]>();
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [typeService, setTypeService] = useState<string[]>([]);

  const [pressSearch, setPressSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [searchSelect, setSearchSelect] = useState('');
  const [massSearch, setMassSearch] = useState<IAppointmentServices[]>([]);

  const getData = useCallback((object: {[key: string]: IAppointmentServices[]}) => {
    setStock(object['Акции']);
    setMyAppointmentServices(object);
    setTypeService(Object.keys(object));
  }, []);

  const refresh = useCallback(async () => {
    const result = await userModel.appointmentServices(reduxEntry.getEntry().clubId, reduxEntry.getEntry().employeeId.length > 0 ? reduxEntry.getEntry().employeeId : undefined);
    dispatch(setAppointmentServices(result));
    getData(result);
  }, [dispatch, getData, reduxEntry, userModel]);

  useMount(async () => {
    await refresh();
    setLoad(false);
  });

  const openSelectService = useCallback((title: string, content: IAppointmentServices[]) => {
    props.navigation.navigate('selectService', { title, content });
  }, [props.navigation]);

  const serviceSearch = useCallback((text: string) => {
    setLoad(true);
    if (text.length === 0) {
      setMassSearch([]);
    } else {
      const result: IAppointmentServices[] = [];
      Object.values(reduxAppointmentServices).forEach((v) => {
        const filterElem = v.filter(value => value.title.includes(text));
        result.push(...filterElem);
      });
      setMassSearch(result);
    }
    setTimeout(() => setLoad(false), 1000);
  }, [reduxAppointmentServices]);

  const pressStock = useCallback(() => {
    props.navigation.navigate('sale', { allService: typeService, saleContent: stock });
  }, [props.navigation, stock, typeService]);

  const renderStock = useCallback(() => (
    load || !stock ? null : <StockButton
      count={stock?.length || 0}
      disabled={load || refreshing}
      onPress={pressStock}
      wrapperStyle={style.buttonStoke}
    />
  ), [load, pressStock, refreshing, stock]);

  const renderService = useCallback((value: {title: string, content: IAppointmentServices[]}, index: number) => (
    <View key={index}>
      <TouchableOpacity
        disabled={load || refreshing}
        onPress={() => openSelectService(value.title, value.content)}
        style={style.serviceContent}
      >
        <Typography
          style={style.serviceTitle}
          type={TypographyTypes.REGULAR17}
        >{value.title}</Typography>
        <View style={style.nameContent}>
          <Typography
            color={StyleGuide.palette.dark_grey}
            type={TypographyTypes.REGULAR17}
          >{value.content.length}</Typography>
          <Image
            source={CHEVRON_RIGHT}
            style={style.imgRight}
          />
        </View>
      </TouchableOpacity>
      {index !== Object.keys(appointmentServices).length - 1 && <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
      />}
    </View>
  ), [appointmentServices, load, openSelectService, refreshing]);

  const getFiltersService = useMemo(() => (
    Object.keys(appointmentServices)
      .filter(key => key !== 'Акции').map(key => ({ title: key, content: appointmentServices[key] }))
  ), [appointmentServices]);

  const renderEmptyScreen = useCallback(() => (
    <View style={style.emptyScreen}><Typography type={TypographyTypes.REGULAR14}>{I18n.t('nothingFound')}</Typography></View>
  ), []);

  const renderContentServices = useCallback(() => (
    <View style={style.allService}>
      {getFiltersService.map(renderService)}
    </View>
  ), [getFiltersService, renderService]);

  const renderAllServices = useCallback(() => (
    load ? null : renderContentServices()
  ), [load, renderContentServices]);

  const needPressSearch = useCallback(() => {
    setPressSearch(true);
  }, []);

  const renderRightButtonHeader = useCallback(() => (
    <TouchableOpacity
      disabled={load}
      onPress={needPressSearch}
    >
      <Image
        source={SEARCH}
        style={style.rightButton}
      />
    </TouchableOpacity>
  ), [load, needPressSearch]);

  const changeText = useCallback(async (text: string) => {
    setLoad(true);
    setSearch(text);
    serviceSearch(text);
    setTimeout(() => setLoad(false), 1000);
  }, [serviceSearch]);

  const onPressCancel = useCallback(() => {
    setSearch('');
    setPressSearch(false);
    setMassSearch([]);
    setSearchSelect('');
  }, []);

  const renderSearch = useCallback(() => (
    <View style={style.headerTitle}>
      <View style={style.headerInput}>
        <TextInput
          onChangeText={changeText}
          placeholder={I18n.t('searchForServices')}
          placeholderTextColor={StyleGuide.palette.gray}
          returnKeyType='done'
          selectionColor={StyleGuide.palette.pink}
          style={style.touchSearchStyle}
          value={search}
        />
      </View>
      <TouchableOpacity onPress={onPressCancel}>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('cancel2')}</Typography>
      </TouchableOpacity>
    </View>
  ), [changeText, onPressCancel, search]);

  const renderSearchDataContent = useCallback((value: IAppointmentServices, index: number) => (
    <View key={index}>
      <View style={style.renderService}>
        <RadioGroup
          confirmation={false}
          items={value.title}
          onSelect={setSearchSelect}
          selected={searchSelect}
          wrapperStyle={style.radioGroup}
        />
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR14}
        >{value.price} ₽</Typography>
      </View>
      {index !== massSearch.length - 1 && <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
        wrapperStyle={style.separator}
      />}
    </View>
  ), [searchSelect, massSearch.length]);

  const renderSearchData = useCallback(() => (
    massSearch.map(renderSearchDataContent)
  ), [renderSearchDataContent, massSearch]);

  const onPressContinue = useCallback(() => {
    reduxEntry.setEntry({
      ...reduxEntry.getEntry(),
      service: searchSelect,
      serviceId: massSearch.filter(value => value.title === searchSelect)[0].id,
    });
    props.navigation.navigate('event');
  }, [props.navigation, reduxEntry, searchSelect, massSearch]);

  const renderButtonContinue = useCallback(() => (
    <View style={style.viewButtonContinue}>
      <TouchableOpacity
        onPress={onPressContinue}
        style={style.touchStyle}
      >
        <Typography
          color={StyleGuide.palette.white}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('continue')}</Typography>
        <Image
          source={CHEVRON_RIGHT}
          style={style.imgRight}
        />
      </TouchableOpacity>
    </View>
  ), [onPressContinue]);

  const renderLoad = useCallback(() => (
    <View style={styles.emptyContainer}>
      <ActivityIndicator color={StyleGuide.palette.pink} />
    </View>
  ), []);

  const renderTest = useCallback(() => (
    massSearch.length !== 0 && pressSearch ? <ScrollView
      contentContainerStyle={style.scrollContentStyle}
      showsVerticalScrollIndicator={false}
    ><View style={style.mainContentSearch}>{renderSearchData()}</View></ScrollView> : renderEmptyScreen()
  ), [pressSearch, renderEmptyScreen, renderSearchData, massSearch.length]);

  const renderViewSearch = useCallback(() => (
    load ? renderLoad() : renderTest()
  ), [load, renderLoad, renderTest]);

  const _onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const renderScrollContent = useCallback(() =>
    (
      stock?.length > 0 || getFiltersService.length > 0 ? <ScrollView
        contentContainerStyle={style.scrollContentStyle}
        refreshControl={
          <SafeRefreshControl
            onRefresh={_onRefresh}
            refreshing={refreshing}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderStock()}
        {renderAllServices()}
      </ScrollView> : renderEmptyScreen()
    ), [_onRefresh, getFiltersService.length, refreshing, renderAllServices, renderEmptyScreen, renderStock, stock?.length]);

  const renderContent = useCallback(() => (
    pressSearch
      ? renderViewSearch()
      : <View style={style.scrollContent}>
        {renderScrollContent()}
      </View>
  ), [pressSearch, renderScrollContent, renderViewSearch]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <Header
        onBackPress={props.navigation.goBack}
        renderRightButton={renderRightButtonHeader}
        renderSearch={renderSearch}
        search={pressSearch}
        title={I18n.t('availableServices')}
      />
      <View style={style.mainContainer}>
        {load ? renderLoad() : renderContent()}
        {searchSelect.length > 0 ? renderButtonContinue() : null}
      </View>
    </SafeAreaView>
  );
}
