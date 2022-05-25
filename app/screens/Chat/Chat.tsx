/* eslint linebreak-style: ["error", "windows"] */
import React, { useCallback, useMemo, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, FlatList, Image, ListRenderItemInfo, TouchableOpacity, View, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInstance } from 'react-ioc';
import { StackScreenProps } from '@react-navigation/stack';
import moment from 'moment';
import { CHAT_COLOR } from '../../resources/images';
import style from './style';
import { Header } from '../../components/Header';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { Separator } from '../../components/Separator';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { EntryProps, MainStackProps } from '../../navigation/types';
import { Clubs, WorkTime } from '../../lib/types';
import { useAppSelector } from '../../redux/hooks/selectors';
import I18n from '../../resources/localization/translations';

export function Branches(props: StackScreenProps<MainStackProps & EntryProps>) {
  const reduxEntry = useInstance(EntryViewModels);

  const { width, height } = Dimensions.get('window');

  const clubs = useAppSelector(state => state.clubs);
  const language = useAppSelector(state => state.app.language);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.15;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const MAP = useMemo(() => ({
    latitude: clubs.length > 0 ? Number(clubs[0].lat) : 0,
    longitude: clubs.length > 0 ? Number(clubs[0].lon) : 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }), [LONGITUDE_DELTA, clubs]);

  const flatList = useRef<FlatList>(null);

  const mapRef = useRef<MapView>(null);

  const markerPress = useCallback((coordinates: {latitude: number, longitude: number}[], index: number) => {
    mapRef.current!.fitToCoordinates(coordinates, { animated: true });
    flatList.current?.scrollToIndex({ index });
  }, [mapRef, flatList]);

  const renderMarkers = useCallback((value: Clubs, index: number) => {
    const coordinate = { latitude: Number(value.lat), longitude: Number(value.lon) };
    const onPress = () => markerPress([{ latitude: coordinate.latitude - 0.002086, longitude: coordinate.longitude - 0.000261 }, { latitude: coordinate.latitude + 0.002086, longitude: coordinate.longitude + 0.000261 }], 0);
    return (
      <Marker
        coordinate={coordinate}
        key={index}
        onPress={onPress}
      >
        <Image
          source={CHAT_COLOR}
          style={style.marker}
        />
      </Marker>
    );
  }, [markerPress]);

  const pressBranch = useCallback((item: Clubs) => {
    reduxEntry.setEntry({ ...reduxEntry.getEntry(), filial: item.title, clubId: item.id });
    props.navigation.navigate('entryStack', { screen: 'event' });
  }, [props.navigation, reduxEntry]);

  const returnWorkTime = useCallback((workTime: WorkTime[]) => (
    moment(workTime[workTime.length - 1].start).format('HH:mm') + '-' + moment(workTime[workTime.length - 1].finish).format('HH:mm')
  ), []);

  const renderBranch = useCallback((date: ListRenderItemInfo<Clubs>) => {
    const onPressBranch = () => {
      pressBranch(date.item);
    };

    const pressPhone = () => {
      Linking.openURL(`tel:${date.item.address}`);
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={date.item.id}
        onPress={onPressBranch}
        style={style.viewBranchFirst}
      >
        <Typography
          numberOfLines={1}
          style={style.title}
          type={TypographyTypes.REGULAR18}
        >{date.item.title}</Typography>
        <TouchableOpacity
          onPress={pressPhone}
          style={style.phoneTouch}
        >
          <Typography
            color={StyleGuide.palette.dark_grey}
            style={style.address}
            type={TypographyTypes.REGULAR14}
          >{date.item.address}</Typography>
        </TouchableOpacity>
        <Separator
          color={StyleGuide.palette.light_gray}
          height={1}
        />
        <Separator color={StyleGuide.palette.separator} />
        <View style={style.viewFreeTime}>
          <Typography
            color={StyleGuide.palette.dark_grey}
            type={TypographyTypes.REGULAR14}
          >{I18n.t('actionPeriod')} </Typography>
          <Typography
            style={style.date}
            type={TypographyTypes.REGULAR14}
          >{I18n.t('actionPeriodtime')}</Typography>
        </View>
      </TouchableOpacity>);
  }, [returnWorkTime, pressBranch]);

  const renderViewBranches = useCallback(() => (
    <FlatList
      data={clubs}
      horizontal
      keyExtractor={item => item.id}
      ref={flatList}
      renderItem={renderBranch}
      showsHorizontalScrollIndicator={false}
    />
  ), [clubs, renderBranch]);

  const renderMainContent = useCallback(() => (
    <View style={style.branches}>
      <View style={style.viewBranches}>
        {renderViewBranches()}
      </View>
    </View>
  ), [renderViewBranches, language]);

  const renderEmptyScreen = useCallback(() => (
    <View style={style.emptyScreen}>
      <Typography type={TypographyTypes.REGULAR14}>{I18n.t('noBranchesFound')}</Typography>
    </View>
  ), [language]);

  return (
    <SafeAreaView
      edges={['top']}
      style={style.container}
    >
      <Header title={I18n.t('branches')} />
      <View style={style.flex1}>
        <MapView
          initialRegion={MAP}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={style.mapStyle}
        >
          {clubs.map(renderMarkers)}
        </MapView>
        {clubs.length > 0 ? renderMainContent() : renderEmptyScreen() }
      </View>
    </SafeAreaView>
  );
}
