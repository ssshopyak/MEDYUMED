import React from 'react';
import { Platform } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../resources/constants';
import { isX } from '../../lib/utils';

export interface SafeAreaParams {
  top: number;
  bottom: number;
}

const topDefaultValue = (() => (Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0))();
const bottomDefaultValue = (() => {
  if (Platform.OS === 'ios') {
    return isX() ? 34 : 0;
  }
  return 0;
})();

export const DEFAULT_SAFE_AREA = { top: topDefaultValue, bottom: bottomDefaultValue };

export const SafeAreaContext = React.createContext<SafeAreaParams>(DEFAULT_SAFE_AREA);
