import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { BottomTabBarProps, BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from './styles';
import { bind } from '../../lib/decorators';
import {
  HOME, HOME_COLOR,
  LOCATION, LOCATION_COLOR,
  PROFILE, PROFILE_COLOR, RECORD, RECORD_COLOR, CHAT, CHAT_COLOR,
} from '../../resources/images';
import { TouchableScaleFeedback } from '../buttons/TouchableScaleFeedback';
import { Typography } from '../Typography';
import { TypographyTypes } from '../../resources/StyleGuide';
import { SafeArea } from '../SafeArea/SafeArea';
import I18n from '../../resources/localization/translations';
import { GlobalState } from '../../lib/types';

interface Props extends BottomTabBarProps<BottomTabBarOptions> {
  language: string;
}

class TabBar extends React.Component<Props> {
  navigate(index: number) {
    const { navigation } = this.props;
    const event = navigation.emit({
      type: 'tabPress',
      target: this.props.state.routes[index].key,
      canPreventDefault: true,
    });

    if (this.props.state.index !== index && !event.defaultPrevented) {
      navigation.dispatch({
        ...CommonActions.navigate(this.props.state.routes[index].name),
        target: this.props.state.key,
      });
    }
  }

  @bind
  handleMainPress() {
    this.navigate(0);
  }

  @bind
  handleProfilePress() {
    this.navigate(1);
  }

  @bind
  handleRecordPress() {
    this.navigate(2);
  }

  @bind
  handleBranchesPress() {
    this.navigate(3);
  }

  @bind
  handleChatPress() {
    this.navigate(4);
  }

  renderButton(
    icon: ImageSourcePropType,
    iconActive: ImageSourcePropType,
    label: string,
    onPress: () => void,
    isFocused: boolean,
    disabled: boolean = false,
  ) {
    const color = isFocused ? this.props.activeTintColor : this.props.inactiveTintColor;
    const img = isFocused ? iconActive : icon;
    const buttonStyle = [styles.button, disabled ? { opacity: 0.3 } : {}];
    return (
      <TouchableScaleFeedback
        disabled={disabled}
        onPress={onPress}
        pressInScale={0.9}
      >
        <View style={buttonStyle}>
          <Image
            source={img}
            style={styles.icon}
          />
          <Typography
            color={color}
            numberOfLines={1}
            type={TypographyTypes.REGULAR10}
          >
            {label}
          </Typography>
        </View>
      </TouchableScaleFeedback>
    );
  }

  render() {
    const { index } = this.props.state;
    const isMain = index === 0;
    const isProfile = index === 1;
    const isRecord = index === 2;
    const isBranches = index === 3;
    const isChat = index === 4;
    return (
      <View style={styles.wrapper}>
        <View
          key={this.props.language}
          style={styles.container}
        >
          <View
            key={this.props.language}
            style={styles.tabBar}
          >
            {this.renderButton(HOME, HOME_COLOR, I18n.t('main'), this.handleMainPress, isMain)}
            {this.renderButton(PROFILE, PROFILE_COLOR, I18n.t('profile'), this.handleProfilePress, isProfile)}
            {this.renderButton(RECORD, RECORD_COLOR, I18n.t('entry'), this.handleRecordPress, isRecord)}
            {this.renderButton(LOCATION, LOCATION_COLOR, I18n.t('branches'), this.handleBranchesPress, isBranches)}
            {this.renderButton(CHAT, CHAT_COLOR, I18n.t('chat'), this.handleChatPress, isChat)}
          </View>
        </View>
        <SafeArea position='bottom' />
      </View>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(TabBar);
