/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Image, Platform, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInstance } from 'react-ioc';
import { StackScreenProps } from '@react-navigation/stack';
import Share from 'react-native-share';
import { Header } from '../../components/Header';
import { HomeProps } from '../../navigation/types';
import { Separator } from '../../components/Separator';
import { INFO } from '../../resources/images';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import style from './style';
import { Typography } from '../../components/Typography';
import { useAppSelector } from '../../redux/hooks/selectors';
import I18n from '../../resources/localization/translations';
import { UserViewModel } from '../../model/viewModels/UserViewModels';
import { IUser } from '../../lib/types';

export function Bonuses(props: StackScreenProps<HomeProps>) {
  const reduxBonuses = useAppSelector(state => state.bonuses);
  const viewModel = useInstance(UserViewModel);
  const [data, setData] = useState<IUser>();
  const [visible, setVisible] = useState(false);
  async function get() {
    const getUserInfo = await viewModel.getUser();
    setData(getUserInfo);
  }
  get();
  const myCustomShare = async () => {
    get();
    const shareOptions = {
      message: 'Ваш Реферальный Код' + data.promocodes[0].promocode,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error=>', error);
    }
    setVisible(false);
  };
  // eslint-disable-next-line arrow-body-style
  const Prom = () => {
    return (
    // eslint-disable-next-line react/jsx-indent
    <Text>{data.promocodes.length > 0 ? data.promocodes[0].promocode : 0 } </Text>
    );
  };
  return (
    <SafeAreaView
      edges={['top']}
      style={style.container}
    >
      <Header
        onBackPress={props.navigation.goBack}
        title={I18n.t('myPoints')}
      />
      <View style={style.mainContainer}>
        {Platform.OS === 'ios' && <View style={style.smallView} />}
        <View style={style.shadow}>
          <View style={style.styleText}>
            <Typography
              style={style.mrr}
              type={TypographyTypes.REGULAR20}
            >{I18n.t('bonuses')}</Typography>
            <Typography
              color={StyleGuide.palette.pink}
              style={style.balance}
              type={TypographyTypes.REGULAR20}
            >{reduxBonuses.length > 0 ? reduxBonuses[0].balance : 0} Б</Typography>
          </View>
          <Separator
            color={StyleGuide.palette.light_gray}
            height={1}
            wrapperStyle={style.separator}
          />
          <View style={style.description}>
            <Image
              source={INFO}
              style={style.img}
            />
            <Typography
              color={StyleGuide.palette.dark_grey}
              style={style.padding}
              type={TypographyTypes.REGULAR14
            }
            >{I18n.t('bonusesDescription')}</Typography>
          </View>
        </View>
        <View style={style.shadow}>
          <TouchableOpacity style={style.row}>
            {visible
            ?
              <View>
                <Prom />
                <TouchableOpacity
                  onPress={myCustomShare}
                  style={style.button}

                >
                  <Text>Поделиться</Text>
                </TouchableOpacity>
              </View>
            :
              <Text onPress={() => setVisible(true)}>Пригласить Друзей</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
