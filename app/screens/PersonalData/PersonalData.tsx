import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  ActivityIndicator, Alert, Image, ScrollView, TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInstance } from 'react-ioc';
import moment from 'moment';
import { ProfileProps } from '../../navigation/types';
import { Header } from '../../components/Header';
import style from './index';
import { Separator } from '../../components/Separator';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { LOGOUT, OK } from '../../resources/images';
import { KAV } from '../../components/KAV';
import { UserViewModel } from '../../model/viewModels/UserViewModels';
import { DateInput } from '../../components/Input';
import { MainController } from '../../redux/controllers/MainController';
import I18n from '../../resources/localization/translations';
import { useInputRef, useMount } from '../../lib/hooks';
import { IUser } from '../../lib/types';

export function PersonalData(props: StackScreenProps<ProfileProps>) {
  const user = useInstance(UserViewModel);

  const viewModel = useInstance(UserViewModel);
  const mainController = useInstance(MainController);

  const reduxName = user.getState().user.name;
  const reduxSurname = user.getState().user.surname;
  const reduxPatronymic = user.getState().user.patronymic;
  const reduxEmail = user.getState().user.email;
  const reduxPhone = user.getState().user.phone;
  const reduxBirthday = user.getState().user.birthday;

  const [userInfo, setUserInfo] = useState<IUser>();
  const [name, setName] = useState(reduxName);
  const [surname, setSurname] = useState(reduxSurname);
  const [patronymic, setPatronymic] = useState(reduxPatronymic);
  const [email, setEmail] = useState(reduxEmail);
  const [birthday, setBirthday] = useState<moment.Moment | undefined>(reduxBirthday ? moment(reduxBirthday, 'DD.MM.YYYY') : undefined);
  const [correctAllDate, setCorrectAllDate] = useState(true);
  const [disable, setDisable] = useState(true);
  const [load, setLoad] = useState(false);

  const [surnameInput, focusSurname] = useInputRef();
  const [patronymicInput, focusPatronymic] = useInputRef();
  const [emailInput, focusEmail] = useInputRef();

  useMount(async () => {
    const getUserInfo = await viewModel.getUser();
    setUserInfo(getUserInfo);
  });

  const logOut = useCallback(async () => {
    await mainController.logout();
  }, [mainController]);

  const exit = useCallback(() => {
    Alert.alert(I18n.t('areYouSureYouWantToExit'), '', [
      { text: I18n.t('cancel2'), style: 'destructive' },
      { text: I18n.t('logOut'), onPress: logOut },
    ]);
  }, [logOut]);

  const setNewPersonalDate = useCallback(async () => {
    if (correctAllDate) {
      setLoad(true);
      if (userInfo) {
        await viewModel.updateUser({ club: userInfo.club.id, email, name, birthday: birthday !== undefined ? birthday.format('YYYY-MM-DD') : undefined, sex: userInfo.sex, lastName: surname, secondName: patronymic.length > 0 ? patronymic : undefined });
      }
      setDisable(true);
      setLoad(false);
    }
  }, [birthday, correctAllDate, email, name, patronymic, surname, userInfo, viewModel]);

  const check = useMemo(() => reduxEmail !== email || reduxSurname !== surname || reduxName !== name || reduxPatronymic !== patronymic || !disable, [disable, email, name, patronymic, reduxEmail, reduxName, reduxPatronymic, reduxSurname, surname]);

  const renderButtonContinue = useCallback(() => {
    if (check) {
      return (
        <View style={style.viewButtonSave}>
          <TouchableOpacity
            onPress={setNewPersonalDate}
            style={style.saveButton}
          >
            <Image
              source={OK}
              style={style.imgOk}
            />
            {load ? <ActivityIndicator color={StyleGuide.palette.white} /> : <Typography
              color={StyleGuide.palette.white}
              type={TypographyTypes.REGULAR14}
            >{I18n.t('saveChanges')}</Typography>}
          </TouchableOpacity>
        </View>
      );
    }
    return <View />;
  }, [check, load, setNewPersonalDate]);

  useEffect(() => {
    const reg = /.+@.+\..+/i;
    reg.test(email) && email.length > 0 && email.length > 0 && name.length > 0
      ? setCorrectAllDate(true)
      : setCorrectAllDate(false);
  }, [email, name, name.length]);

  const setDate = useCallback((value: moment.Moment) => {
    setDisable(false);
    setBirthday(value);
  }, []);

  const renderInputs = useCallback(() => (
    <View style={style.containerInfo}>
      <TextInput
        blurOnSubmit={false}
        keyboardType='default'
        onChangeText={setName}
        onSubmitEditing={focusSurname}
        placeholder={I18n.t('name')}
        returnKeyType='next'
        selectionColor={StyleGuide.palette.pink}
        style={style.input}
        value={name}
      />
      <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
        wrapperStyle={style.separator}
      />
      <TextInput
        blurOnSubmit={false}
        keyboardType='default'
        onChangeText={setSurname}
        onSubmitEditing={focusPatronymic}
        placeholder={I18n.t('surname')}
        ref={surnameInput}
        returnKeyType='next'
        selectionColor={StyleGuide.palette.pink}
        style={style.input}
        value={surname}
      />
      <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
        wrapperStyle={style.separator}
      />
      <TextInput
        blurOnSubmit={false}
        keyboardType='default'
        onChangeText={setPatronymic}
        onSubmitEditing={focusEmail}
        placeholder={I18n.t('patronymic')}
        ref={patronymicInput}
        returnKeyType='next'
        selectionColor={StyleGuide.palette.pink}
        style={style.input}
        value={patronymic}
      />
      <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
        wrapperStyle={style.separator}
      />
      <TextInput
        autoCapitalize='none'
        blurOnSubmit={false}
        keyboardType='email-address'
        onChangeText={setEmail}
        onSubmitEditing={() => emailInput.current?.blur()}
        placeholder={I18n.t('email')}
        ref={emailInput}
        returnKeyType='done'
        selectionColor={StyleGuide.palette.pink}
        style={style.input}
        value={email}
      />
      <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
        wrapperStyle={style.separator}
      />
      <View style={style.input}>
        <Typography type={TypographyTypes.REGULAR18}>{reduxPhone}</Typography>
      </View>
      <Separator
        color={StyleGuide.palette.light_gray}
        height={1}
        wrapperStyle={style.separator}
      />
      <DateInput
        date={true}
        onChange={setDate}
        placeholder={I18n.t('dateOfBirth')}
        value={birthday}
        wrapperStyle={style.dateInput}
      />
    </View>
  ), [birthday, email, emailInput, focusEmail, focusPatronymic, focusSurname, name, patronymic, patronymicInput, reduxPhone, setDate, surname, surnameInput]);

  return (
    <KAV style={style.kav}>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={style.container}
      >
        <View style={style.containerView}>
          <Header
            onBackPress={props.navigation.goBack}
            title={I18n.t('personalData')}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.mainContainer}>
              <View>
                {renderInputs()}
                {email.length === 0 && <Typography
                  color={StyleGuide.palette.dark_grey}
                  style={style.textMargin}
                  type={TypographyTypes.REGULAR13}
                >
                  {I18n.t('enterYourEmailAddress')}
                </Typography>}
                {!correctAllDate && <Typography
                  color={StyleGuide.palette.orange}
                  style={style.textMargin}
                  type={TypographyTypes.REGULAR13}
                >{I18n.t('emailWrong')}</Typography>}
                <TouchableOpacity
                  onPress={exit}
                  style={style.allert}
                >
                  <Image
                    source={LOGOUT}
                    style={style.imgLogout}
                  />
                  <Typography
                    color={StyleGuide.palette.orange}
                    textAlign='center'
                    type={TypographyTypes.REGULAR17}
                  >{I18n.t('logOutOfProfile')}</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {correctAllDate && renderButtonContinue()}
        </View>
      </SafeAreaView>
    </KAV>
  );
}
