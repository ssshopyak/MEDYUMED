import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useInstance } from 'react-ioc';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import style from './style';
import { Header } from '../../components/Header';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { MainStackProps, ProfileProps } from '../../navigation/types';
import { useAppSelector } from '../../redux/hooks/selectors';
import { UserRepository } from '../../model/repositories/UserRepository';
import { Clubs, IAppointmentServices, IPopularCategories } from '../../lib/types';
import { StockButton } from '../../components/buttons/StockButton';
import I18n from '../../resources/localization/translations';
import {
  setAppointmentServices, setBonuses, setConfirmedEntries, setEntry, setPopularCategories,
} from '../../redux/actions';
import SafeRefreshControl from '../../components/SafeRefreshControl';
import { BGG, CIRCLE } from '../../resources/images';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';

export function Main(props: StackScreenProps<MainStackProps & ProfileProps>) {
  const dispatch = useDispatch();

  const userModel = useInstance(UserRepository);
  const reduxEntryViewModels = useInstance(EntryViewModels);

  const reduxClubs = useAppSelector(state => state.clubs);
  const language = useAppSelector(state => state.app.language);
  const reduxEntry = useAppSelector(state => state.entry);
  const reduxBonuses = useAppSelector(state => state.bonuses);
  const reduxConfirmedEntries = useAppSelector(state => state.confirmedEntries);
  const reduxPopularCategories = useAppSelector(state => state.popularCategories);

  const flatList = createRef<FlatList>();
  let loadPopular = false;

  const [stock, setStock] = useState<IAppointmentServices[]>();
  const [load, setLoad] = useState(true);
  const [loadPopularState, setLoadPopularState] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (reduxClubs.length > 0 && reduxEntry.clubId.length > 0) {
      flatList.current?.scrollToIndex({
        animated: true,
        index: reduxClubs.findIndex(value => value.id === reduxEntry.clubId),
      });
    }
  }, [flatList, reduxClubs, reduxEntry.clubId]);

  const refresh = useCallback(async () => {
    setLoad(true);
    if (refreshing) {
      const bonuses = await userModel.getBonuses();
      if (bonuses) {
        dispatch(setBonuses(bonuses));
      }
      const getPopularCategories = await userModel.getPopularCategories();
      if (getPopularCategories.length > 0) {
        dispatch(setPopularCategories(getPopularCategories));
      }
      const entries = await userModel.visitsHistory();
      if (entries.length > 0) {
        dispatch(setConfirmedEntries(entries));
      }
    }
    const result = await userModel.appointmentServices(reduxEntry.clubId);
    if (Object.keys(result).length !== 0) {
      dispatch(setAppointmentServices(result));
      setStock(result['Акции']);
    }
    setLoad(false);
  }, [dispatch, reduxEntry.clubId, refreshing, userModel]);

  useMemo(async () => {
    if (reduxEntry.clubId) {
      await refresh();
    }
    const getPopularCategories = await userModel.getPopularCategories();
    if (getPopularCategories.length > 0) {
      dispatch(setPopularCategories(getPopularCategories));
    }
    const entries = await userModel.visitsHistory();
    if (entries.length > 0) {
      dispatch(setConfirmedEntries(entries));
    }
  }, [reduxEntry.clubId, dispatch, refresh, userModel, language]);

  const firstAvailableEntry = useMemo(() => {
    if (reduxConfirmedEntries.length > 0) {
      const planned = reduxConfirmedEntries.filter(value => value.status === 'planned');
      if (planned.length > 0) {
        const dateTime = planned[0]?.startDate;
        return moment(dateTime?.slice(0, 10)).format('DD MMMM , ') + dateTime?.slice(11);
      }
    }
    return I18n.t('entryNotFound');
  }, [reduxConfirmedEntries, language]);

  const lastAvailableEntry = useMemo(() => {
    if (reduxConfirmedEntries.length > 0) {
      const planned = reduxConfirmedEntries.filter(value => value.status !== 'planned');
      if (planned.length > 0) {
        const lastActualEntry = planned[planned.length - 1].service.title.slice(0, 13);
        return lastActualEntry + '...';
      } else {
        return I18n.t('entryNotFound');
      }
    }
    return I18n.t('entryNotFound');
  }, [reduxConfirmedEntries, language]);

  const tabs = useMemo(() => [
    {
      title: I18n.t('visits'),
      description: firstAvailableEntry,
      navigate: 'visits',
    },
    {
      title: I18n.t('bonuses'),
      description: reduxBonuses[0] ? reduxBonuses[0].balance + ' Б' : 0 + ' Б',
      navigate: 'bonuses',
    },
    {
      title: I18n.t('repeatRecord'),
      description: lastAvailableEntry,
      navigate: undefined,
    },
  ], [firstAvailableEntry, reduxBonuses, lastAvailableEntry, language]);

  const repeatEntry = useCallback(async () => {
    const planned = reduxConfirmedEntries.filter(value => value.status !== 'planned');
    if (planned.length > 0) {
      const plannedLast = planned[planned.length - 1];
      const result = await userModel.appointmentServices(plannedLast.clubId, plannedLast.employee.id, plannedLast.service.id);
      if (Object.keys(result).length > 0) {
        reduxEntryViewModels.setEntry({
          ...reduxEntry,
          service: plannedLast.service.title,
          serviceId: plannedLast.service.id,
          price: '',
          master: plannedLast.employee.name,
          employeeId: plannedLast.employee.id,
          filial: reduxClubs.filter(value => value.id === plannedLast.clubId)[0].title,
          clubId: plannedLast.clubId,
          date: '',
          time: '',
        });
        props.navigation.navigate('entryStack', { screen: 'event' });
      } else {
        Alert.alert(I18n.t('serviceNoProvidedMaster'));
      }
    }
  }, [props.navigation, reduxClubs, reduxConfirmedEntries, reduxEntry, reduxEntryViewModels, userModel]);

  const content = useCallback((tab: { title: string, description: string, navigate: string | undefined }, index: number) => {
    const onPress = () => {
      tab.navigate ? props.navigation.navigate(tab.navigate) : repeatEntry();
    };
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        onPress={onPress}
        style={style.tabs}
      >
        <Typography
          style={style.margin}
          type={TypographyTypes.REGULAR16}
        >{tab.title}</Typography>
        {tab.title === I18n.t('bonuses') ? <Typography
          color={StyleGuide.palette.pink}
          style={style.infoDescription}
          type={TypographyTypes.REGULAR14}
        >
          {tab.description}
        </Typography> : <View style={style.infoView}><Image
          source={CIRCLE}
          style={style.imgInfo}
        />
          <Typography
            color={StyleGuide.palette.dark_grey}
            type={TypographyTypes.REGULAR14}
          >{tab.description}</Typography>
        </View>}
      </TouchableOpacity>
    );
  }, [props.navigation, repeatEntry, language]);

  const renderContent = useCallback(() => (
    <ScrollView
      contentContainerStyle={style.contentStyleScroll}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={style.scrollView}
    >
      {tabs.map(content)}
    </ScrollView>
  ), [content, tabs, language]);

  const renderScrollFilials = useCallback(({ item }, index: number) => {
    const onPress = () => {
      dispatch(setEntry({
        ...reduxEntry,
        filial: item.title,
        clubId: item.id,
      }));
    };
    const itemStyle = reduxEntry.clubId === item.id ? style.selectFilial : style.filial;
    const color = reduxEntry.clubId === item.id ? StyleGuide.palette.pink : StyleGuide.palette.gray;
    return (
      <TouchableOpacity
        key={index}
        onPress={onPress}
        style={itemStyle}
      >
        <Typography
          color={color}
          type={TypographyTypes.REGULAR14}
        >
          {item.title}
        </Typography>
      </TouchableOpacity>
    );
  }, [dispatch, reduxEntry, language]);

  const allFilials = useCallback(() => (
    <FlatList<Clubs>
      contentContainerStyle={style.contentScroll}
      data={reduxClubs}
      horizontal
      keyExtractor={item => item.id}
      onScrollToIndexFailed={(info) => {
        setTimeout(() =>
          flatList.current?.scrollToIndex({
            index: info.index,
            animated: true,
          }));
      }}
      ref={flatList}
      renderItem={renderScrollFilials}
      showsHorizontalScrollIndicator={false}
      style={style.scrollMargin}
    />
  ), [reduxClubs, flatList, renderScrollFilials, language]);

  const pressStock = useCallback(() => {
    props.navigation.navigate('sale', {
      saleContent: stock,
    });
  }, [props.navigation, stock]);

  const renderStock = useCallback(() => (
    <StockButton
      count={stock?.length || 0}
      disabled={load || refreshing}
      load={load}
      onPress={pressStock}
      wrapperStyle={style.buttonStoke}
    />
  ), [stock?.length, load, refreshing, pressStock, language]);

  const _onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const navigateWithServices = useCallback(async (id: string) => {
    if (!loadPopular) {
      setLoadPopularState(true);
      loadPopular = true;
      const getCategories = await userModel.appointmentServices(reduxEntry.clubId, undefined, undefined, id);
      props.navigation.navigate('popularServices', {
        title: Object.keys(getCategories)[0],
        popularServiceContent: Object.values(getCategories)[0],
      });
      setLoadPopularState(false);
      loadPopular = false;
    }
  }, [userModel, reduxEntry.clubId, props.navigation]);

  const renderServices = useCallback((value: IPopularCategories, index: number) => (
    <PopularCategory
      disable={loadPopularState}
      key={index}
      onPress={navigateWithServices}
      value={value}
    />
  ), [loadPopularState, navigateWithServices]);

  const renderPopularCategory = useCallback(() => (
    <View style={style.mainContentCategory}>
      <View>
        <Typography
          style={style.textMargin}
          type={TypographyTypes.REGULAR18}
        >{I18n.t('popularCategory')}</Typography>
        <View style={style.containerCategory}>
          {reduxPopularCategories.map(renderServices)}
        </View>
      </View>
    </View>
  ), [reduxPopularCategories, renderServices, language]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <Header
        title={I18n.t('main')}
      />
      <View style={style.mainContainer}>
        <ScrollView
          contentContainerStyle={style.scroll}
          refreshControl={
            <SafeRefreshControl
              onRefresh={_onRefresh}
              refreshing={refreshing}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
          {allFilials()}
          {reduxPopularCategories.length > 0 ? renderPopularCategory() : null}
          {stock?.length ? <Typography
            style={style.textMargin}
            type={TypographyTypes.REGULAR18}
          >{I18n.t('hurryUpDiscount')}</Typography> : null}
          {stock?.length ? renderStock() : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

interface contentProps {
  value: IPopularCategories;
  onPress: (service: string) => void;
  disable: boolean,
}

function PopularCategory(props: contentProps) {
  const styles = StyleSheet.create({
    content: {
      overflow: 'hidden',
      borderRadius: 16,
      backgroundColor: StyleGuide.palette.white,
      height: 80,
      marginBottom: 10,
    },
    bggImg: {
      padding: 16,
      flex: 1,
    },
    categoryWrapper: {
      width: '50%',
      paddingHorizontal: 8,
    },
  });

  const onPress = useCallback(() => {
    props.onPress(props.value.id);
  }, [props]);

  return (
    <View style={styles.categoryWrapper}>
      <TouchableOpacity
        activeOpacity={1}
        disabled={props.disable}
        onPress={onPress}
        style={styles.content}
      >
        <ImageBackground
          source={BGG}
          style={styles.bggImg}
        >
          <Typography
            style={style.names}
            type={TypographyTypes.REGULAR14}
          >{props.value.name}</Typography>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
