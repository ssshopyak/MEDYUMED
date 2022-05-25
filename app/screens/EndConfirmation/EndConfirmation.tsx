import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import { useInstance } from 'react-ioc';
import style from './style';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { Separator } from '../../components/Separator';
import { ADD, CLOCK, GEOLOCATION } from '../../resources/images';
import { Entry } from '../../lib/types';
import { MainStackProps } from '../../navigation/types';
import I18n from '../../resources/localization/translations';
import { useAppSelector } from '../../redux/hooks/selectors';
import { useMount } from '../../lib/hooks';
import { EntriesViewModels } from '../../model/viewModels/EntriesViewModels';

export function EndConfirmation(props: StackScreenProps<MainStackProps>) {
  const reduxEntries = useAppSelector(state => state.entries);
  const reduxEntriesViewModels = useInstance(EntriesViewModels);

  useMount(() => {}, () => {
    reduxEntriesViewModels.deleteEntries();
  });

  const content = useCallback((etr: Entry, index: number) => (
    <View
      key={index}
      style={style.touchConfirm}
    >
      <View style={style.content}>
        <Typography
          style={style.titleService}
          type={TypographyTypes.REGULAR16}
        >{etr.service}</Typography>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR17}
        >{etr.price}</Typography>
      </View>
      <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
      />
      <View style={style.viewGeolocation}>
        <Image
          source={GEOLOCATION}
          style={style.smallImg}
        />
        <Typography type={TypographyTypes.REGULAR14}>{etr.filial}</Typography>
      </View>
      <View style={style.viewClock}>
        <Image
          source={CLOCK}
          style={style.smallImg}
        />
        <Typography type={TypographyTypes.REGULAR14}>{moment(etr.date).locale(I18n.locale).format('DD MMMM, ')}{etr.time}</Typography>
      </View>
    </View>
  ), []);

  const renderContent = useCallback(() => {
    if (reduxEntries.length === 1) {
      return (
        <View style={style.contentStyle}>
          {content(reduxEntries[0], 0)}
        </View>);
    } else {
      return (
        <ScrollView
          contentContainerStyle={style.scrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {reduxEntries.map(content)}
        </ScrollView>
      );
    }
  }, [content, reduxEntries]);

  const renderAnimation = useCallback(() => (
    <LottieView
      autoPlay
      loop={false}
      /* eslint-disable-next-line global-require */
      source={require('../../resources/lottie/Checknew.json')}
      style={style.animImg}
    />
  ), []);

  const backInEntry = useCallback(() => {
    props.navigation.navigate('event');
  }, [props.navigation]);

  const renderButtonContinue = useCallback(() => (
    <TouchableOpacity
      onPress={backInEntry}
      style={style.touchStyle}
    >
      <Image
        source={ADD}
        style={style.imgRight}
      />
      <Typography
        color={StyleGuide.palette.white}
        textAlign='center'
        type={TypographyTypes.REGULAR14}
      >{I18n.t('newEntry')}</Typography>
    </TouchableOpacity>
  ), [backInEntry]);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.mainView}>
        <View style={style.mainContainer}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {renderAnimation()}
          </View>
          <Typography
            style={style.mainText}
            type={TypographyTypes.REGULAR20}
          >{I18n.t('successfullyRecorded!')}</Typography>
          {renderContent()}
        </View>
        <View style={style.viewButtonContinue}>
          {renderButtonContinue()}
        </View>
      </View>
    </SafeAreaView>
  );
}
