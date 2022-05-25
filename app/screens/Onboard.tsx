import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated, Dimensions, Image, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackProps } from '../navigation/types';
import {
  CHEVRON_RIGHT, HAND, HAND_PHONE, HEART, LOVE_CAT, MONKEY, MONKEY_CLOSE, MONKEY_OPEN, ONBOARD1, ONBOARD2, ONBOARD3,
  SIMPLE_CLOSE,
} from '../resources/images';
import { StyleGuide, TypographyTypes } from '../resources/StyleGuide';
import { Typography } from '../components/Typography';
import Smile from '../components/SmileAnimation/SmileAnimation';
import I18n from '../resources/localization/translations';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewButtonClose: {
    position: 'absolute',
    top: 25,
    left: width - 34,
    width: 18,
    height: 18,
  },
  buttonClose: {
    width: 18,
    height: 18,
  },
  touchStyle: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: StyleGuide.palette.pink,
    borderRadius: 16,
    alignItems: 'center',
  },
  viewButtonContinue: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  imgRight: {
    width: 10,
    height: 20,
    marginLeft: 10,
    tintColor: StyleGuide.palette.white,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  mainContainer: {
    backgroundColor: StyleGuide.palette.background, flex: 1,
  },
  mainView: {
    alignItems: 'center', justifyContent: 'center',
  },
  title: {
    fontWeight: StyleGuide.fontWeight.SEMI_BOLD, marginBottom: 20,
  },
  image: {
    marginTop: 30, width: 260, height: 460,
  },
  image1: {
    marginTop: 30, width: 290, height: 460,
  },
  description: {
    paddingHorizontal: 12,
  },
});

