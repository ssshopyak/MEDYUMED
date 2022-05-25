import moment from 'moment';
import Controller from './controller';
import {
  reset, setBirthday, setBonuses, setClubs, setConfirmedEntries, setEmail, setEntry, setInitialized, setName,
  setPatronymic, setPhone,
  setSurname,
  setToken,
} from '../actions';
import { AppEvents } from '../../lib/events/eventDispatcher';
import { initNotifications } from '../thunkActions/notificationsActions';

export class MainController extends Controller {
  async getData() {
    const token = await this.db.getToken();
    const birthday = await this.db.geBirthday();
    const name = await this.db.getName();
    const surname = await this.db.getSurname();
    const patronymic = await this.db.getPatronymic();
    const email = await this.db.getEmail();
    const phone = await this.db.getPhone();
    this.dispatch(setInitialized());
    this.dispatch(setToken(token || ''));
    this.dispatch(setName(name || ''));
    this.dispatch(setSurname(surname || ''));
    this.dispatch(setPatronymic(patronymic || ''));
    this.dispatch(setBirthday(birthday && birthday.length > 0 ? moment(birthday, 'DD.MM.YYYY').format('DD.MM.YYYY') : ''));
    this.dispatch(setEmail(email || ''));
    this.dispatch(setPhone(phone || ''));
  }

  async init() {
    await this.getData();
    await this.dispatch(initNotifications());
    const clubs = await this.api.club(this.getToken());
    if (clubs && clubs.length > 0) {
      this.dispatch(setEntry({
        ...this.getState().entry,
        filial: clubs[0].title,
        clubId: clubs[0].id,
      }));
      this.dispatch(setClubs(clubs));
    }
    if (this.getToken()) {
      await this.loadDictionaries();
    }
  }

  async loadDictionaries() {
    const bonuses = await this.api.getBonuses(this.getToken());
    if (bonuses.length > 0) {
      this.dispatch(setBonuses(bonuses));
    }
    const entries = await this.api.visitsHistory(this.getToken());
    if (entries.length > 0) {
      this.dispatch(setConfirmedEntries(entries));
    }
  }

  private async _logout() {
    await this.db.clear();
    this.dispatch(reset());
    this.eventDispatcher.dispatchEvent(AppEvents.LOGOUT);
  }

  async logout() {
    await this._logout();
  }
}
