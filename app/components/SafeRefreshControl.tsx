import React from 'react';
import { RefreshControl, RefreshControlProps, Platform } from 'react-native';
import { StyleGuide } from '../resources/StyleGuide';

interface Props extends RefreshControlProps {
}
interface State {
  showRealRefreshing: boolean;
  refreshing: boolean;
}
export default class SafeRefreshControl extends React.Component<Props, State> {
  state: State = {
    showRealRefreshing: Platform.OS === 'ios',
    refreshing: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showRealRefreshing: true });
    }, 500);
  }

  static getDerivedStateFromProps(nextProps: Props) {
    if (nextProps.refreshing) {
      return { refreshing: nextProps.refreshing };
    }
    return {};
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (!this.props.refreshing && prevProps.refreshing) {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 500);
    }
  }

  render() {
    return (
      <RefreshControl
        colors={[StyleGuide.palette.pink]}
        tintColor={StyleGuide.palette.pink}
        {...this.props}
        refreshing={this.state.showRealRefreshing && this.state.refreshing}
      />
    );
  }
}
