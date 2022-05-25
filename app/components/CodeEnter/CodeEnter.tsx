import React from 'react';
import {
  TouchableOpacity, View, Text, TextInput, StyleProp, ViewStyle, TextStyle,
} from 'react-native';
import styles from './styles';
import { bind } from '../../lib/decorators';
import { StyleGuide } from '../../resources/StyleGuide';

interface SymbolProps {
  onPress: () => void,
  value: string,
  isFocused?: boolean,
  symbolTextStyle?: StyleProp<ViewStyle>,
  symbolContainerStyle?: StyleProp<ViewStyle>,
  focusedSymbolContainerStyle?: StyleProp<ViewStyle>,
}

interface EnterProps {
  codeLength: number,
  onSubmit: ()=>void,
  onChangeCode: (value: string) => void,
  containerStyle?: StyleProp<ViewStyle>,
  symbolTextStyle?: StyleProp<TextStyle>,
  symbolContainerStyle?: StyleProp<ViewStyle>,
  focusedSymbolContainerStyle?: StyleProp<ViewStyle>,
}

interface State {
  code: string,
}

export default class CodeEnter extends React.Component<EnterProps, State> {
  state = {
    code: '',
  };

  input: React.RefObject<TextInput> = React.createRef();

  renderSymbols() {
    const symbols = [];
    const { code } = this.state;
    for (let i = 0; i < code.length; ++i) {
      symbols.push(<Symbol
        key={String(i)}
        onPress={this.focus}
        value={code[i]}
        {...this.props}
      />);
    }
    for (let i = code.length; i < this.props.codeLength; ++i) {
      symbols.push(<Symbol
        key={String(i)}
        onPress={this.focus}
        value={i === code.length ? '|' : ''}
        {...this.props}
        isFocused={i === code.length}
      />);
    }
    return symbols;
  }

  @bind
  focus() {
    if (this.input.current) {
      this.input.current.focus();
    }
  }

  @bind
  blur() {
    if (this.input.current) {
      this.input.current.focus();
    }
  }

  onChangeCode = (value: string) => {
    const numericValue = value.replace(/[^\d]/gi, '');
    if (numericValue.length !== value.length) {
      this.setCode(this.state.code);
      return;
    }
    if (value.length > this.props.codeLength) {
      this.setCode(value.slice(0, this.props.codeLength));
      return;
    }
    this.setState({ code: value });
    if (this.props.onChangeCode) {
      this.props.onChangeCode(value);
    }
  };

  getCode() {
    return this.state.code;
  }

  clear() {
    this.setCode('');
  }

  setCode(value: string) {
    if (this.input.current) {
      this.input.current.setNativeProps({ text: value });
    }
    this.setState({ code: value });
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.focus}
        style={[styles.container, this.props.containerStyle]}
      >
        {this.renderSymbols()}
        <TextInput
          keyboardType='phone-pad'
          onChangeText={this.onChangeCode}
          onSubmitEditing={this.props.onSubmit}
          ref={this.input}
          style={styles.textInput}
        />
      </TouchableOpacity>

    );
  }
}

class Symbol extends React.Component<SymbolProps> {
  render(): React.ReactNode {
    const symbolContainer = this.props.isFocused ? [styles.focusedSymbolContainer, this.props.focusedSymbolContainerStyle] : [styles.symbolContainer, this.props.symbolContainerStyle];
    const colorText = this.props.value === '|' ? { color: StyleGuide.palette.pink } : { color: StyleGuide.palette.black };
    return (
      <View style={symbolContainer}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.symbol}>
            <Text style={[colorText, styles.symbolTextStyle, this.props.symbolTextStyle]}>
              {this.props.value}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
