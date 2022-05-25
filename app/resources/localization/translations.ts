import I18n from 'react-native-i18n';
import ru from './ru.json';
import en from './en.json';
import { setLanguage } from '../../redux/actions';

I18n.fallbacks = true;
I18n.translations = {
  en,
  ru,
};

const defaultLanguage = () => {
  I18n.locale = 'ru';
};

defaultLanguage();

export const changeLocale = (lng) => {
  setLanguage(lng);
  I18n.locale = lng;
};

export default I18n;

