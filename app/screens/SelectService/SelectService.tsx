import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useInstance } from 'react-ioc';
import { MainStackProps } from '../../navigation/types';
import { Header } from '../../components/Header';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { RadioGroup } from '../../components/controls';
import style from './style';
import { Separator } from '../../components/Separator';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { BigButton } from '../../components/buttons/BigButton';
import { IAppointmentServices } from '../../lib/types';
import I18n from '../../resources/localization/translations';

export function SelectServices(props: StackScreenProps<MainStackProps>) {
  const reduxEntry = useInstance(EntryViewModels);

  const [select, setSelect] = useState('');

  // @ts-ignore
  const title = props.route.params!.title;

  const content: IAppointmentServices[] = props.route.params?.content;

  const changeSelectService = useCallback((service: string) => {
    const resultObject = content.filter((cnt: { title: string, price: string }) => (cnt.title === service ? cnt : null));
    reduxEntry.setEntry({
      ...reduxEntry.getEntry(),
      price: resultObject[0].price,
      serviceId: resultObject[0].id,
      date: '',
      time: '',
    });
    setSelect(service);
  }, [content, reduxEntry]);

  const renderService = useCallback((srv: { title: string, price: string }, index: number) => (
    <View key={index}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelect(srv.title)}
        style={style.renderService}
      >
        <View style={{ flex: 1, maxWidth: '70%' }}>
          <RadioGroup
            confirmation={false}
            items={srv.title}
            onSelect={changeSelectService}
            selected={select}
            wrapperStyle={style.radioGroup}
          />
        </View>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR14}
        >{srv.price} ₽</Typography>
      </TouchableOpacity>
      <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
        wrapperStyle={style.separator}
      />
    </View>
  ), [changeSelectService, select]);

  const renderContent = useCallback(() => (
    <View style={style.containerService}>
      {content.map(renderService)}
    </View>
  ), [content, renderService]);

  const onBackPress = useCallback(() => {
    reduxEntry.setEntry({
      ...reduxEntry.getEntry(),
      service: select,
      date: '',
      time: '',
    });
    setSelect('');
    props.navigation.navigate('event');
  }, [props.navigation, reduxEntry, select]);

  const renderButtonContinue = useCallback(() => (
    <BigButton
      containerStyle={style.buttonFeedback}
      onPress={onBackPress}
      text={I18n.t('continue')}
    />
  ), [onBackPress]);

  const pressReset = () => {
    setSelect('');
  };

  const renderRightButtonHeader = useCallback(() => {
    if (select.length > 1) {
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
    }
    return null;
  }, [select.length]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <Header
        onBackPress={props.navigation.goBack}
        renderRightButton={renderRightButtonHeader}
        title={title}
      />
      <View style={style.mainContainer}>
        <ScrollView
          contentContainerStyle={style.scrollContentStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={style.viewContainer}>
            {renderContent()}
          </View>
        </ScrollView>
      </View>
      {select.length > 1 ? renderButtonContinue() : null}
    </SafeAreaView>
  );
}
