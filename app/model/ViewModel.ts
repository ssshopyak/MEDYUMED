import { inject } from 'react-ioc';
import Controller from '../redux/controllers/controller';
import DB from '../lib/db';
import { GlobalState } from '../lib/types';

export class ViewModel extends Controller {
  @inject(DB)
  protected db!: DB;

  public getState(): GlobalState {
    return this.store.getState();
  }
}
