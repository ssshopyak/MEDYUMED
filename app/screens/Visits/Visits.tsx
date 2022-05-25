import React, { useCallback, useMemo, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator, Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInstance } from 'react-ioc';
import { MainStackProps, ProfileProps } from '../../navigation/types';
import { Header } from '../../components/Header';
import { CHEVRON_RIGHT, SEARCH_IMG } from '../../resources/images';
import styles from './styles';
import { SegmentSwitch } from '../../components/SegmentSwitch/SegmentSwitch';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { IConfirmationEntries } from '../../lib/types';
import I18n from '../../resources/localization/translations';
import { useMount } from '../../lib/hooks';
import { UserRepository } from '../../model/repositories/UserRepository';
import SafeRefreshControl from '../../components/SafeRefreshControl';

export function Visits(props: StackScreenProps<ProfileProps & MainStackProps>) {
  const userModel = useInstance(UserRepository);

  const [selectedSegment, setSelectedSegment] = useState(0);
  const [actualVisits, setActualVisits] = useState<IConfirmationEntries[]>([]);
  const [_pastVisits, setPastActualVisits] = useState<IConfirmationEntries[]>([]);
  const pastVisits = useMemo((() => [..._pastVisits].reverse()), [_pastVisits]);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    const getVisits = await userModel.visitsHistory();
    setActualVisits(getVisits.filter(value => value.status === 'planned'));
    setPastActualVisits(getVisits.filter(value => value.status !== 'planned'));
  }, [userModel]);

  useMount(async () => {
    await refresh();
    setLoad(false);
  });

  const pressVisit = useCallback(async (visit: IConfirmationEntries) => {
    const getMasterClub = await userModel.masters(visit.service.id, visit.clubId, visit.employee.id);
    if (getMasterClub.length === 0) {
      Alert.alert(I18n.t('specialistNotFound'));
    } else {
      props.navigation.navigate('selectMaster', { selectMasters: getMasterClub[0], entry: true, update: refresh });
    }
  }, [props.navigation, refresh, userModel]);

  const renderVisit = useCallback((value: IConfirmationEntries, index: number) => {
    const onPress = async () => {
      await pressVisit(value);
    };

    const status = () => {
      if (value.status === 'ended') {
        return I18n.t('completedStatus');
      }
      return value.reasonClient && value.reasonClient.length > 0 ? value.reasonClient : I18n.t('canceledStatus');
    };

    return (
      <TouchableOpacity
        key={index}
        onPress={onPress}
        style={styles.containerVisits}
      >
        <View style={styles.containerMainInformation}>
          <View style={styles.flex1}>
            <Typography
              numberOfLines={1}
              style={styles.flex1}
              type={TypographyTypes.REGULAR16}
            >{value.service.title}</Typography>
            {value.status !== 'planned' ? <Typography
              color={StyleGuide.palette.dark_grey}
              numberOfLines={1}
              style={styles.ended}
              type={TypographyTypes.REGULAR16}
            >Статус: {status()}</Typography> : null}
            <View style={styles.description}>
              <Typography
                color={StyleGuide.palette.dark_grey}
                style={styles.flex1}
                type={TypographyTypes.REGULAR14}
              >{value.startDate}</Typography>
            </View>
          </View>
        </View>
        <Image
          source={CHEVRON_RIGHT}
          style={styles.standardPhoto}
        />
      </TouchableOpacity>
    );
  }, [pressVisit]);

  const renderEmptyScreen = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Image
        source={SEARCH_IMG}
        style={styles.searchPhoto}
      />
      <Typography
        color={StyleGuide.palette.dark_grey}
        type={TypographyTypes.REGULAR14}
      >{I18n.t('haveAnythingYet')} :(</Typography>
    </View>
  ), []);

  const _onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const renderVisits = useCallback((visits: IConfirmationEntries[]) => (
    visits.length > 0
      ? <ScrollView
          contentContainerStyle={styles.scroll}
          refreshControl={
            <SafeRefreshControl
              onRefresh={_onRefresh}
              refreshing={refreshing}
            />}
          showsVerticalScrollIndicator={false}
      >
        {visits.map(renderVisit)}
      </ScrollView>
      : renderEmptyScreen()
  ), [_onRefresh, refreshing, renderEmptyScreen, renderVisit]);

  const renderLoader = useCallback(() => (
    <View style={styles.emptyContainer}>
      <ActivityIndicator color={StyleGuide.palette.pink} />
    </View>
  ), []);

  const renderMainContent = useCallback((num: number) => {
    switch (num) {
      case 0:
        return load ? renderLoader() : renderVisits(actualVisits);
      default:
        return load ? renderLoader() : renderVisits(pastVisits);
    }
  }, [actualVisits, load, pastVisits, renderLoader, renderVisits]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={styles.container}
    >
      <Header
        onBackPress={props.navigation.goBack}
        title={I18n.t('visits')}
      />
      <View style={styles.mainContainer}>
        <SegmentSwitch
          date={[I18n.t('upcoming'), I18n.t('past')]}
          onPress={setSelectedSegment}
          selectedSegment={selectedSegment}
        />
        {renderMainContent(selectedSegment)}
      </View>
    </SafeAreaView>
  );
}
