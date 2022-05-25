import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useInstance } from 'react-ioc';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { Separator } from '../../components/Separator';
import { CalendarView } from '../../components/CalendarView/CalendarView';
import style from './style';
import { CHEVRON_RIGHT } from '../../resources/images';
import { Header } from '../../components/Header';
import { MainStackProps } from '../../navigation/types';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { Typography } from '../../components/Typography';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { useMount } from '../../lib/hooks';
import { setFreeDates, setTime } from '../../redux/actions';
import { UserRepository } from '../../model/repositories/UserRepository';
import { useAppSelector } from '../../redux/hooks/selectors';
import I18n from '../../resources/localization/translations';

export function SelectDataTime(props: StackScreenProps<MainStackProps>) {
  const dispatch = useDispatch();

  const redux = useInstance(EntryViewModels);
  const userModel = useInstance(UserRepository);
  const reduxEntry = redux.getEntry();
  const reduxTime = useAppSelector(state => state.time);
  const reduxDate = useAppSelector(state => state.date);

  const [selectDate, setSelectDate] = useState<string>('');
  const [selectTime, setSelectTime] = useState<string>('');
  const [load, setLoad] = useState(true);
  const [loadTime, setLoadTime] = useState(false);

  useMount(async () => {
    const freeDate = await userModel.appointmentDates(reduxEntry.clubId, reduxEntry.serviceId.length > 0 ? reduxEntry.serviceId : undefined, undefined, undefined, reduxEntry.employeeId.length > 0 ? reduxEntry.employeeId : undefined);
    dispatch(setFreeDates(freeDate));
    setLoad(false);
  });

  const dates = useMemo(() => {
    let t = {};
    reduxDate.forEach((value) => {
      t = {
        ...t,
        [value]: {
          disabled: false,
          disableTouchEvent: false,
          selected: selectDate! === value,
          customStyles: {
            container: selectDate! === value ? style.bg : null,
            text: selectDate! === value ? style.text : { color: StyleGuide.palette.black },
          },
        },
      };
    });
    return t;
  }, [reduxDate, selectDate]);

  const setDate = useCallback((dat: string, time: string) => {
    setSelectTime(time);
    setSelectDate(dat);
  }, []);

  const setDateTime = useCallback(async (dat: string, times: string) => {
    setLoadTime(true);
    setDate(dat, times);
    dispatch(setTime(await userModel.appointmentTimes(reduxEntry.clubId, reduxEntry.serviceId.length > 0 ? reduxEntry.serviceId : undefined, dat, moment(dat).add(1, 'days').format('YYYY-MM-DD'), reduxEntry.employeeId.length > 0 ? reduxEntry.employeeId : undefined)));
    setLoadTime(false);
  }, [dispatch, reduxEntry.clubId, reduxEntry.employeeId, reduxEntry.serviceId, setDate, userModel]);

  const pressContinue = useCallback(() => {
    redux.setEntry({ ...reduxEntry, date: moment(selectDate).locale(I18n.locale).format('YYYY-MM-DD'), time: selectTime });
    setDate('', '');
    props.navigation.navigate('event');
  }, [props.navigation, redux, reduxEntry, selectDate, selectTime, setDate]);

  const renderButtonContinue = useCallback(() => (
    !load ? <View style={style.containerButton}>
      <TouchableOpacity
        disabled={selectTime.length === 0}
        onPress={pressContinue}
        style={selectTime.length === 0 ? style.disableButton : style.activeButton}
      >
        {selectTime.length === 0 ? <Typography
          color={StyleGuide.palette.white}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('selectTime')}</Typography> : <Typography
          color={StyleGuide.palette.white}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('continue')}</Typography>}
        <Image
          source={CHEVRON_RIGHT}
          style={style.image}
        />
      </TouchableOpacity>
    </View> : null
  ), [load, pressContinue, selectTime.length]);

  const pressTime = useCallback((value: {dateTime: string, appointmentId: string}) => {
    setSelectTime(value.dateTime);
    redux.setEntry({ ...reduxEntry });
  }, [redux, reduxEntry]);

  const renderTimes = useCallback((item : {dateTime: string, appointmentId: string}) => {
    const onPress = () => pressTime(item.item);
    return (
      <TouchableOpacity
        onPress={onPress}
        style={selectTime === item.item.dateTime ? style.selectTime : style.time}
      >
        <Typography
          color={selectTime === item.item.dateTime ? StyleGuide.palette.white : StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR14}
        > {item.item.dateTime}</Typography>
      </TouchableOpacity>);
  }, [pressTime, selectTime]);

  const monthPress = useCallback(() => {
    setSelectDate('');
    setSelectTime('');
  }, []);

  const renderMainContent = useCallback(() => (
    <ScrollView
      contentContainerStyle={style.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={style.radius16}>
        <CalendarView
          mark={dates}
          monthPress={monthPress}
          setDateTime={setDateTime}
        />
        <Separator
          color={StyleGuide.palette.light_gray}
          height={1}
        />
        {!loadTime && selectDate.length > 0
         ? <View style={style.viewSelectTime}>
           <Typography
             color={StyleGuide.palette.dark_grey}
             style={style.padding16}
             type={TypographyTypes.REGULAR16}
           >{I18n.t('selectTime')} {moment(selectDate).format('DD')} {moment(selectDate).locale(I18n.locale).format('MMMM')}:</Typography>
           <FlatList
             contentContainerStyle={style.styleScroll}
             data={reduxTime}
             horizontal={true}
             keyExtractor={item => item.dateTime}
             ListEmptyComponent={() => (
               <View>
                 <Typography
                   color={StyleGuide.palette.dark_grey}
                   type={TypographyTypes.REGULAR14}
                 >{I18n.t('noFreeTime')}</Typography>
               </View>
             )}
             renderItem={renderTimes}
             showsHorizontalScrollIndicator={false}
             style={style.list}
           />
         </View> : null}
        {loadTime ? <View style={style.load}>
          <ActivityIndicator color={StyleGuide.palette.pink} />
        </View> : null }
      </View>
    </ScrollView>
  ), [dates, loadTime, monthPress, reduxTime, renderTimes, selectDate, setDateTime]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.mainContainer}
    >
      <Header
        onBackPress={props.navigation.goBack}
        title={I18n.t('dateTime')}
      />
      <View style={style.container}>
        <View />
        {load ? <ActivityIndicator
          color={StyleGuide.palette.pink}
        />
              : renderMainContent()}
        <View />
      </View>
      {renderButtonContinue()}
    </SafeAreaView>
  );
}
