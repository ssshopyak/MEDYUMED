import { Entry } from '../../lib/types';
import { setEntry } from '../../redux/actions';
import { ViewModel } from '../ViewModel';

export class EntryViewModels extends ViewModel {
  public setEntry(entry: Entry) {
    this.dispatch(setEntry(entry));
  }

  public getEntry() {
    return this.getState().entry;
  }

  public deleteEntry() {
    this.dispatch(setEntry({
      ...this.getEntry(),
      typeDiscount: '',
      title: '',
      service: '',
      comment: '',
      date: '',
      time: '',
      serviceId: '',
      master: '',
      employeeId: '',
      price: '',
      needBack: false,
    }));
  }
}
