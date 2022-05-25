import React, { useState } from 'react';
import { Animated, Image, StyleProp, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import { Entry } from '../../lib/types';
import style from './styles';
import { Typography } from '../Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { CLOCK, DELETE, GEOLOCATION, PENCIL } from '../../resources/images';
import { Separator } from '../Separator';
import I18n from '../../resources/localization/translations';

interface VisitCardProps {
  entr: Entry,
  index: number
  setCommentEntry: (comment: string) => void,
  focusEntry: (entry: Entry) => void,
  deleteEntry: (entry: Entry) => void,
  changeEntry: (entry: Entry) => void,
}

export function VisitCard(props: VisitCardProps) {
  const {
    setCommentEntry,
    entr,
    index,
    focusEntry,
    deleteEntry,
    changeEntry,
  } = props;

  const [comment, setComment] = useState(entr.comment);

  const swipe: React.RefObject<Swipeable> = React.createRef();

  const setComments = (text: string) => {
    setComment(text);
  };

  const hide = () => {
    if (swipe.current) {
      swipe.current?.close();
    }
  };

  const pressDelEntry = () => {
    hide();
    deleteEntry(entr);
  };

  const pressChangeEntry = () => {
    hide();
    changeEntry(entr);
  };

  const renderSwipeButton = (title: string, styles: StyleProp<ViewStyle>, onPress: () => void, img: any) => (
    <TouchableOpacity
      onPress={onPress}
      style={styles}
    >
      <Image
        source={img}
        style={style.imgSwipe}
      />
      <Typography
        color={StyleGuide.palette.gray}
        type={TypographyTypes.REGULAR14}
      >{title}</Typography>
    </TouchableOpacity>
  );

  const renderSwipeable = (progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation) => {
    const opacity = dragX.interpolate({
      inputRange: [-50, -45, -25, -20],
      outputRange: [1, 0.5, 0, 0],
    });
    return (<Animated.View style={[style.animateView, { opacity }]}>
      <View style={style.containerAnim}>
        {renderSwipeButton(I18n.t('change'), style.pressChange, pressChangeEntry, PENCIL)}
        {renderSwipeButton(I18n.t('delete'), style.pressDel, pressDelEntry, DELETE)}
      </View>
    </Animated.View>);
  };

  const blur = () => {
    setCommentEntry(comment);
  };

  return (
    <Swipeable
      containerStyle={style.swipe}
      key={index}
      ref={swipe}
      renderRightActions={renderSwipeable}
    >
      <View
        style={style.mainView}
      >
        <View style={style.servicePrice}>
          <Typography
            style={style.titlePrice}
            type={TypographyTypes.REGULAR16}
          >{entr.service}</Typography>
          <Typography
            color={StyleGuide.palette.dark_grey}
            type={TypographyTypes.REGULAR16}
          >{entr.price}</Typography>
        </View>
        <Typography
          color={StyleGuide.palette.dark_grey}
          type={TypographyTypes.REGULAR14}
        >{entr.master}</Typography>
        <View style={style.description}>
          <Image
            source={GEOLOCATION}
            style={style.img}
          />
          <Typography type={TypographyTypes.REGULAR14}>{entr.filial}</Typography>
        </View>
        <View style={style.description}>
          <Image
            source={CLOCK}
            style={style.img}
          />
          <Typography type={TypographyTypes.REGULAR14}>{moment(entr.date)
            .locale(I18n.locale)
            .format('DD MMMM, ')}{entr.time}</Typography>
        </View>
        <Separator
          color={StyleGuide.palette.light_gray}
          height={1}
          wrapperStyle={style.mt}
        />
        <TextInput
          maxLength={1000}
          multiline
          onBlur={blur}
          onChangeText={setComments}
          onFocus={() => focusEntry(entr)}
          placeholder={I18n.t('commentToRecord') + '...'}
          placeholderTextColor={StyleGuide.palette.gray}
          returnKeyType='done'
          selectionColor={StyleGuide.palette.pink}
          style={style.mt}
          value={comment}
        />
      </View>
    </Swipeable>
  );
}
