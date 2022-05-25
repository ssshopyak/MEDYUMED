import React, { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import RNDateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { bind } from '../lib/decorators';
import { sleep } from '../lib/utils';
import { StyleGuide, TypographyTypes } from '../resources/StyleGuide';
import { Typography } from './Typography';
import I18n from '../resources/localization/translations';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  picker: {
    backgroundColor: StyleGuide.palette.white,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headText: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.gray,
  },
  buttonConfirm: {
    marginHorizontal: 16,
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StyleGuide.palette.pink,
  },
  handle: {
    width: '100%',
    height: 70,
    backgroundColor: StyleGuide.palette.white,
    borderRadius: 20,
    marginBottom: -20,
    alignItems: 'center',
  },
  headerTab: {
    marginTop: 12,
    marginBottom: 10,
    height: 5,
    width: 63,
    backgroundColor: StyleGuide.palette.black,
    borderRadius: 5,
  },
});

function Overlay(props: { onPress: () => void, opacity: Animated.Node<number> }) {
  const {
    opacity,
    onPress,
  } = props;
  const style = useMemo(() => [styles.overlay, { opacity }], [opacity]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={StyleSheet.absoluteFillObject}
    >
      <Animated.View style={style} />
    </TouchableOpacity>
  );
}

type DatePickerParams = {
  onChange: (date: Date) => void;
  value: Date,
  mode: boolean,
}

interface State {
  opened: boolean;
  params?: DatePickerParams;
}

export class DatePicker extends React.Component<{}, State> {
  private static instance?: DatePicker;

  static show(params: DatePickerParams) {
    DatePicker.instance?.show?.(params);
  }

  position = new Animated.Value(0);

  modal = React.createRef<ScrollBottomSheet<string>>();

  state: State = {
    opened: false,
    params: undefined,
  };

  constructor(props: {}) {
    super(props);
    DatePicker.instance = this;
  }

  date = new Date();

  @bind
  async hide() {
    if (this.modal.current) {
      this.modal.current.snapTo(1);
    }
    if (Platform.OS === 'ios') {
      await sleep(300);
    }
    this.setState({ opened: false });
  }

  @bind
  show(params: DatePickerParams) {
    const minDate = params.mode ? moment().add(1, 'hour') : moment();
    this.date = minDate.isBefore(moment(params.value)) ? params.value : minDate.toDate();
    this.setState({
      opened: true,
      params,
    }, () => {
      setTimeout(() => {
        if (this.modal.current) {
          this.modal.current.snapTo(0);
        }
      }, 100);
    });
  }

  @bind
  onSnap(index: number) {
    if (index === 1) {
      this.setState({ opened: false });
    }
  }

  @bind
  confirm() {
    const { params } = this.state;
    if (params) {
      params.onChange(this.date);
      this.hide();
    }
  }

  @bind
  onChangeAndroidDayValue(event: AndroidEvent, date?: Date) {
    if (event.type === 'dismissed') {
      this.hide();
    }
    if (event.type === 'set') {
      this.date = new Date(event.nativeEvent.timestamp!);
      this.hide();
      this.confirm();
      return;
    }
    this.date = date!;
  }

  @bind
  renderHandle() {
    return (
      <View style={styles.handle}>
        <View style={styles.headerTab} />
        <Typography
          color={StyleGuide.palette.pink}
          style={styles.headText}
          type={TypographyTypes.REGULAR14}
        >{I18n.t('chooseYourDateBirth')}</Typography>
      </View>
    );
  }

  @bind
  renderDatePicker() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return (
      <View>
        <RNDateTimePicker
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={date}
          mode='date'
          onChange={this.onChangeAndroidDayValue}
          value={this.state.params?.value!}
        />
      </View>
    );
  }

  render() {
    if (!this.state.opened) {
      return null;
    }
    if (Platform.OS === 'android') {
      return this.renderDatePicker();
    }
    return (
      <View style={styles.container}>
        <Overlay
          onPress={this.hide}
          opacity={this.position}
        />
        <ScrollBottomSheet<string>
          animatedPosition={this.position}
          componentType='ScrollView'
          initialSnapIndex={1}
          onSettle={this.onSnap}
          ref={this.modal}
          renderHandle={this.renderHandle}
          snapPoints={[SCREEN_HEIGHT - 330, '100%']}
        >
          <View style={styles.picker}>
            {this.renderDatePicker()}
            <TouchableOpacity
              onPress={this.confirm}
              style={styles.buttonConfirm}
            >
              <Typography
                color={StyleGuide.palette.white}
                type={TypographyTypes.REGULAR14}
              >{I18n.t('accept')}</Typography>
            </TouchableOpacity>
          </View>
        </ScrollBottomSheet>
      </View>
    );
  }
}
