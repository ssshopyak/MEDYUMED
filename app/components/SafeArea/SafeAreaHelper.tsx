import React from 'react';
import { View, StyleSheet, LayoutChangeEvent, SafeAreaView } from 'react-native';
import { DEFAULT_SAFE_AREA, SafeAreaContext } from './SafeAreaContext';

const styles = StyleSheet.create({
  container: {
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
});

interface Layout {
  width: number;
  height: number;
  x: number;
  y: number;
}

type Listener = (safeArea: { top: number; bottom: number }) => void;

export class SafeAreaHelper extends React.Component<{}> {
  public static TOP = DEFAULT_SAFE_AREA.top;

  public static BOTTOM = DEFAULT_SAFE_AREA.bottom;

  private static listeners: Listener[] = [];

  public static addListener(listener: Listener) {
    this.listeners.push(listener);
    listener({ top: SafeAreaHelper.TOP, bottom: SafeAreaHelper.BOTTOM });
  }

  public static removeListener(listener: Listener) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  private static timeoutPromise?: Promise<void>;

  private static needUpdate = false;

  private static async notifyListeners() {
    if (SafeAreaHelper.timeoutPromise) {
      SafeAreaHelper.needUpdate = true;
      return;
    }
    SafeAreaHelper.timeoutPromise = new Promise<void>((resolve) => {
      SafeAreaHelper.listeners.forEach(listener =>
        listener({ top: SafeAreaHelper.TOP, bottom: SafeAreaHelper.BOTTOM }));
      setTimeout(() => resolve(), 300);
    });
    await SafeAreaHelper.timeoutPromise;
    SafeAreaHelper.timeoutPromise = undefined;
    if (SafeAreaHelper.needUpdate) {
      SafeAreaHelper.needUpdate = false;
      SafeAreaHelper.notifyListeners();
    }
  }

  containerLayout?: Layout;

  contentLayout?: Layout;

  state = {
    ...DEFAULT_SAFE_AREA,
  };

  constructor(props: {}) {
    super(props);
    this.onContainerLayout = this.onContainerLayout.bind(this);
    this.onContentLayout = this.onContentLayout.bind(this);
  }

  onContainerLayout(e: LayoutChangeEvent) {
    this.containerLayout = e.nativeEvent.layout;
    this.calcSafeArea();
  }

  onContentLayout(e: LayoutChangeEvent) {
    this.contentLayout = e.nativeEvent.layout;
    this.calcSafeArea();
  }

  calcSafeArea() {
    if (this.contentLayout && this.containerLayout) {
      const validate = (val: number) => val >= 0 && val <= 90;
      const TOP = this.contentLayout.y;
      const BOTTOM = this.containerLayout.height - this.contentLayout.height - this.contentLayout.y;
      if (validate(TOP) && validate(BOTTOM)) {
        SafeAreaHelper.TOP = TOP;
        SafeAreaHelper.BOTTOM = BOTTOM;
        this.setState({ top: TOP, bottom: BOTTOM });
        SafeAreaHelper.notifyListeners();
      }
    }
  }

  render() {
    return (
      <SafeAreaContext.Provider value={{ ...this.state }}>
        <View
          onLayout={this.onContainerLayout}
          pointerEvents='none'
          style={styles.container}
        >
          <SafeAreaView style={styles.content}>
            <View
              onLayout={this.onContentLayout}
              style={styles.content}
            />
          </SafeAreaView>
        </View>
        {this.props.children}
      </SafeAreaContext.Provider>
    );
  }
}
