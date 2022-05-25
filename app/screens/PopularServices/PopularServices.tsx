import React, { useCallback } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useInstance } from 'react-ioc';
import { Header } from '../../components/Header';
import { MainStackProps } from '../../navigation/types';
import style from './style';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { IAppointmentServices } from '../../lib/types';
import { SEARCH_IMG } from '../../resources/images';
import I18n from '../../resources/localization/translations';

export function PopularServices(props: StackScreenProps<MainStackProps>) {
  const reduxEntry = useInstance(EntryViewModels);

  // @ts-ignore
  const popularServiceContent: IAppointmentServices[] = props.route.params?.popularServiceContent;

  const renderServices = useCallback((value: IAppointmentServices, index: number) => {
    const onPress = () => {
      reduxEntry.setEntry({
        ...reduxEntry.getEntry(),
        service: value.title,
        serviceId: value.id,
        price: value.price,
        master: '',
        employeeId: '',
        date: '',
        time: '',
      });
      props.navigation.navigate('entryStack', { screen: 'event' });
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        onPress={onPress}
        style={style.touchSale}
      >
        <Typography
          style={style.title}
          type={TypographyTypes.REGULAR17}
        >{value.title}</Typography>
        <Typography
          color={StyleGuide.palette.pink}
          type={TypographyTypes.REGULAR14}
        >{value.price} ₽</Typography>
      </TouchableOpacity>
    );
  }, [props.navigation, reduxEntry]);

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

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <Header
        onBackPress={props.navigation.goBack}
        title={props.route.params?.title}
      />
      {popularServiceContent ? (
        <View style={style.mainContainer}>
          <ScrollView
            contentContainerStyle={style.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={style.mainContent}>

              {popularServiceContent.map(renderServices)}
            </View>
          </ScrollView>
        </View>) : renderEmptyScreen()}
    </SafeAreaView>
  );
}
