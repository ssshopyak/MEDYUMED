import { appReducer } from './app';
import { commentReducer } from './comment';
import { entriesReducer } from './entries';
import { userReducer } from './user';
import { entryReducer } from './entry';
import { masterReducer } from './masters';
import { confirmedEntriesReducer } from './confirmedEntries';
import { clubReducer } from './club';
import { dateReducer } from './date';
import { timeReducer } from './timeReducer';
import { appointmentServicesReducer } from './appointmentServices';
import { bonusesReducer } from './bonuses';
import { popularCategoriesReducer } from './popularCategories';

export const reducers = {
  app: appReducer,
  clubs: clubReducer,
  bonuses: bonusesReducer,
  date: dateReducer,
  time: timeReducer,
  comments: commentReducer,
  entries: entriesReducer,
  confirmedEntries: confirmedEntriesReducer,
  popularCategories: popularCategoriesReducer,
  appointmentServices: appointmentServicesReducer,
  entry: entryReducer,
  user: userReducer,
  masters: masterReducer,
};
