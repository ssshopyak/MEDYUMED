import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useInstance } from 'react-ioc';
import moment from 'moment';
import { MainStackProps } from '../../navigation/types';
import { Header } from '../../components/Header';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { AGREE, CHEVRON_RIGHT, COLOR_AGREE } from '../../resources/images';
import style from './style';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { EntriesViewModels } from '../../model/viewModels/EntriesViewModels';
import I18n from '../../resources/localization/translations';
import { useAppSelector } from '../../redux/hooks/selectors';
import { UserRepository } from '../../model/repositories/UserRepository';

export function Entry(props: StackScreenProps<MainStackProps>) {
  const reduxEntryViewModels = useInstance(EntryViewModels);
  const saveEntryInRedux = useInstance(EntriesViewModels);
  const userModel = useInstance(UserRepository);
  const clubsRedux = useAppSelector(state => state.clubs);
  const reduxEntry = useAppSelector(state => state.entry);
  const reduxEntries = useAppSelector(state => state.entries);
  const reduxLanguage = useAppSelector(state => state.app.language);

  const [service, setService] = useState(reduxEntry.service);
  const [master, setMaster] = useState(reduxEntry.master);
  const [dateTime, setDateTime] = useState(reduxEntry.date + reduxEntry.time);
  const [checkDateTime, setCheckDateTime] = useState(true);
  const [load, setLoad] = useState(false);

  const flatList = createRef<FlatList>();

  useMemo(async () => {
    if (reduxEntry.service.length !== 0 && reduxEntry.master.length !== 0) {
      setLoad(true);
      const freeDate = await userModel.appointmentDates(reduxEntry.clubId, reduxEntry.serviceId.length > 0 ? reduxEntry.serviceId : undefined, undefined, undefined, reduxEntry.employeeId.length > 0 ? reduxEntry.employeeId : undefined);
      setCheckDateTime(freeDate.length === 0);
      setLoad(false);
    }
  }, [reduxEntry.master, reduxEntry.clubId, reduxEntry.employeeId, reduxEntry.serviceId, reduxEntry.service, userModel]);

  const scrollFilial = useCallback(() => {
    if (clubsRedux.length > 0 && flatList.current) {
      flatList.current.scrollToIndex({ animated: true, index: clubsRedux.findIndex(value => value.id === reduxEntry.clubId) });
    }
  }, [clubsRedux, flatList, reduxEntry.clubId]);

  const onFocusEvent = useCallback(() => {
    scrollFilial();
    setService(reduxEntry.service);
    setMaster(reduxEntry.master);
    setDateTime(reduxEntry.date + reduxEntry.time);
  }, [reduxEntry.date, reduxEntry.master, reduxEntry.service, reduxEntry.time, scrollFilial]);

  useEffect(() => {
    scrollFilial();
    props.navigation.addListener('focus', onFocusEvent);

    return () => {
      props.navigation.removeListener('focus', onFocusEvent);
    };
  }, [onFocusEvent, props.navigation, reduxEntry, scrollFilial]);

  const pressReset = useCallback(() => {
    reduxEntryViewModels.deleteEntry();
    setService('');
    setMaster('');
    setDateTime('');
    setCheckDateTime(true);
  }, [reduxEntryViewModels]);

  const renderFilial = useCallback(({ item }) => {
    const onPress = () => {
      pressReset();
      reduxEntryViewModels.setEntry({ ...reduxEntryViewModels.getEntry(), filial: item.title, clubId: item.id });
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        style={reduxEntry.clubId === item.id ? style.selectFilial : style.filial}
      >
        <Typography
          color={reduxEntry.clubId === item.id ? StyleGuide.palette.pink : StyleGuide.palette.gray}
          type={TypographyTypes.REGULAR14}
        >
          {item.title}
        </Typography>
      </TouchableOpacity>
    );
  }, [pressReset, reduxEntry, reduxEntryViewModels, reduxLanguage]);

  const allFilials = useCallback(() => (
    clubsRedux.length > 0 ? <FlatList
      contentContainerStyle={style.contentFlatlist}
      data={clubsRedux}
      horizontal={true}
      initialScrollIndex={reduxEntry.clubId ? clubsRedux.findIndex(value => value.id === reduxEntry.clubId) : 0}
      keyExtractor={item => item.id}
      onScrollToIndexFailed={(info) => {
        setTimeout(() => flatList.current?.scrollToIndex({
            index: info.index,
            animated: true,
          }));
}}
      ref={flatList}
      renderItem={renderFilial}
      showsHorizontalScrollIndicator={false}
      style={style.flatList}
    /> : null
  ), [clubsRedux, flatList, reduxEntry.clubId, renderFilial, reduxLanguage]);

  const renderButton = useCallback((information: string, nameService: string, route: string, disabled?: boolean) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => props.navigation.navigate(route)}
      style={information ? style.mainButtonInfo : style.mainButton}
    >
      <View style={style.info}>
        <Typography
          color={disabled ? StyleGuide.palette.gray : undefined}
          type={TypographyTypes.REGULAR16}
        >{nameService}</Typography>
        {information
         ? <Typography
             color={StyleGuide.palette.dark_grey}
             style={style.textTop}
             type={TypographyTypes.REGULAR14}
         >{information}</Typography> : null}
      </View>
      <Image
        source={information ? COLOR_AGREE : AGREE}
        style={style.image}
      />
    </TouchableOpacity>
  ), [props.navigation, reduxLanguage]);

  const renderDateTime = useCallback(() => {
    if (reduxEntry.date.length !== 0) {
      return moment(reduxEntry.date).locale(I18n.locale).format('DD MMMM, ') + reduxEntry.time;
    } else {
      return dateTime;
    }
  }, [dateTime, reduxEntry, reduxLanguage]);

  const renderButtons = useCallback(() => (
    <View style={style.buttonContainer}>
      {renderButton(service, I18n.t('services'), 'service')}
      {renderButton(master, I18n.t('master'), 'master')}
      {renderButton(renderDateTime(), I18n.t('dateTime'), 'selectData', checkDateTime)}
    </View>
  ), [checkDateTime, master, renderButton, renderDateTime, service, reduxLanguage]);

  const renderStrHint = useCallback(() => {
    let str = I18n.t('onlyChoiceLeft');
    if (service.length === 0) {
      str += ' ' + I18n.t('favor');
    }
    if (service.length === 0 && master.length === 0) {
      str += ' ' + I18n.t('and');
    }
    if (service.length === 0 && dateTime.length === 0) {
      str += ',';
    }
    if (master.length === 0) {
      str += ' ' + I18n.t('specialist');
    }
    if (dateTime.length === 0 && master.length === 0) {
      str += ',';
    }
    if (dateTime.length === 0) {
      str += ' ' + I18n.t('dateAndTime');
    }
    str += ' :)';
    return str;
  }, [dateTime.length, master.length, service.length, reduxLanguage]);

  const checkNotNeedText = useMemo(() => (
    service.length === 0 && master.length === 0 && dateTime.length === 0 || service.length !== 0 && master.length !== 0 && dateTime.length !== 0
  ), [dateTime.length, master.length, service.length]);

  const checkEmptyDateTime = useMemo(() => (
    service.length !== 0 && master.length !== 0 && checkDateTime
  ), [checkDateTime, master.length, service.length]);

  const renderHint = useCallback(() => {
    if (checkNotNeedText) {
      return null;
    } else {
      if (checkEmptyDateTime) {
        return (
          load ? <ActivityIndicator /> : <Typography
            color={StyleGuide.palette.pink}
            style={style.hint}
            type={TypographyTypes.REGULAR14}
          >{I18n.t('specialistBusy')}</Typography>
        );
      } else {
        return (<Typography
          color={StyleGuide.palette.dark_grey}
          style={style.hint}
          type={TypographyTypes.REGULAR14}
        >{renderStrHint()}</Typography>);
      }
    }
  }, [checkEmptyDateTime, checkNotNeedText, load, renderStrHint, reduxLanguage]);

  const renderRightButtonHeader = useCallback(() => {
    if (service || master || dateTime) {
      return (
        <TouchableOpacity
          onPress={pressReset}
          style={style.reset}
        >
          <Typography
            color={StyleGuide.palette.pink}
            type={TypographyTypes.REGULAR17}
          >{I18n.t('throw')}</Typography>
        </TouchableOpacity>
      );
    } else {
      return (<View />);
    }
  }, [dateTime, master, pressReset, service, reduxLanguage]);

  const onPressContinue = useCallback(() => {
    if (reduxEntries.filter(value => value.id === reduxEntry.id).length > 0) {
      const newChangeEntries = reduxEntries.map(value => (value.id === reduxEntry.id ? { ...reduxEntry, needBack: false } : value));
      saveEntryInRedux.setEntries(newChangeEntries);
    } else {
      saveEntryInRedux.setEntryInEntries(reduxEntry);
      reduxEntryViewModels.deleteEntry();
      setCheckDateTime(true);
    }
    props.navigation.navigate('confirmation');
  }, [props.navigation, reduxEntry, reduxEntryViewModels, reduxEntries, saveEntryInRedux]);

  const pressCreateOrder = useCallback(() => {
    props.navigation.navigate('confirmation');
    pressReset();
  }, [pressReset, props.navigation]);

  const renderButtonContinueView = useCallback((onPress: ()=>void, text: string) => (
    <TouchableOpacity
      onPress={onPress}
      style={style.touchStyle}
    >
      <Typography
        color={StyleGuide.palette.white}
        type={TypographyTypes.REGULAR14}
      >{text}</Typography>
      <Image
        source={CHEVRON_RIGHT}
        style={style.imgRight}
      />
    </TouchableOpacity>
  ), []);

  const renderButtonContinue = useCallback(() => {
    if (master && service && dateTime && reduxEntry.filial) {
      return (
        <View style={style.viewButtonContinue}>
          {renderButtonContinueView(onPressContinue, reduxEntry.needBack ? I18n.t('change') : I18n.t('makeVisit'))}
        </View>
      );
    } else {
      if (reduxEntries.length) {
        return (
          <View style={style.viewButtonContinue}>
            {renderButtonContinueView(pressCreateOrder, I18n.t('toMakeOrder'))}
          </View>
        );
      }
      return (<View />);
    }
  }, [master, service, dateTime, reduxEntry.filial, reduxEntry.needBack, renderButtonContinueView, onPressContinue, reduxEntries.length, pressCreateOrder, reduxLanguage]);

  const renderBackButton = useCallback(() => {
    props.navigation.navigate('confirmation');
  }, [props.navigation]);

  const renderErrorTextEmptyFilial = useCallback(() => (
    <Typography
      color={StyleGuide.palette.pink}
      style={style.emptyFilial}
      type={TypographyTypes.REGULAR14}
    >{I18n.t('pleaseSpecifyBranch')}</Typography>
  ), [reduxLanguage]);

  const renderEmptyFilialText = useCallback(() => (
    reduxEntry.filial.length === 0 ? renderErrorTextEmptyFilial() : null
  ), [reduxEntry, renderErrorTextEmptyFilial]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <Header
        onBackPress={reduxEntry.needBack ? renderBackButton : undefined}
        renderRightButton={renderRightButtonHeader}
        title={I18n.t('entry')}
      />
      <View style={style.mainContainer}>
        <ScrollView
          contentContainerStyle={style.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {allFilials()}
            {renderButtons()}
            {renderEmptyFilialText()}
            {renderHint()}
          </View>
        </ScrollView>
        {renderButtonContinue()}
      </View>
    </SafeAreaView>
  );
}
