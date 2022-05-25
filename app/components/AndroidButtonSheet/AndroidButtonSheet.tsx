import React, { useCallback, useMemo } from 'react';
import { ActionSheetIOSOptions, Modal, Text, TouchableOpacity, View } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet/src/index';
import styles from './styles';
import { bind } from '../../lib/decorators';
import { StyleGuide } from '../../resources/StyleGuide';
import I18n from '../../resources/localization/translations';

interface Props {
}

interface State {
  options?: ActionSheetIOSOptions,
  callback?: (buttonIndex: number) => void,
}

export default class AndroidButtonSheet extends React.Component<Props, State> {
  private static instance?: AndroidButtonSheet = undefined;

  constructor(props: Props) {
    super(props);
    AndroidButtonSheet.instance = this;
  }

  state: State = {
    options: undefined,
    callback: undefined,
  };

  btnSheet = React.createRef<ScrollBottomSheet<string>>();

  @bind
  hide() {
    this.setState({ options: undefined, callback: undefined });
  }

  @bind
  onPressItem(index: number) {
    const { callback } = this.state;
    if (callback) {
      callback(index);
    }
    this.hide();
  }

  @bind
  renderOption(name: string, index: number) {
    return (
      <Option
        index={index}
        key={index}
        name={name}
        onPress={this.onPressItem}
        title={false}
      />
    );
  }

  @bind
  renderOptions() {
    return this.state.options!.options.filter(opt => opt !== I18n.t('cancel')).map(this.renderOption);
  }

  @bind
  pressOnTitle() {
    this.onPressItem(-1);
  }

  @bind
  renderContent() {
    if (this.state.options) {
      return (
        <View>
          <View style={styles.modalEmotionContentContainer}>
            {this.state.options.title && <Option
              index={-1}
              name={this.state.options.title}
              onPress={this.pressOnTitle}
              title={true}
            />}
            {this.renderOptions()}
          </View>
          <View style={{
 marginHorizontal: 10,
            marginBottom: 20,
}}
          >
            <Option
              index={2}
              key={2}
              name={this.state.options.options[2]}
              onPress={() => {
                this.onPressItem(2);
              }}
              title={false}
            />
          </View>
        </View>
      );
    }
    return <View />;
  }

  @bind
  static showActionSheetWithOptions(options: ActionSheetIOSOptions, callback: (buttonIndex: number) => void) {
    if (AndroidButtonSheet.instance) {
      AndroidButtonSheet.instance.setValues(options, callback);
    }
  }

  @bind
  setValues(options: ActionSheetIOSOptions, callback: (buttonIndex: number) => void) {
    this.setState({ options, callback });
  }

  @bind
  render() {
    if (this.state.options && this.state.callback) {
      return (
        <Modal
          animated
          animationType='fade'
          onRequestClose={this.hide}
          transparent
          visible
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.hide}
            style={styles.mainContent}
          >
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.content}>
                {this.renderContent()}
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      );
    }
    return null;
  }
}

interface OptionProps {
  onPress: (index: number) => void;
  name: string;
  index: number;
  title: boolean;
}

function Option(props: OptionProps) {
  const onPress = useCallback(() => props.onPress(props.index), [props]);
  const textStyle = useMemo(() => [props.name !== I18n.t('cancel2') ? styles.mainText : styles.cancelText], [props.name]);
  return (
    <TouchableOpacity
      disabled={props.title}
      onPress={onPress}
      style={props.index === 2 ? {
 alignItems: 'center',
        backgroundColor: StyleGuide.palette.white,
        borderRadius: 16,
marginTop: 16,
} : [styles.styleView]}
    >
      <View style={styles.buttonStyle}>
        <Text style={props.title ? styles.title : textStyle}>
          {props.name}
        </Text>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
}
