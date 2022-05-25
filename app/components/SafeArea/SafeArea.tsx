import React from 'react';
import { View, Platform, StatusBar, StyleSheet } from 'react-native';
import color2array from 'color2array';
import { SafeAreaContext } from './SafeAreaContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export interface SafeAreaProps {
  disableStatusBar?: boolean;
  children?: React.ReactChild | React.ReactChild[];
  topColor?: string;
  bottomColor?: string;
  color?: string;
  needBottom?: boolean;
  elevation?: number;
  position?: 'top' | 'bottom';
}

const calcStyle = (color: undefined | string) => {
  const [r, g, b] = color2array(color || '#ffffff');
  const light = (r / 255 + g / 255 + b / 255) / 3;
  return light > 0.55 ? 'dark-content' : 'light-content';
};

export class SafeArea extends React.Component<SafeAreaProps> {
  static contextType = SafeAreaContext;

  static defaultProps = {
    topColor: '',
    bottomColor: '',
    color: '#ffffff',
    needBottom: true,
    elevation: 0,
  };

  context!: React.ContextType<typeof SafeAreaContext>;

  renderSafeAreaView(color: undefined | string, bottom: boolean = false, elevation: number = 2) {
    if (Platform.OS === 'ios') {
      const position: 'top' | 'bottom' = bottom ? 'bottom' : 'top';
      return <View style={{ backgroundColor: color, height: this.context[position] }} />;
    }
    if (bottom) {
      return null;
    }
    return (
      <View
        style={{
          backgroundColor: color,
          elevation,
          zIndex: 1000,
          height: StatusBar.currentHeight,
        }}
      />
    );
  }

  render() {
    const { props } = this;
    if (props.position === 'top') {
      // todo: статусбар
      return this.renderSafeAreaView(props.topColor || props.color, false, props.elevation);
    }
    if (props.position === 'bottom') {
      return this.renderSafeAreaView(props.bottomColor || props.color, true);
    }
    // todo: андроид сделать через backgroundColor?
    return (
      <View style={styles.container}>
        {this.props.disableStatusBar ? null : (
          <StatusBar
            backgroundColor='transparent'
            barStyle={calcStyle(props.topColor || props.color)}
            translucent
          />
        )}
        {this.renderSafeAreaView(props.topColor || props.color, false, props.elevation)}
        {props.children}
        {props.needBottom && this.renderSafeAreaView(props.bottomColor || props.color, true)}
      </View>
    );
  }
}
