import { ActionSheetIOS, ActionSheetIOSOptions, Platform } from 'react-native';
import AndroidButtonSheet from './AndroidButtonSheet/AndroidButtonSheet';
import I18n from '../resources/localization/translations';
import { StyleGuide } from '../resources/StyleGuide';

class ActionSheetBuilder {
  sheetOptions: Omit<ActionSheetIOSOptions, 'options'> = {};

  options: { text: string, callback: () => void }[] = [];

  addOption(text: string, callback: () => void) {
    this.options.push({ text, callback });
    return this;
  }

  getOptions(): [ActionSheetIOSOptions, (index: number) => void] {
    const options: ActionSheetIOSOptions = {
      ...this.sheetOptions,
      options: [],
    };
    options.options = this.options.map(item => item.text);
    options.title = I18n.t('chooseLanguage');
    options.cancelButtonIndex = options.options.length - 1;
    options.tintColor = StyleGuide.palette.pink;
    const callback = (index: number) => this.options[index].callback();
    return [options, callback];
  }

  show() {
    // eslint-disable-next-line no-use-before-define
    ActionSheet.show(...this.getOptions());
  }
}

export default class ActionSheet {
  static build() {
    return new ActionSheetBuilder();
  }

  static show(options: ActionSheetIOSOptions, callback: (index: number) => void) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(options, callback);
    } else {
      AndroidButtonSheet.showActionSheetWithOptions(options, callback);
    }
  }
}
