import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import style from './style';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { Typography } from '../Typography';
import { SEARCH_IMG, WIFI } from '../../resources/images';

interface Props{
  internetConnection: boolean;
}

export function Errors(props: Props) {
  const connectionProblems = () => (
    <View>
      <View style={style.mainContainer}>
        <Image
          source={WIFI}
          style={style.wifiImg}
        />
        <Typography
          style={style.title}
          type={TypographyTypes.REGULAR24}
        >Что-то со связью</Typography>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR18}
        >Кажется, нет интернета.</Typography>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR18}
        >Проверьте подключение</Typography>
      </View>
      <TouchableOpacity
        style={style.update}
      >
        <Typography
          color={StyleGuide.palette.white}
          textAlign='center'
          type={TypographyTypes.REGULAR16}
        >Обновить</Typography>
      </TouchableOpacity>
    </View>
  );

  const lostPage = () => (
    <View>
      <View style={style.mainContainer}>
        <Image
          source={SEARCH_IMG}
          style={style.searchImg}
        />
        <Typography
          style={style.title}
          type={TypographyTypes.REGULAR24}
        >Эта страница потерялась</Typography>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR18}
        >Записывайтесь на услуги,</Typography>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR18}
        >пока мы ищем пропажу</Typography>
      </View>
    </View>
  );

  return (
    <View style={style.container}>
      {props.internetConnection ? connectionProblems() : lostPage()}
    </View>
  );
}
