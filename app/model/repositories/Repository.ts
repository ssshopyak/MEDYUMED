import { inject } from 'react-ioc';
import DB from '../../lib/db';
import ApiService from '../api/ApiService';

export class Repository {
  @inject(DB)
  protected db!: DB;

  @inject(ApiService)
  protected api!: ApiService;
}
