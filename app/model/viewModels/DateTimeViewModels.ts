import { ViewModel } from '../ViewModel';
import { setFreeDates } from '../../redux/actions';

export class DateTimeViewModels extends ViewModel {
  public setDate(date: string[]) {
    this.dispatch(setFreeDates(date));
  }

  public getDate() {
    return this.getState().date;
  }

  public setTime(time: string[]) {
    this.dispatch(setFreeDates(time));
  }

  public getTime() {
    return this.getState().time;
  }
}
