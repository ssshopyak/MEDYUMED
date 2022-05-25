import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useInstance } from 'react-ioc';
import style from './style';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { CHEVRON_RIGHT } from '../../resources/images';
import { UserViewModel } from '../../model/viewModels/UserViewModels';
import { KAV } from '../../components/KAV';
import { UserRepository } from '../../model/repositories/UserRepository';
import I18n from '../../resources/localization/translations';

export function RegistrationName() {
  const user = useInstance(UserViewModel);
  const viewModel = useInstance(UserViewModel);
  const viewModelAuth = useInstance(UserRepository);

  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fifthInputRef = useRef(null);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail] = useState('');
  const [correct, setCorrect] = useState(true);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const reg = /.+@.+\..+/i;
    !reg.test(email) && email.length > 0
      ? setCorrect(false)
      : setCorrect(true);
  }, [email]);

  const focusSecondInput = useCallback(() => {
    if (secondInputRef.current) {
      secondInputRef.current.focus();
    }
  }, [secondInputRef]);

  const focusThirdInput = useCallback(() => {
    if (thirdInputRef.current) {
      thirdInputRef.current.focus();
    }
  }, [thirdInputRef]);

  const focusFifthInput = useCallback(() => {
    if (fifthInputRef.current) {
      fifthInputRef.current.focus();
    }
  }, [fifthInputRef]);

  const setContent = useCallback(async () => {
    const result = await viewModelAuth.register(user.getState().user.phone.replace(/\s/g, ''), name, email);
    if (result) {
      viewModel.setToken(result.userToken);
      viewModel.setTokenN(result.userToken);
      viewModel.setName(name);
      viewModel.setNameDB(name);
      viewModel.setSurname(surname);
      viewModel.setSurnameDB(surname);
      viewModel.setEmail(email);
      viewModel.setEmailDB(email);
      if (patronymic) {
        viewModel.setPatronymic(patronymic);
        viewModel.setPatronymicDB(patronymic);
      }
    }
  }, [email, name, patronymic, surname, user, viewModel, viewModelAuth]);

  const checkCorrect = useCallback(async () => {
    if (correct) {
      setLoad(true);
      await setContent();
      setLoad(false);
    }
  }, [correct, setContent]);

  const renderRegistration = useCallback(() => (
    <View>
      <View
        style={style.buttonClose}
      />
      <Typography
        style={style.mainText}
        type={TypographyTypes.REGULAR32}
      >{I18n.t('enterYourName')}</Typography>
      <Typography
        style={style.mainText2}
        type={TypographyTypes.REGULAR32}
      >{I18n.t('andMail')}</Typography>
      <View style={style.inputName}>
        <TextInput
          autoFocus
          blurOnSubmit={false}
          onChangeText={setName}
          onSubmitEditing={focusSecondInput}
          placeholder={I18n.t('name')}
          placeholderTextColor={StyleGuide.palette.gray}
          returnKeyType='next'
          selectionColor={StyleGuide.palette.pink}
          style={style.inputStyle}
          value={name}
        />
      </View>
      <View style={style.input}>
        <TextInput
          blurOnSubmit={false}
          onChangeText={setSurname}
          onSubmitEditing={focusThirdInput}
          placeholder={I18n.t('surname')}
          placeholderTextColor={StyleGuide.palette.gray}
          ref={secondInputRef}
          returnKeyType='next'
          selectionColor={StyleGuide.palette.pink}
          style={style.inputStyle}
          value={surname}
        />
      </View>
      <View style={style.input}>
        <TextInput
          blurOnSubmit={false}
          onChangeText={setPatronymic}
          onSubmitEditing={focusFifthInput}
          placeholder={I18n.t('patronymic')}
          placeholderTextColor={StyleGuide.palette.gray}
          ref={thirdInputRef}
          returnKeyType='next'
          selectionColor={StyleGuide.palette.pink}
          style={style.inputStyle}
          value={patronymic}
        />
      </View>
      <View style={correct ? style.input : [style.input, style.inputIncorrectEmail]}>
        <TextInput
          autoCapitalize='none'
          blurOnSubmit={false}
          keyboardType='email-address'
          onChangeText={setEmail}
          onSubmitEditing={checkCorrect}
          placeholder={I18n.t('email')}
          placeholderTextColor={StyleGuide.palette.gray}
          ref={fifthInputRef}
          returnKeyType='done'
          selectionColor={StyleGuide.palette.pink}
          style={style.inputStyle}
          value={email}
        />
      </View>
      {!correct && <Typography
        color={StyleGuide.palette.orange}
        style={style.styleIncorrectEmail}
        type={TypographyTypes.REGULAR10}
      >{I18n.t('emailWrong')}</Typography>}
    </View>
  ), [checkCorrect, correct, email, focusFifthInput, focusSecondInput, focusThirdInput, name, patronymic, surname]);

  const buttonDisabled = useMemo(() => (
    name.length === 0 || surname.length === 0 || email.length < 3 || !correct
  ), [correct, email.length, name.length, surname.length]);

  const renderButtonContinue = useCallback(() => (
    <View style={style.viewButtonContinue}>
      <TouchableOpacity
        disabled={buttonDisabled}
        onPress={checkCorrect}
        style={buttonDisabled ? style.disableButton : style.activeButton}
      >
        {load ? <ActivityIndicator color={StyleGuide.palette.white} /> : <Typography
          color={StyleGuide.palette.white}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('begin')}</Typography> }
        <Image
          source={CHEVRON_RIGHT}
          style={style.imgRight}
        />
      </TouchableOpacity>
    </View>
  ), [buttonDisabled, checkCorrect, load]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <KAV style={style.kav}>
        <ScrollView
          contentContainerStyle={style.scroll}
          showsVerticalScrollIndicator={false}
        >
          {renderRegistration()}
        </ScrollView>
      </KAV>
      {renderButtonContinue()}
    </SafeAreaView>
  );
}
