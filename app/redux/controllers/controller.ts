import { AnyAction } from 'redux';
import { inject } from 'react-ioc';
import { StoreProvider } from '../storeProvider';
import DB from '../../lib/db';
import { EventDispatcher } from '../../lib/events/eventDispatcher';
import { AppThunk, GlobalState } from '../../lib/types';
import ApiService from '../../model/api/ApiService';

export default class Controller {
  @inject(EventDispatcher)
  eventDispatcher!: EventDispatcher;

  @inject(StoreProvider)
  protected storeProvider!: StoreProvider;

  @inject(ApiService)
  protected api!: ApiService;

  @inject(DB)
  protected db!: DB;

  protected get store() {
    return this.storeProvider.store;
  }

  protected getState(): GlobalState {
    return this.store.getState();
  }

  protected dispatch(action: AnyAction | AppThunk) {
    // @ts-ignore
    this.store.dispatch(action);
  }

  protected getToken() {
    return this.getState().user.token;
  }
}
