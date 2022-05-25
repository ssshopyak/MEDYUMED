import React from 'react';
import { Image, View } from 'react-native';
import { Calendar, DateObject, MultiDotMarkingProps, LocaleConfig } from 'react-native-calendars';
import './CalendarLocales';
import style from './style';
import { CHEVRON_LEFT, CHEVRON_RIGHT } from '../../resources/images';
import theme from './CalendarTheme';
import { useAppSelector } from '../../redux/hooks/selectors';

interface Props {
  mark: MultiDotMarkingProps;
  monthPress: (month: DateObject) => void;
  setDateTime: (day: string, time: string) => void;
}

export function CalendarView(props: Props) {
  LocaleConfig.defaultLocale = useAppSelector(state => state.app.language);
  const dayPress = (day: DateObject) => {
    props.setDateTime(day.dateString, '');
  };

  const renderArrow = (direction: string) =>
    (
      <View>
        {direction === 'left' ? <Image
          source={CHEVRON_LEFT}
          style={style.image}
        /> : <Image
          source={CHEVRON_RIGHT}
          style={style.image}
        />}
      </View>
    );

  return (
    <View style={style.main}>
      <Calendar
        disableAllTouchEventsForDisabledDays
        disabledByDefault
        firstDay={1}
        hideExtraDays={true}
        markedDates={props.mark}
        markingType='custom'
        minDate={Object.keys(props.mark)[0]}
        onDayPress={dayPress}
        onMonthChange={props.monthPress}
        pastScrollRange={0}
        renderArrow={renderArrow}
        theme={theme}
      />
    </View>
  );
}
