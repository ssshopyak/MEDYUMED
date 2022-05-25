import AsyncStorage from '@react-native-community/async-storage';

const TOKEN = 'token';
const NAME = 'name';
const SURNAME = 'surname';
const PATRONYMIC = 'patronymic';
const EMAIL = 'email';
const PHONE = 'phone';
const BIRTHDAY = 'birthday';

export default class DB {
  private parseStoredItem(item: null | string) {
    if (item === null) {
      return undefined;
    }
    return JSON.parse(item);
  }

  clear(): Promise<void> {
    return AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
  }

  async getToken(): Promise<undefined | string> {
    const token = await AsyncStorage.getItem(TOKEN);
    return token || undefined;
  }

  async getName(): Promise<undefined | string> {
    const name = await AsyncStorage.getItem(NAME);
    return name || undefined;
  }

  async getSurname(): Promise<undefined | string> {
    const surname = await AsyncStorage.getItem(SURNAME);
    return surname || undefined;
  }

  async getPatronymic(): Promise<undefined | string> {
    const patronymic = await AsyncStorage.getItem(PATRONYMIC);
    return patronymic || undefined;
  }

  async getEmail(): Promise<undefined | string> {
    const email = await AsyncStorage.getItem(EMAIL);
    return email || undefined;
  }

  async getPhone(): Promise<undefined | string> {
    const phone = await AsyncStorage.getItem(PHONE);
    return phone || undefined;
  }

  async geBirthday(): Promise<undefined | string> {
    const birthday = await AsyncStorage.getItem(BIRTHDAY);
    return birthday || undefined;
  }

  setToken(token: undefined | string): Promise<void> {
    if (token) {
      return AsyncStorage.setItem(TOKEN, token);
    } else {
      return AsyncStorage.removeItem(TOKEN);
    }
  }

  setName(name: undefined | string): Promise<void> {
    if (name) {
      return AsyncStorage.setItem(NAME, name);
    } else {
      return AsyncStorage.removeItem(NAME);
    }
  }

  setSurname(surname: undefined | string): Promise<void> {
    if (surname) {
      return AsyncStorage.setItem(SURNAME, surname);
    } else {
      return AsyncStorage.removeItem(SURNAME);
    }
  }

  setPatronymic(patronymic: undefined | string): Promise<void> {
    if (patronymic) {
      return AsyncStorage.setItem(PATRONYMIC, patronymic);
    } else {
      return AsyncStorage.removeItem(PATRONYMIC);
    }
  }

  setEmail(email: undefined | string): Promise<void> {
    if (email) {
      return AsyncStorage.setItem(EMAIL, email);
    } else {
      return AsyncStorage.removeItem(EMAIL);
    }
  }

  setPhone(phone: undefined | string): Promise<void> {
    if (phone) {
      return AsyncStorage.setItem(PHONE, phone);
    } else {
      return AsyncStorage.removeItem(PHONE);
    }
  }

  setBirthday(birthday: undefined | string): Promise<void> {
    if (birthday) {
      return AsyncStorage.setItem(BIRTHDAY, birthday);
    } else {
      return AsyncStorage.removeItem(BIRTHDAY);
    }
  }
}
