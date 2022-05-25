import React from 'react';
import { View, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Errors } from './Error/Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props {
  children: React.ReactNode;
}

interface State {
  isConnected: boolean,
}

export default class InternetConnectionObserver extends React.Component<Props, State> {
  state: State = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      this.setState({ isConnected: Boolean(state.isConnected) });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isConnected ? this.props.children
        : <Errors internetConnection />}
      </View>
    );
  }
}
