import React, { useCallback } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
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
import I18n from '../../resources/localization/translations';

export function Sale(props: StackScreenProps<MainStackProps>) {
  const reduxEntry = useInstance(EntryViewModels);

  // @ts-ignore
  const saleContent: IAppointmentServices[] = props.route.params?.saleContent;

  const renderSale = useCallback((value: IAppointmentServices, index: number) => {
    const onPress = () => {
      reduxEntry.setEntry({ ...reduxEntry.getEntry(), service: value.title, serviceId: value.id, price: value.price });
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

  return (
    <SafeAreaView style={style.container}>
      <Header
        onBackPress={props.navigation.goBack}
        title={I18n.t('stock')}
      />
      <View style={style.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={style.mainContent}>
            {saleContent.map(renderSale)}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