export function Onboard(props: StackScreenProps<AuthStackProps>) {
  const FULL = width - 50;
  const TWO_PARTS = 2 * (width - 50) / 3;
  const ONE_PART = (width - 50) / 3;

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);

  const animated = new Animated.Value(0);

  const content = useMemo(() => [{ title: I18n.t('savePoints'), description: I18n.t('firstSlide1') + '\n' + I18n.t('firstSlide2') + '\n' + I18n.t('firstSlide3'), image: ONBOARD1 }, { title: I18n.t('allAboutTheSpecialist'), description: I18n.t('secondSlide1') + '\n' + I18n.t('secondSlide2') + '\n' + I18n.t('secondSlide3'), image: ONBOARD2 }, { title: I18n.t('mostBeautiful'), description: I18n.t('thirdSlide'), image: ONBOARD3 }], []);

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [activeSlide, animated]);

  const pagination = useCallback(() => (
    <Pagination
      activeDotIndex={activeSlide}
      dotColor={StyleGuide.palette.pink}
      dotsLength={content.length}
      dotStyle={style.dot}
      inactiveDotColor={StyleGuide.palette.gray}
    />
  ), [activeSlide, content.length]);

  const generateLeftPositionCat = useCallback((i: number) => {
    if (i < 4) {
      return Math.floor(Math.random() * ONE_PART);
    }
    if (i < 8) {
      return Math.floor(Math.random() * (TWO_PARTS - ONE_PART)) + ONE_PART;
    } else {
      return Math.floor(Math.random() * (FULL - TWO_PARTS)) + TWO_PARTS;
    }
  }, [FULL, ONE_PART, TWO_PARTS]);

  const generateLeftPosition = useCallback((i: number) => {
    if (i === 0) {
      return Math.floor(Math.random() * ONE_PART);
    }
    if (i === 1) {
      return Math.floor(Math.random() * (TWO_PARTS - ONE_PART)) + ONE_PART;
    } else {
      return Math.floor(Math.random() * (FULL - TWO_PARTS)) + TWO_PARTS;
    }
  }, [FULL, ONE_PART, TWO_PARTS]);

  const navigateNextScreen = useCallback(() => {
    props.navigation.navigate('login');
  }, [props.navigation]);

  const renderClose = useCallback(() => (
    <View style={style.viewButtonClose}>
      <TouchableOpacity onPress={navigateNextScreen}>
        <Image
          source={SIMPLE_CLOSE}
          style={style.buttonClose}
        />
      </TouchableOpacity>
    </View>
  ), [navigateNextScreen]);

  const renderNameButton = useMemo(() => {
    switch (activeSlide) {
      case 0:
        return I18n.t('interesting');
      case 1:
        return I18n.t('wantToTry');
      default:
        return I18n.t('forward');
    }
  }, [activeSlide]);

  const pressButtonNext = useCallback(
    () =>
      (activeSlide === 2 ? props.navigation.navigate('login') : carouselRef.current?.snapToNext(true))
    , [activeSlide, props.navigation],
  );

  const renderButtons = useCallback(() => (
    <View style={style.viewButtonContinue}>
      <TouchableOpacity
        onPress={pressButtonNext}
        style={style.touchStyle}
      >
        <Typography
          color={StyleGuide.palette.white}
          type={TypographyTypes.REGULAR14}
        >{renderNameButton}</Typography>
        <Image
          source={CHEVRON_RIGHT}
          style={style.imgRight}
        />
      </TouchableOpacity>
      <SafeAreaView edges={['bottom']} />
    </View>
  ), [pressButtonNext, renderNameButton]);

  const renderMainContent = useCallback((item:ListRenderItemInfo<{ title: string; description: string; image: any; }>) => (
    <View style={style.mainView}>
      <Typography
        style={style.title}
        type={TypographyTypes.REGULAR24}
      >
        {item.item.title}
      </Typography>
      <Typography
        color={StyleGuide.palette.dark_grey}
        style={style.description}
        textAlign='center'
        type={TypographyTypes.REGULAR18}
      >
        {item.item.description}
      </Typography>
      <Image
        source={item.item.image}
        style={item.item.title === I18n.t('savePoints') ? style.image1 : style.image}
      />
    </View>
  ), []);

  const renderSmiles = useCallback(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(<Smile
        animationValue={animated}
        image={LOVE_CAT}
        key={i}
        left={generateLeftPositionCat(i)}
      />);
    }
    return arr;
  }, [animated, generateLeftPositionCat]);

  const renderSmilesMonkey = useCallback(() => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(<Smile
        animationValue={animated}
        image={HEART}
        key={12 + 4 * i}
        left={generateLeftPosition(i)}
      />);
      arr.push(<Smile
        animationValue={animated}
        image={MONKEY_CLOSE}
        key={13 + 4 * i}
        left={generateLeftPosition(i)}
      />);
      arr.push(<Smile
        animationValue={animated}
        image={MONKEY_OPEN}
        key={14 + 4 * i}
        left={generateLeftPosition(i)}
      />);
      arr.push(<Smile
        animationValue={animated}
        image={MONKEY}
        key={15 + 4 * i}
        left={generateLeftPosition(i)}
      />);
    }
    return arr;
  }, [animated, generateLeftPosition]);

  const renderSmilesHand = useCallback(() => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(<Smile
        animationValue={animated}
        image={HAND}
        key={24 + 4 * i}
        left={generateLeftPosition(i)}
      />);
      arr.push(<Smile
        animationValue={animated}
        image={HAND}
        key={25 + 4 * i}
        left={generateLeftPosition(i)}
      />);
      arr.push(<Smile
        animationValue={animated}
        image={HAND_PHONE}
        key={26 + 4 * i}
        left={generateLeftPosition(i)}
      />);
      arr.push(<Smile
        animationValue={animated}
        image={HAND_PHONE}
        key={27 + 4 * i}
        left={generateLeftPosition(i)}
      />);
    }
    return arr;
  }, [animated, generateLeftPosition]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.mainContainer}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          {pagination()}
          {renderClose()}
          <Carousel
            activeSlideAlignment='center'
            data={content}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            itemWidth={width}
            onSnapToItem={setActiveSlide}
            ref={carouselRef}
            renderItem={renderMainContent}
            sliderWidth={width}
            useScrollView
          />
          {activeSlide === 0 && renderSmiles()}
          {activeSlide === 1 && renderSmilesMonkey()}
          {activeSlide === 2 && renderSmilesHand()}
        </View>
      </ScrollView>
      {renderButtons()}
    </SafeAreaView>
  );
}
