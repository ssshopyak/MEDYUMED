import React from 'react';
import { inject, provider } from 'react-ioc';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import DB from '../lib/db';
import { StoreProvider } from './storeProvider';
import { MainController } from './controllers/MainController';
import { EventDispatcher } from '../lib/events/eventDispatcher';
import { UserViewModel } from '../model/viewModels/UserViewModels';
import { CommentsViewModels } from '../model/viewModels/CommentsViewModels';
import { EntryViewModels } from '../model/viewModels/EntryViewModels';
import { EntriesViewModels } from '../model/viewModels/EntriesViewModels';
import { MastersViewModels } from '../model/viewModels/MastersViewModels';
import { ConfirmedEntriesViewModels } from '../model/viewModels/ConfirmedEntriesViewModels';
import { UserRepository } from '../model/repositories/UserRepository';
import ApiService from '../model/api/ApiService';
import { ClubsViewModels } from '../model/viewModels/ClubsViewModels';
import { DateTimeViewModels } from '../model/viewModels/DateTimeViewModels';
import { persistor } from './reduxConfig';

@provider(
  DB,
  StoreProvider,
  MainController,
  ApiService,
  EventDispatcher,
  UserRepository,
  UserViewModel,
  CommentsViewModels,
  ClubsViewModels,
  EntryViewModels,
  DateTimeViewModels,
  EntriesViewModels,
  MastersViewModels,
  ConfirmedEntriesViewModels,
)
export class AppProvider extends React.Component<{}> {
  @inject(StoreProvider)
  storeProvider!: StoreProvider;

  render() {
    return (
      <SafeAreaProvider>
        <Provider store={this.storeProvider.store}>
          <PersistGate
            loading={null}
            persistor={persistor}
          >
            {this.props.children}
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
