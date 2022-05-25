import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useInstance } from 'react-ioc';
import moment from 'moment';
import { EntryProps, MainStackProps } from '../../navigation/types';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { CLOSE, SEARCH_IMG } from '../../resources/images';
import { SegmentSwitch } from '../../components/SegmentSwitch/SegmentSwitch';
import style from './style';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { BigButton } from '../../components/buttons/BigButton';
import Avatar from '../../components/Avatar';
import { useMount } from '../../lib/hooks';
import { UserRepository } from '../../model/repositories/UserRepository';
import { ApiReview } from '../../model/api/apiTypes';
import Rating from '../../components/Rating';
import { CommentsViewModels } from '../../model/viewModels/CommentsViewModels';
import I18n from '../../resources/localization/translations';
import { IConfirmationEntries } from '../../lib/types';
import { useAppSelector } from '../../redux/hooks/selectors';
import { EntryCard } from '../../components/EntryCard/EntryCard';

export function SelectMaster(props: StackScreenProps<MainStackProps & EntryProps, 'selectMaster'>) {
  const { params } = props.route;

  const reduxEntry = useInstance(EntryViewModels);
  const userModel = useInstance(UserRepository);
  const reduxComments = useInstance(CommentsViewModels);
  const reduxClubs = useAppSelector(state => state.clubs);

  const [selectSegment, setSelectSegment] = useState(0);
  const [visits, setVisits] = useState<IConfirmationEntries[]>([]);
  const [load, setLoad] = useState(true);
  const [cancelLoad, setCancelLoad] = useState(false);

  const entry = reduxEntry.getEntry();

  // @ts-ignore
  const selectMasters = params!.selectMasters;
  const refreshVisits = params?.update;

  useMount(
    async () => {
      const feedbackRedux = await userModel.masterReviews(selectMasters!.id);
      reduxComments.setComments(feedbackRedux);
      const getVisits = await userModel.visitsHistory();
      setVisits(getVisits.filter(value => value.employee.id === selectMasters!.id));
      setLoad(false);
    },
    () =>
      reduxComments.setComments([]),
  );

  const pressWriteFeedback = useCallback((appointmentId: string) => {
    props.navigation.navigate('newFeedback', { appointmentId, selectMasters });
  }, [props.navigation, selectMasters]);

  const getDiff = useCallback((entryCancel: IConfirmationEntries) => {
    const testDateAppointmentId = moment(entryCancel.startDate);
    return moment.duration(moment().diff(testDateAppointmentId)).asSeconds();
  }, []);

  const cancelEntry = useCallback(async (entryCancel: IConfirmationEntries) => {
    setCancelLoad(true);
    if (getDiff(entryCancel) < 0) {
      await userModel.deleteAppointment(entryCancel.appointmentId);
      const feedbackRedux = await userModel.masterReviews(selectMasters!.id);
      reduxComments.setComments(feedbackRedux);
      const getVisits = await userModel.visitsHistory();
      setVisits(getVisits.filter(value => value.employee.id === selectMasters!.id));
      refreshVisits?.();
    } else {
      Alert.alert(I18n.t('error'), I18n.t('cannotCancelRecording'));
    }
    setCancelLoad(false);
  }, [getDiff, reduxComments, refreshVisits, selectMasters, userModel]);

  const pressRepeatEntry = useCallback(async (entryParam: IConfirmationEntries) => {
    const result = await userModel.appointmentServices(reduxClubs.filter(value => value.id === entryParam.clubId)[0].id, entryParam.employee.id, entryParam.service.id);
    if (Object.keys(result).length > 0) {
      reduxEntry.setEntry({
        ...entry,
        service: entryParam.service.title,
        serviceId: entryParam.service.id,
        price: Object.values(result)[0][0].price,
        master: entryParam.employee.name,
        employeeId: entryParam.employee.id,
        filial: reduxClubs.filter(value => value.id === entryParam.clubId)[0].title,
        clubId: entryParam.clubId,
        date: '',
        time: '',
      });
      props.navigation.navigate('entryStack', { screen: 'event' });
    } else {
      Alert.alert(I18n.t('serviceNoProvidedMaster'));
    }
  }, [entry, props.navigation, reduxClubs, reduxEntry, userModel]);

  const renderTest = useCallback((value: IConfirmationEntries, index: number) => (
    <View
      key={index}
      style={style.entryCard}
    >
      <EntryCard
        cancelEntry={cancelEntry}
        entry={value}
        filial={reduxClubs.filter(club => club.id === value.clubId)[0].title}
        load={cancelLoad}
        repeatEntry={pressRepeatEntry}
        writeFeedback={pressWriteFeedback}
      />
    </View>
  ), [cancelEntry, cancelLoad, pressRepeatEntry, pressWriteFeedback, reduxClubs]);

  const renderVisits = useCallback(() => {
    const actualVisits = visits.filter(value => value.status === 'planned');
    const canceledActualVisits = visits.filter(value => value.status === 'canceled');
    const pastActualVisits = visits.filter(value => value.status === 'ended');
    return (
      <View>
        {actualVisits.length > 0 ? <View>
          <Typography
            style={style.typeService}
            type={TypographyTypes.REGULAR14}
          >{I18n.t('upcoming')} ({actualVisits.length})</Typography>
          {actualVisits.map(renderTest)}
        </View> : null}
        {pastActualVisits.length > 0 ? <View>
          <Typography
            style={style.typeService}
            type={TypographyTypes.REGULAR14}
          >{I18n.t('past')} ({pastActualVisits.length})</Typography>
          {pastActualVisits.map(renderTest)}
        </View> : null}
        {canceledActualVisits.length > 0 ? <View>
          <Typography
            style={style.typeService}
            type={TypographyTypes.REGULAR14}
          >{I18n.t('canceled')} ({canceledActualVisits.length})</Typography>
          {canceledActualVisits.map(renderTest)}
        </View> : null}
      </View>
    );
  }, [renderTest, visits]);

  const renderEmptyScreen = useCallback(() => (
    <View style={style.emptyContainer}>
      <Image
        source={SEARCH_IMG}
        style={style.searchPhoto}
      />
      <Typography
        color={StyleGuide.palette.dark_grey}
        type={TypographyTypes.REGULAR14}
      >{I18n.t('haveAnythingYet')} :(</Typography>
    </View>
  ), []);

  const renderService = useCallback(() => (
    visits.length === 0 ? renderEmptyScreen() : <ScrollView
      contentContainerStyle={style.scrollStyle}
      showsVerticalScrollIndicator={false}
    >
      {renderVisits()}
    </ScrollView>
  ), [renderEmptyScreen, renderVisits, visits.length]);

  const renderReview = useCallback((value: ApiReview, index: number) => (
    <View
      key={index}
      style={style.viewReview}
    >
      <View style={style.viewContent}>
        <View style={style.viewStars}>
          <Rating
            disable={true}
            rating={value.rating}
            score={5}
            voted
          />
        </View>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR14}
        >{value.name}</Typography>
      </View>
      <Typography
        type={TypographyTypes.REGULAR14}
      >{value.review}</Typography>
    </View>
  ), []);

  const renderContentReview = useCallback(() =>
    (
      reduxComments.getComment().length === 0 ? renderEmptyScreen() : <ScrollView
        contentContainerStyle={style.scrollStyle}
        showsVerticalScrollIndicator={false}
      >
        {reduxComments.getComment().map(renderReview)}
      </ScrollView>
    ), [reduxComments, renderEmptyScreen, renderReview]);

  const renderLoad = useCallback(() => (
    <View style={style.emptyContainer}>
      <ActivityIndicator color={StyleGuide.palette.pink} />
    </View>
  ), []);

  const renderFunction = useCallback((num: number) => {
    switch (num) {
      case 0:
        return load ? renderLoad() : renderContentReview();
      default:
        return load ? renderLoad() : renderService();
    }
  }, [load, renderContentReview, renderLoad, renderService]);

  const pressEntry = useCallback(() => {
    reduxEntry.setEntry({ ...entry, master: selectMasters.name, employeeId: selectMasters.id });
    props.navigation.navigate('event');
  }, [entry, props.navigation, reduxEntry, selectMasters.id, selectMasters.name]);

  const pressClose = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const checkSelectSegment = useMemo(() => (selectSegment === 0), [selectSegment]);

  const renderButton = useCallback(() => (
    !checkSelectSegment && visits.length === 0 ? <BigButton
      containerStyle={style.buttonFeedback}
      onPress={pressEntry}
      text={I18n.t('join')}
      textColor={StyleGuide.palette.white}
    /> : null
  ), [checkSelectSegment, pressEntry, visits.length]);

  const renderButtonClose = useCallback(() => (
    <TouchableOpacity
      onPress={pressClose}
      style={style.touchClose}
    >
      <Image
        source={CLOSE}
        style={style.buttonClose}
      />
    </TouchableOpacity>
  ), [pressClose]);

  const renderMasterInfo = useCallback(() => (
    <View style={style.viewDescription}>
      <View style={style.ratingMaster}>
        <Rating
          disable
          key={selectMasters.rating}
          rating={selectMasters.rating}
          score={5}
          voted
        />
      </View>
      <Typography
        style={style.marginStyle}
        type={TypographyTypes.REGULAR18}
      >{selectMasters.name}</Typography>
      {selectMasters.position.id !== null && selectMasters.position.title.trim() !== selectMasters.about.trim() ? <Typography
        color={StyleGuide.palette.dark_grey}
        style={style.description}
        type={TypographyTypes.REGULAR14}
      >{selectMasters.position.title}</Typography> : null}
      {selectMasters.about.length > 0 ? <Typography
        color={StyleGuide.palette.dark_grey}
        style={style.description}
        type={TypographyTypes.REGULAR14}
      >{selectMasters.about}</Typography> : null}
    </View>
  ), [selectMasters.about, selectMasters.name, selectMasters.position.id, selectMasters.position.title, selectMasters.rating]);

  const renderCountText = useCallback((value: number) => (
    load ? '' : ' (' + value + ')'
  ), [load]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <View style={style.mainContainer}>
        <View style={style.viewButtonClose}>
          <Avatar
            photo={selectMasters.photo}
            style={style.avatar}
            user={{ firstName: selectMasters.name }}
          />
        </View>
        {renderMasterInfo()}
        <View style={style.viewSwitch}>
          <SegmentSwitch
            date={[I18n.t('feedback') + renderCountText(reduxComments.getComment().length), I18n.t('entries') + renderCountText(visits.length)]}
            onPress={setSelectSegment}
            selectedSegment={selectSegment}
          />
        </View>
        {renderFunction(selectSegment)}
        {renderButton()}
        {renderButtonClose()}
      </View>
    </SafeAreaView>
  );
}
