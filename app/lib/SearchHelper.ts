export type SearchFunction<Item> = (query: string) => Promise<Item[]>;

class CancelablePromise<T> {
  public readonly promise: Promise<T>;

  private _resolve?: (res: T) => void;

  private _reject?: (reason: any) => void;

  private state: 'pending' | 'resolved' | 'rejected';

  constructor(func: () => Promise<T>) {
    this.state = 'pending';
    this.promise = new Promise(async (resolve, reject) => {
      this._reject = reject;
      this._resolve = resolve;
      try {
        const res = await func();
        this.resolve(res);
      } catch (e) {
        this.reject(e);
      }
    });
  }

  private resolve(res: T) {
    if (this.state === 'pending') {
      this.state = 'resolved';
      if (this._resolve) {
        this._resolve(res);
      }
    }
  }

  private reject(err: any) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      if (this._reject) {
        this._reject(err);
      }
    }
  }

  public abort() {
    this.reject('canceled');
  }
}

export default class SearchHelper<Item> {
  private searchFunction: SearchFunction<Item>;

  private resultCallback: (results: Item[]) => void;

  private searchPromise?: CancelablePromise<Item[]>;

  private lastQuery?: string = undefined;

  private emptyResults: Item[];

  constructor(searchFunction: SearchFunction<Item>, resultCallback: (results: Item[]) => void, emptyResults: Item[] = []) {
    this.searchFunction = searchFunction;
    this.resultCallback = resultCallback;
    this.emptyResults = emptyResults;
  }

  public async search(query: string = '', withFilters: boolean = false) {
    if (query === '' && !withFilters) {
      this.lastQuery = query;
      if (this.searchPromise) {
        this.searchPromise.abort();
        this.searchPromise = undefined;
      }
      this.resultCallback(this.emptyResults);
      return;
    }
    if (this.searchPromise) {
      this.lastQuery = query;
      return;
    }
    this.lastQuery = undefined;
    this.searchPromise = new CancelablePromise(() => this.searchFunction(query));
    try {
      const result = await this.searchPromise.promise;
      this.resultCallback(result);
    } catch (ignored) {
    }
    this.searchPromise = undefined;
    if (this.lastQuery) {
      this.search(this.lastQuery);
    }
  }
}
