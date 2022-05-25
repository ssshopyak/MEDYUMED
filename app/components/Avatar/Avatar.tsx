import React from 'react';
import { ImageStyle as RNImageStyle, StyleProp, StyleSheet, View, ViewStyle, Text, TextStyle, Image } from 'react-native';
import FastImage, { ImageStyle as FIImageStyle } from 'react-native-fast-image';
import { PROFILE } from '../../resources/images';
import { bind } from '../../lib/decorators';
import { StyleGuide } from '../../resources/StyleGuide';

interface Props {
  photo?: string,
  size?: number,
  style?: StyleProp<RNImageStyle & FIImageStyle>,
  canShowImage?: boolean,
  user?: {
    firstName?: string,
    lastName?: string,
    username?: string,
  },
}

const DEFAULT_SIZE = 48;

interface State {
  error: boolean;
  photo?: string;
}
export default class Avatar extends React.Component<Props> {
  state: State = {
    error: false,
    photo: this.props.photo,
  };

  getStyle(size: number): StyleProp<RNImageStyle & FIImageStyle> {
    return StyleSheet.flatten([
      {
        borderColor: StyleGuide.palette.gray,
        borderWidth: 1,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: StyleGuide.palette.gray,
        opacity: 0.7,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }, this.props.style,
    ]);
  }

  static getDerivedStateFromProps(nextProps: Readonly<Props>, prevState: Readonly<State>) {
    if (nextProps.photo !== prevState.photo) {
      return { photo: nextProps.photo, error: false };
    }
    return {};
  }

  getViewStyle(size: number): ViewStyle {
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
    };
  }

  getTextStyle(size: number): TextStyle {
    return {
      fontSize: size / 2,
      color: StyleGuide.palette.pink,
      fontWeight: '700',
    };
  }

  @bind
  handleError() {
    this.setState({ error: true });
  }

  getSymbols(str: string, splitSymbol = ' ') {
    return str.split(splitSymbol)
      .map((i) => {
        const symbols = i.match(/./gu);
        return symbols ? symbols[0] : '';
      })
      .filter(Boolean)
      .slice(0, 2)
      .join('');
  }

  renderContent() {
    const { size = DEFAULT_SIZE, user, photo } = this.props;
    if (!this.state.error) {
      if (photo) {
        return (
          <FastImage
            source={{ uri: photo, headers: { Authorization: 'Basic YXBpOmFwaQ==' } }}
            style={this.getStyle(size)}
          />
        );
      }
    }
    if (user && (user.firstName || user.username)) {
      let text = '';
      if (user.firstName) {
        text = user.firstName[0];
        if (user.lastName) {
          text += user.lastName[0];
        }
      } else {
        let splitSymbol = '.';
        if (user.username!.indexOf(' ') !== -1) {
          splitSymbol = ' ';
        }
        text = this.getSymbols(user.username!, splitSymbol);
      }
      return (
        <View style={this.getStyle(size)}>
          <Text style={this.getTextStyle(size)}>{text.toUpperCase()}</Text>
        </View>
      );
    }
    return (
      <Image
        source={PROFILE}
        style={this.getStyle(size)}
      />
    );
  }

  render() {
    const { size = DEFAULT_SIZE, style } = this.props;
    return (
      <View style={[this.getViewStyle(size), style]}>
        {this.renderContent()}
      </View>
    );
  }
}
