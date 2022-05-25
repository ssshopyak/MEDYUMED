import React from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AppNavigator } from './navigation/AppNavigation';
import { AppProvider } from './redux/AppProvider';
import { AppEvents, EventDispatcher } from './lib/events/eventDispatcher';
import AndroidButtonSheet from './components/AndroidButtonSheet';
import InternetConnectionObserver from './components/InternetConnectionObserver';
import { DatePicker } from './components/DatePicker';
import { Button } from './components/buttons/Button';
import { Typography } from './components/Typography';
import { StyleGuide, TypographyTypes } from './resources/StyleGuide';
import I18n from './resources/localization/translations';

LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  title: {
    fontWeight: StyleGuide.fontWeight.BOLD,
  },
});

function ErrorScreen(props: { onResetPress: () => void}) {
  return (
    <View style={styles.error}>
      <Typography
        style={styles.title}
        textAlign='center'
        type={TypographyTypes.REGULAR20}
      >
        {I18n.t('errorTitle')}
      </Typography>
      <Button
        backgroundColor={StyleGuide.palette.pink}
        onPress={props.onResetPress}
        text={I18n.t('restartApp')}
        wrapperStyle={styles.buttonWrapper}
      />
    </View>
  );
}

type AppState = {
  error: boolean;
  resetKey: number;
};
export class App extends React.Component<{}, AppState> {
  state: AppState = {
    error: false,
    resetKey: 0,
  };

  eventDispatcher = new EventDispatcher();

  componentDidMount() {
    SplashScreen.hide();
    this.eventDispatcher.on(AppEvents.LOGOUT, this.logout);
  }

  componentWillUnmount() {
    this.eventDispatcher.removeListener(AppEvents.LOGOUT, this.logout);
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  private logout = () => {
    this.setState({ resetKey: this.state.resetKey + 1 });
  }

  private resetError = () => {
    this.setState({ error: false });
  }

  render() {
    if (this.state.error) {
      return <ErrorScreen onResetPress={this.resetError} />;
    }
    return (
      <AppProvider key={this.state.resetKey}>
        <InternetConnectionObserver>
          <AppNavigator />
          <DatePicker />
          <AndroidButtonSheet />
        </InternetConnectionObserver>
      </AppProvider>
    );
  }
}
