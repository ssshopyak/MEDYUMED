import { Alert, Dimensions, Platform } from 'react-native';

const IS_IOS = Platform.OS === 'ios';

export const { width, height } = Dimensions.get('screen');

export const isX = () => IS_IOS && width / height < 0.52;

export const isSmallPhone = () => (width < 350 || height < 350);

export function formatNumber(value: number | string): string {
  const str = String(value);
  return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

export function unmaskPhone(phone: string) {
  const clean = phone.replace(/[^\d]/g, '');
  return phone[0] === '+' ? `+${clean}` : clean;
}

export const sleep = async (duration: number) => new Promise(r => setTimeout(() => r(), duration));

export function getKey(id: number) {
  return String(id);
}

export function parseError(error: Error) {
  let message = error.message;
  try {
    const response = JSON.parse(error.message);
    if (response.error) {
      message = response.error.message;
      if (response.error.details.validations.hasOwnProperty('body')) {
        message += ' : ' + response.error.details.validations.body[0].message;
      } else if (response.error.details.validations.hasOwnProperty('query')) {
        message += ' : ' + response.error.details.validations.query[0].message;
      }
    }
  } catch (ignore) {
  }
  Alert.alert('Ошибка', message);
  return undefined;
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
