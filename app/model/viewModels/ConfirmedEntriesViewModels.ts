import { ViewModel } from '../ViewModel';
import { setConfirmedEntries } from '../../redux/actions';
import { IConfirmationEntries } from '../../lib/types';

export class ConfirmedEntriesViewModels extends ViewModel {
  public setConfirmedEntries(entry: IConfirmationEntries[]) {
    this.dispatch(setConfirmedEntries(entry));
  }

  public getConfirmedEntries() {
    return this.getState().confirmedEntries;
  }
}
