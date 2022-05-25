import { StackScreenProps } from '@react-navigation/stack';
import { Image, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useState } from 'react';
import { useInstance } from 'react-ioc';
import { EntryProps, MainStackProps } from '../../navigation/types';
import { Typography } from '../../components/Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { ADD } from '../../resources/images';
import { RadioGroup } from '../../components/controls';
import style from './style';
import { Header } from '../../components/Header';
import { Entry } from '../../lib/types';
import { KAV } from '../../components/KAV';
import { EntryViewModels } from '../../model/viewModels/EntryViewModels';
import { EntriesViewModels } from '../../model/viewModels/EntriesViewModels';
import { VisitCard } from '../../components/VisitCard/VisitCard';
import { BigButton } from '../../components/buttons/BigButton';
import { UserRepository } from '../../model/repositories/UserRepository';
import { initialState } from '../../redux/initialState';
import I18n from '../../resources/localization/translations';

export function Confirmation(props: StackScreenProps<MainStackProps & EntryProps>) {
  const reduxEntry = useInstance(EntryViewModels);
  const reduxEntries = useInstance(EntriesViewModels);
  const userModel = useInstance(UserRepository);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [entry, setEntry] = useState<Entry>(initialState.entry);
  const [select, setSelect] = useState('1');
  const [checkState, setCheckState] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setEntries(reduxEntries.getEntries());
    });
    if (reduxEntries.getEntries().length === 0) {
      reduxEntry.deleteEntry();
      props.navigation.navigate('event');
    }
  }, [reduxEntries, props.navigation, entries.length, reduxEntry]);

  const setCommentEntry = useCallback((text: string) => {
    reduxEntry.setEntry({ ...entry, comment: text });
    setEntries(entries.map((ent) => {
      if (ent.id === entry!.id) {
        return reduxEntry.getEntry();
      } else {
        return ent;
      }
    }));
  }, [entries, entry, reduxEntry]);

  const del = useCallback((entryForDel: Entry) => {
    const newEntries = entries.filter(entr => entr !== entryForDel).map((value, index) => ({
      ...value,
      id: index,
    }));
    setEntries(newEntries);
    reduxEntries.setEntries(newEntries);
  }, [entries, reduxEntries]);

  const change = useCallback((entryForChange: Entry) => {
    reduxEntry.setEntry({ ...entryForChange, needBack: true });
    props.navigation.navigate('event');
  }, [props.navigation, reduxEntry]);

  const renderAllVisits = useCallback((entr: Entry, index: number) => (
    <VisitCard
      changeEntry={change}
      deleteEntry={del}
      entr={entr}
      focusEntry={() => setEntry(entr)}
      index={index}
      key={index}
      setCommentEntry={setCommentEntry}
    />
  ), [change, del, setCommentEntry]);

  const handlePressCheckbox = (check?: boolean) => {
    setSelect(check ? '1' : '');
    setCheckState(!check);
  };

  const openUserAgreement = () => {
    Linking.openURL('https://med-yu-med.ru/info/soglasie-na-obrabotku-personalnyh-dannyh/');
  };

  const renderAgreement = () => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => handlePressCheckbox(checkState)}
      style={style.viewAgreement}
    >
      <RadioGroup
        confirmation={true}
        items=''
        onSelect={(item: string) => handlePressCheckbox(select === item || checkState)}
        selected={select}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={openUserAgreement}
        style={style.textAgreement}
      >
        <Typography type={TypographyTypes.REGULAR14}>{I18n.t('acceptTerms')}</Typography>
        <Typography
          color={StyleGuide.palette.pink}
          style={{ textDecorationLine: 'underline', textDecorationStyle: 'dashed' }}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('userAgreement')}</Typography>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const pressAddEntry = useCallback(() => {
    reduxEntry.setEntry({
      ...reduxEntry.getEntry(),
      id: entries.length,
      title: I18n.t('entry') + ' #' + (entries.length + 1),
      needBack: false,
    });
    props.navigation.navigate('event');
  }, [entries.length, props.navigation, reduxEntry]);

  const renderAddEntry = useCallback(() => (
    <TouchableOpacity
      onPress={pressAddEntry}
      style={style.touchAdd}
    >
      <Image
        source={ADD}
        style={style.imgAdd}
      />
      <Typography
        color={StyleGuide.palette.pink}
        textAlign='center'
        type={TypographyTypes.REGULAR14}
      >{I18n.t('addEntry')}</Typography>
    </TouchableOpacity>
  ), [pressAddEntry]);

  const confirmation = useCallback((async (value: Entry) => {
    await userModel.makeAppointment({ clubId: value.clubId, serviceId: value.serviceId, employeeId: value.employeeId, date: value.date + ' ' + value.time, comment: value.comment.length > 0 ? value.comment : ' ' });
  }), [userModel]);

  const pressContinue = useCallback(async () => {
    setLoad(true);
    Promise.all(entries.map(confirmation)).then(() => {
      reduxEntry.deleteEntry();
      props.navigation.navigate('endConfirmation', { entries: reduxEntries });
      setLoad(false);
    }, () => {
      setLoad(false);
    });
  }, [confirmation, entries, props.navigation, reduxEntries, reduxEntry]);

  const renderButtonContinue = useCallback(() => (
    <BigButton
      containerStyle={style.buttonFeedback}
      disabled={!checkState}
      load={load}
      onPress={pressContinue}
      text={I18n.t('join')}
      textColor={StyleGuide.palette.white}
    />
  ), [checkState, load, pressContinue]);

  const pressReset = useCallback(() => {
    setEntries([]);
    reduxEntries.deleteEntries();
  }, [reduxEntries]);

  const renderRightButtonHeader = useCallback(() => (
    <TouchableOpacity
      onPress={pressReset}
      style={style.reset}
    >
      <Typography
        color={StyleGuide.palette.dark_grey}
        type={TypographyTypes.REGULAR17}
      >{I18n.t('throw')}</Typography>
    </TouchableOpacity>
  ), [pressReset]);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={style.container}
    >
      <KAV style={style.kav}>
        <Header
          onBackPress={props.navigation.goBack}
          renderRightButton={renderRightButtonHeader}
          title={I18n.t('confirmation')}
        />
        <View style={style.mainContainer}>
          <ScrollView
            contentContainerStyle={style.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={style.renderContent}>
              <View style={style.viewVisits}>
                {entries.map(renderAllVisits)}
              </View>
              {renderAgreement()}
              {renderAddEntry()}
            </View>
          </ScrollView>
          {renderButtonContinue()}
        </View>
      </KAV>
    </SafeAreaView>
  );
}
