import { ViewModel } from '../ViewModel';
import { Master } from '../../lib/types';
import { setDellMaster, setMasters, setUpdateMaster } from '../../redux/actions';

export class MastersViewModels extends ViewModel {
  public getMasters() {
    return this.getState().masters;
  }

  public setMasters(master: Master[]) {
    return this.dispatch(setMasters(master));
  }

  public updateMasters(master: Master) {
    return this.dispatch(setUpdateMaster(master));
  }

  public deleteMasters() {
    this.dispatch(setDellMaster([]));
  }
}
