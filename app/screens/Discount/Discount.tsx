import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useInstance } from 'react-ioc';
import moment from 'moment';
import styles from './style';
import { Header } from '../../components/Header';
import { SegmentSwitch } from '../../components/SegmentSwitch/SegmentSwitch';
import { ProfileProps } from '../../navigation/types';
import { BGG, SEARCH_IMG } from '../../resources/images';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import I18n from '../../resources/localization/translations';
import { useMount } from '../../lib/hooks';
import { UserRepository } from '../../model/repositories/UserRepository';
import { ICertificates, ServicesTickets } from '../../lib/types';

export function Discount(props: StackScreenProps<ProfileProps>) {
  const viewModelAuth = useInstance(UserRepository);

  const [selectedSegment, setSelectedSegment] = useState(0);
  const [tickets, setTickets] = useState<ServicesTickets[]>([]);
  const [certificates, setCertificates] = useState<ICertificates[]>([]);
  const [load, setLoad] = useState(true);

  useMount(async () => {
    const subscription = await viewModelAuth.getTickets();
    const getCertificates = await viewModelAuth.getCertificates();
    if (subscription && subscription.services) {
      setTickets(subscription.services);
    }
    if (getCertificates) {
      setCertificates(getCertificates);
    }
    setLoad(false);
  });

  const renderTicket = useCallback((value: ServicesTickets, index: number) => (
    <ImageBackground
      key={index}
      source={BGG}
      style={styles.card}
    >
      <Typography
        type={TypographyTypes.REGULAR16}
      >{value.title}</Typography>
      <View style={styles.subsUsed}>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('availableUses')}: </Typography>
        <Typography
          color={StyleGuide.palette.pink}
          type={TypographyTypes.REGULAR14}
        >{value.count}</Typography>
      </View>
      <Typography
        color={StyleGuide.palette.dark_grey}
        style={styles.number}
        type={TypographyTypes.REGULAR10}
      >{moment(value.endDate).format('DD.MM.YYYY')}</Typography>
    </ImageBackground>
  ), []);

  const renderCertificate = useCallback((value: ICertificates, index: number) => (
    <ImageBackground
      key={index}
      source={BGG}
      style={styles.card}
    >
      <Typography
        color={StyleGuide.palette.pink}
        style={styles.price}
        type={TypographyTypes.REGULAR20}
      >{value.sum}</Typography>
      <View style={styles.mainCertificate}>
        <Typography
          color={StyleGuide.palette.darkness_grey}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('remainder')}: {value.balance} ₽</Typography>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR10}
        >{moment(value.dateRegistration).format('DD.MM.YYYY')}</Typography>
      </View>
    </ImageBackground>
  ), []);

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

  const renderLoad = useCallback(() => (
    <View style={styles.emptyContainer}>
      <ActivityIndicator color={StyleGuide.palette.pink} />
    </View>
  ), []);

  const renderAllTickets = useCallback(() => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {tickets.map(renderTicket)}
    </ScrollView>
  ), [renderTicket, tickets]);

  const renderAllCertificates = useCallback(() => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {certificates.map(renderCertificate)}
    </ScrollView>
  ), [certificates, renderCertificate]);

  const renderFunction = useCallback((num: number) => {
    switch (num) {
      case 0:
        return tickets.length > 0 ? renderAllTickets() : renderEmptyScreen();
      default:
        return certificates.length > 0 ? renderAllCertificates() : renderEmptyScreen();
    }
  }, [certificates.length, renderAllCertificates, renderAllTickets, renderEmptyScreen, tickets.length]);

  const renderContent = useCallback(() => (
    load ? renderLoad() : renderFunction(selectedSegment)
  ), [load, renderFunction, renderLoad, selectedSegment]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={styles.container}
    >
      <Header
        onBackPress={props.navigation.goBack}
        title={I18n.t('subscriptionsAndCertificates')}
      />
      <View style={styles.mainContainer}>
        <SegmentSwitch
          date={[I18n.t('subscriptions'), I18n.t('certificates')]}
          onPress={setSelectedSegment}
          selectedSegment={selectedSegment}
        />
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}
