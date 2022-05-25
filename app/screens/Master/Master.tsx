import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useInstance } from 'react-ioc';
import { useDispatch } from 'react-redux';
import { MainStackProps } from '../../navigation/types';
import { Header } from '../../components/Header';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { CHEVRON_RIGHT } from '../../resources/images';
import style from './style';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { MasterCard } from '../../components/MasterCard/MasterCard';
import { Master } from '../../lib/types';
import { useMount } from '../../lib/hooks';
import { UserRepository } from '../../model/repositories/UserRepository';
import { setMasters } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks/selectors';
import I18n from '../../resources/localization/translations';
import SafeRefreshControl from '../../components/SafeRefreshControl';

export function MasterClass(props: StackScreenProps<MainStackProps>) {
  const dispatch = useDispatch();

  const reduxEntry = useInstance(EntryViewModels);
  const userModel = useInstance(UserRepository);

  const [selectMaster, setSelectMaster] = useState<Master>();

  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const flatList = useRef<FlatList<Master>>(null);

  const mastersRedux = useAppSelector(state => state.masters);
  const entry = useAppSelector(state => state.entry);

  const refresh = useCallback(async () => {
    const getMasters = await userModel.masters(reduxEntry.getEntry().serviceId.length > 0 ? reduxEntry.getEntry().serviceId : undefined, entry.clubId);
    dispatch(setMasters(getMasters.filter(value => value.name.toLowerCase() !== 'лист ожидания')));
  }, [dispatch, entry.clubId, reduxEntry, userModel]);

  useMount(async () => {
    await refresh();
    setLoad(false);
  });

  useEffect(() => {
    if (selectMaster) {
      const index = mastersRedux.findIndex(value => value.id === selectMaster.id);
      flatList.current?.scrollToIndex({ index, animated: true });
    }
  }, [mastersRedux, selectMaster]);

  const openInfoAboutMaster = useCallback((master: Master) => {
    props.navigation.navigate('selectMaster', { selectMasters: master });
  }, [props.navigation]);

  const _onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const renderMaster = useCallback(() => (
    <FlatList
      contentContainerStyle={style.flatList}
      data={mastersRedux}
      extraData={selectMaster}
      keyExtractor={item => item.id}
      onScrollToIndexFailed={(info) => {
        setTimeout(() => flatList.current?.scrollToIndex({
            index: info.index,
            animated: true,
          }));
      }}
      ref={flatList}
      refreshControl={
        <SafeRefreshControl
          onRefresh={_onRefresh}
          refreshing={refreshing}
        />
      }
      renderItem={({ item }) =>
        (
          <MasterCard
            master={item}
            needOpenInfoAboutMaster={openInfoAboutMaster}
            onSelectMaster={setSelectMaster}
            selectedMaster={selectMaster}
          />
        )}
      showsVerticalScrollIndicator={false}
    />
  ), [mastersRedux, selectMaster, _onRefresh, refreshing, openInfoAboutMaster]);

  const setEntry = useCallback(() => {
    reduxEntry.setEntry({
      ...entry,
      master: selectMaster!.name,
      employeeId: selectMaster!.id,
      date: '',
      time: '',
    });
  }, [entry, reduxEntry, selectMaster]);

  const onBackPress = useCallback(() => {
    setEntry();
    setSelectMaster(undefined);
    props.navigation.navigate('event');
  }, [props.navigation, setEntry]);

  const renderButtonContinue = useCallback(() => (
    <View style={style.viewButtonContinue}>
      <TouchableOpacity
        onPress={onBackPress}
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
  ), [onBackPress]);

  const pressBack = useCallback(() => {
    props.navigation.navigate('event');
  }, [props.navigation]);

  const renderContent = useCallback(() => (
    mastersRedux.length > 0
      ? <View style={style.mainContainer}>
        {renderMaster()}
        {selectMaster ? renderButtonContinue() : null}
      </View>
      : null), [mastersRedux.length, renderButtonContinue, renderMaster, selectMaster]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <Header
        onBackPress={pressBack}
        title={I18n.t('selectSpecialist')}
      />
      <View style={style.containerMasters}>
        <View />
        {load ? <ActivityIndicator color={StyleGuide.palette.pink} />
        : renderContent()
        }
        <View />
      </View>
    </SafeAreaView>
  );
}
