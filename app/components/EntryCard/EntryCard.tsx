import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import moment from 'moment';
import { IConfirmationEntries } from '../../lib/types';
import style from './styles';
import { Typography } from '../Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { CLOCK, GEOLOCATION, REPEAT } from '../../resources/images';
import I18n from '../../resources/localization/translations';
import ButtonEntry from './ButtonEntry';

interface EntryCardProps {
  filial: string,
  load: boolean,
  writeFeedback: (id: string)=>void,
  cancelEntry: (id: IConfirmationEntries)=>void,
  repeatEntry: (entry: IConfirmationEntries)=>void,
  entry: IConfirmationEntries,
}

export function EntryCard(props: EntryCardProps) {
  const {
    filial,
    load,
    writeFeedback,
    cancelEntry,
    entry,
    repeatEntry,
  } = props;

  const pressRepeat = useCallback(() => {
    repeatEntry(entry);
  }, [entry, repeatEntry]);

  const pressFeedback = useCallback(() => {
    writeFeedback(entry.appointmentId);
  }, [entry.appointmentId, writeFeedback]);

  const cancel = useCallback(() => {
    cancelEntry(entry);
  }, [cancelEntry, entry]);

  const renderButton = useCallback(() => (
    <View style={style.viewAllButton}>
      {entry.status === 'ended'
       ? <ButtonEntry
           load={load}
           needImg={false}
           onPress={pressFeedback}
           text={I18n.t('giveFeedback')}
           tintColor={StyleGuide.palette.pink}
       /> : null}
      {entry.status === 'planned'
       ? <ButtonEntry
           img={CLOCK}
           load={load}
           needImg
           needLoad={true}
           onPress={cancel}
           text={I18n.t('cancel')}
           tintColor={StyleGuide.palette.pink}
       /> : null}
      <ButtonEntry
        backgroundColor={StyleGuide.palette.pink}
        img={REPEAT}
        load={load}
        needImg
        onPress={pressRepeat}
        text={I18n.t('repeatRecord')}
      />
    </View>
  ), [cancel, entry.status, load, pressFeedback, pressRepeat]);

  return (
    <View style={style.mainView}>
      <View style={style.servicePrice}>
        <Typography
          style={style.titlePrice}
          type={TypographyTypes.REGULAR16}
        >{entry.service.title}</Typography>
      </View>
      <Typography
        color={StyleGuide.palette.dark_grey}
        type={TypographyTypes.REGULAR14}
      >{entry.employee.name}</Typography>
      <View style={style.description}>
        <Image
          source={GEOLOCATION}
          style={style.img}
        />
        <Typography type={TypographyTypes.REGULAR14}>{filial}</Typography>
      </View>
      <View style={style.description}>
        <Image
          source={CLOCK}
          style={style.img}
        />
        <Typography type={TypographyTypes.REGULAR14}>{moment(entry.startDate)
            .locale(I18n.locale)
            .format('DD MMMM, ')}{entry.startDate.slice(11)}</Typography>
      </View>
      {renderButton()}
    </View>
  );
}
