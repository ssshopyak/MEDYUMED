import { Entry } from '../../lib/types';
import { setAllEntries, setEntries, setEntry, setEntryInEntries } from '../../redux/actions';
import { ViewModel } from '../ViewModel';

export class EntriesViewModels extends ViewModel {
  public setEntry(entry: Entry) {
    this.dispatch(setEntry(entry));
  }

  public setEntryInEntries(entry: Entry) {
    this.dispatch(setEntryInEntries(entry));
  }

  public setEntries(entries: Entry[]) {
    this.dispatch(setEntries(entries));
  }

  public getEntries() {
    return this.getState().entries;
  }

  public deleteEntries() {
    this.dispatch(setAllEntries([]));
  }
}
