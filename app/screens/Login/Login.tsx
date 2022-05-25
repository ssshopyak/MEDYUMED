import React, { RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputMask from 'react-native-text-input-mask';
import { StackScreenProps } from '@react-navigation/stack';
import { useInstance } from 'react-ioc';
import { useDispatch } from 'react-redux';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import style from './style';
import { CHEVRON_LEFT, CHEVRON_RIGHT } from '../../resources/images';
import CodeEnter from '../../components/CodeEnter';
import { AuthStackProps } from '../../navigation/types';
import { UserViewModel } from '../../model/viewModels/UserViewModels';
import { KAV } from '../../components/KAV';
import { UserRepository } from '../../model/repositories/UserRepository';
import I18n from '../../resources/localization/translations';
import { setBonuses } from '../../redux/actions';

export function Login(props: StackScreenProps<AuthStackProps>) {
  const dispatch = useDispatch();

  const viewModel = useInstance(UserViewModel);
  const viewModelAuth = useInstance(UserRepository);

  const codeInputRef: RefObject<CodeEnter> = useRef(null);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [needRenderPhoneScreen, setNeedRenderPhoneScreen] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [load, setLoad] = useState(false);

  useMemo(() => {
    if (seconds > 0 && !needRenderPhoneScreen) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [needRenderPhoneScreen, seconds]);

  const needBack = useCallback(() => {
    setNeedRenderPhoneScreen(true);
    setCode('');
  }, []);

  const setToken = useCallback((token: string) => {
    viewModel.setToken(token);
    viewModel.setTokenN(token);
  }, [viewModel]);

  const setMainInfoRedux = useCallback(async () => {
    viewModel.getUser(phone);
  }, [phone, viewModel]);

  const checkAuth = useCallback(async () => {
    const token = await viewModelAuth.checkCode(phone.replace(/\s/g, ''), code);
    if (token) {
      const resultAuth = await viewModelAuth.auth(phone.replace(/\s/g, ''));
      if (resultAuth && resultAuth.userToken) {
        setToken(resultAuth.userToken);
        await setMainInfoRedux();
        const bonuses = await viewModelAuth.getBonuses();
        if (bonuses && bonuses.length > 0) {
          dispatch(setBonuses(bonuses));
        }
      } else {
        viewModel.setPhone(phone);
        viewModel.setPhoneDB(phone);
        setToken(token);
        props.navigation.navigate('registration_name');
      }
    }
  }, [code, dispatch, phone, props.navigation, setMainInfoRedux, setToken, viewModel, viewModelAuth]);

  const needNextScreen = useCallback(async () => {
    setLoad(true);
    await checkAuth();
    setLoad(false);
  }, [checkAuth]);

  const needOpenCodeScreen = useCallback(() => {
    setNeedRenderPhoneScreen(false);
    setSeconds(60);
    setTimeout(() => {
      if (codeInputRef.current) {
        codeInputRef.current.focus();
      }
    }, 100);
    viewModelAuth.sendCode(phone.replace(/\s/g, ''));
  }, [phone, viewModelAuth]);

  const changePhoneValue = useCallback((phoneText: string) => {
    setPhone(phoneText);
  }, []);

  const changeCode = useCallback((codeTxt: string) => {
    setCode(codeTxt);
  }, []);

  const resend = useCallback(async () => {
    setSeconds(60);
    await viewModelAuth.sendCode(phone.replace(/\s/g, ''));
  }, [phone, viewModelAuth]);

  const renderTextCountdownOrRepeat = useCallback(() => (
    seconds > 0
      ? <Typography
          color={StyleGuide.palette.dark_grey}
          style={style.repeat}
          type={TypographyTypes.REGULAR13}
      >{I18n.t('resendIn')} {seconds} {I18n.t('seconds')}</Typography>
      : <TouchableOpacity
          onPress={resend}
          style={style.repeatRetry}
      ><Typography
        color={StyleGuide.palette.pink}
        type={TypographyTypes.REGULAR13}
      >{I18n.t('resend')}</Typography></TouchableOpacity>
  ), [resend, seconds]);

  const renderButton = useCallback(() => (
    <TouchableOpacity
      onPress={needBack}
      style={style.buttonClose}
    >
      <Image
        source={CHEVRON_LEFT}
        style={style.imgBack}
      />
    </TouchableOpacity>
  ), [needBack]);

  const renderCode = () => (
    <View style={style.flex}>
      {renderButton()}
      <Typography
        style={style.mainText}
        type={TypographyTypes.REGULAR32}
      >{I18n.t('enterCode')}</Typography>
      <Typography
        color={StyleGuide.palette.dark_grey}
        style={style.description}
        type={TypographyTypes.REGULAR18}
      >{I18n.t('sentSmsToNumber')}</Typography>
      <Typography
        style={style.phone}
        type={TypographyTypes.REGULAR18}
      >{phone}</Typography>
      <Typography
        color={StyleGuide.palette.background}
        style={style.phone}
        type={TypographyTypes.REGULAR18}
      >1</Typography>
      <View style={style.enterCodeStyleView}>
        <View style={style.enterCodeStyle}>
          <CodeEnter
            codeLength={4}
            onChangeCode={changeCode}
            onSubmit={needNextScreen}
            ref={codeInputRef}
          />
        </View>
        {renderTextCountdownOrRepeat()}
      </View>
    </View>
  );

  const renderPhone = useCallback(() => (
    <View>
      <Typography
        style={style.mainTextPhone}
        type={TypographyTypes.REGULAR32}
      >{I18n.t('enterYour')}</Typography>
      <Typography
        style={style.mainTextPhone2}
        type={TypographyTypes.REGULAR32}
      >{I18n.t('phoneNumber')}</Typography>
      <Typography
        color={StyleGuide.palette.dark_grey}
        style={style.description}
        type={TypographyTypes.REGULAR18}
      >{I18n.t('gladSeeYou')}</Typography>
      <Typography
        color={StyleGuide.palette.dark_grey}
        style={style.phone}
        type={TypographyTypes.REGULAR18}
      >{I18n.t('ratherSignUpService')}</Typography>
      <View style={style.inputPhone}>
        <TextInputMask
          blurOnSubmit={false}
          keyboardType='number-pad'
          mask='+7 [000] [000] [00] [00]'
          onChangeText={changePhoneValue}
          onSubmitEditing={needOpenCodeScreen}
          placeholder='+7'
          selectionColor={StyleGuide.palette.pink}
          style={style.inputStyle}
          value={phone}
        />
      </View>
    </View>
  ), [changePhoneValue, needOpenCodeScreen, phone]);

  const disabledTouchButtonReturn = useMemo(() => (
    (phone.length < 16 && needRenderPhoneScreen) || (code.length < 4 && !needRenderPhoneScreen)
  ), [code.length, needRenderPhoneScreen, phone.length]);

  const styleButton = useMemo(() => (
    (phone.length < 16 && needRenderPhoneScreen) || (code.length < 4 && !needRenderPhoneScreen) ? style.disableButton : style.activeButton
  ), [code.length, needRenderPhoneScreen, phone.length]);

  const renderButtonContinue = useCallback(() => (
    <View style={style.viewButtonContinue}>
      <TouchableOpacity
        disabled={disabledTouchButtonReturn}
        onPress={needRenderPhoneScreen ? needOpenCodeScreen : needNextScreen}
        style={styleButton}
      >
        {load ? <ActivityIndicator color={StyleGuide.palette.white} /> : <Typography
          color={StyleGuide.palette.white}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('begin')}</Typography>}
        <Image
          source={CHEVRON_RIGHT}
          style={style.imgRight}
        />
      </TouchableOpacity>
    </View>
  ), [disabledTouchButtonReturn, load, needNextScreen, needOpenCodeScreen, needRenderPhoneScreen, styleButton]);

  return (
    <KAV style={style.kav}>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={style.container}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={style.scrollStyle}
        >
          {needRenderPhoneScreen ? renderPhone() : renderCode()}
        </ScrollView>
        {renderButtonContinue()}
      </SafeAreaView>
    </KAV>
  );
}
