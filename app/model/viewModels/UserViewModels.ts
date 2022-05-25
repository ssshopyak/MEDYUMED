import moment from 'moment';
import { inject } from 'react-ioc';
import { ViewModel } from '../ViewModel';
import { setEmail, setName, setPhone, setToken, setBirthday, setSurname, setPatronymic } from '../../redux/actions';
import { UserRepository } from '../repositories/UserRepository';

export class UserViewModel extends ViewModel {
  @inject(UserRepository)
  userRepository!: UserRepository;

  public setToken(token: string) {
    this.db.setToken(token);
  }

  public setTokenN(token: string) {
    this.dispatch(setToken(token));
  }

  public setNameDB(name: string) {
    this.db.setName(name);
  }

  public setName(name: string) {
    this.dispatch(setName(name));
  }

  public setSurnameDB(surname: string) {
    this.db.setSurname(surname);
  }

  public setSurname(surname: string) {
    this.dispatch(setSurname(surname));
  }

  public setPatronymicDB(patronymic: string) {
    this.db.setPatronymic(patronymic);
  }

  public setPatronymic(patronymic: string) {
    this.dispatch(setPatronymic(patronymic));
  }

  public setEmailDB(email: string) {
    this.db.setEmail(email);
  }

  public setEmail(email: string) {
    this.dispatch(setEmail(email));
  }

  public setPhoneDB(phone: string) {
    this.db.setPhone(phone);
  }

  public setPhone(phone: string) {
    this.dispatch(setPhone(phone));
  }

  public setBirthdayDB(birthday?: string) {
    this.db.setBirthday(birthday);
  }

  public setBirthday(birthday?: string) {
    this.dispatch(setBirthday(birthday));
  }

  async getUser(phone?: string) {
    const infoUser = await this.userRepository.getUser();
    if (infoUser) {
      const birthday = infoUser.birthday && infoUser.birthday.length > 0
        ? moment(infoUser.birthday).format('DD.MM.YYYY')
        : undefined;
      this.setName(infoUser.name);
      this.setNameDB(infoUser.name);
      this.setSurname(infoUser.surname);
      this.setSurnameDB(infoUser.surname);
      this.setPatronymic(infoUser.patronymic);
      this.setPatronymicDB(infoUser.patronymic);
      this.setEmail(infoUser.email);
      this.setEmailDB(infoUser.email);
      if (phone) {
        this.setPhone(phone);
        this.setPhoneDB(phone);
      }
      this.setBirthday(birthday);
      this.setBirthdayDB(birthday);
    }
    return infoUser;
  }

  async updateUser(params: {club: string, email: string, name: string, birthday?: string, sex: string, lastName?: string, secondName?: string}) {
    const newToken = await this.userRepository.updateUser(params);
    if (newToken && newToken.userToken) {
      this.getUser();
    }
  }
}
