import { Image, ImageProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Action } from 'redux';
import { ThunkAction } from '@reduxjs/toolkit';
import { ApiReview } from '../model/api/apiTypes';
import TranslationsKeys from '../resources/localization/translations';

export type Token = string | undefined;

export type CommonImageProps = Omit<ImageProps, 'resizeMode' | 'onLoad' | 'onError'>;

export type ImageComponentType = typeof Image | typeof FastImage | React.ComponentClass<CommonImageProps>;

export type TranslationsType = {
  ru: { [key in TranslationsKeys]: string };
  en: { [key in TranslationsKeys]: string };
};

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  GlobalState,
  unknown,
  Action<string>>;

export interface AppState {
  initialized: boolean;
  language: string;
}

export interface Entry {
  id: number,
  typeDiscount: string,
  service: string;
  serviceId: string;
  price: string;
  master: string;
  employeeId: string;
  filial: string;
  clubId: string;
  date: string;
  time: string;
  comment: string;
  title: string;
  needBack: boolean;
}

export interface Comment {
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface User {
  token: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  birthday?: string;
  balance: number;
  clubs: {
    id: string;
    title: string;
  }[];
  exists: boolean;
  id: string;
  type: { name: string, id: string };
}

export interface Bonuses {
  accrualValidityPeriod: string;
  balance: number;
  id: string;
  name: string;
  type: { name: string, id: string };
  validityPeriod: string;
}

export interface Master {
  about: string;
  department: {
    id: string,
    title: string
  };
  id: string;
  name: string;
  photo: string;
  position: {
    id: string,
    title: string
  };
  rating: number;
  reviews: number;
  feedback: ApiReview[];
}

export interface WorkTime {
  Day: string;
  finish: string;
  start: string;
}

export interface Clubs {
  address: string;
  authMessageToUser: string;
  countries: string[];
  current: {};
  id: string;
  lat: number;
  lon: number;
  title: string;
  working: WorkTime[];
}

export interface GlobalState {
  app: AppState;
  clubs: Clubs[];
  date: string[];
  time: { dateTime: string, appointmentId: string }[];
  bonuses: Bonuses[];
  user: User;
  comments: ApiReview[];
  entry: Entry;
  entries: Entry[];
  confirmedEntries: IConfirmationEntries[];
  masters: Master[];
  popularCategories: IPopularCategories[];
  appointmentServices: { [key: string]: IAppointmentServices[] };
}

export type ICheckCode = {
  passToken: string;
};

export type IPopularCategories = {
  id: string;
  name: string;
}

export type IAppointmentServices = {
  cardio: null;
  description: string;
  endurance: null;
  flexibility: null;
  id: string;
  parent: { id: string, title: string }
  paymentRequired: boolean;
  price: string;
  strength: null
  title: string;
};

export type IAuth = {
  id: string;
  userToken: string;
};

export type ServicesTickets = {
  availableClubs: { id: string, title: string }[];
  balanceFrozen: number;
  balanceGuestVisit: number;
  count: number;
  endDate: string;
  freezeList: [];
  minFrozenCount: number;
  serviceList: { title: string, count: number }[];
  status: string;
  statusDate: null;
  ticketId: string;
  title: string;
  totalFrozen: number;
  totalGuestVisit: number;
  type: string;
  availableActions: [];
}

export type ITickets = {
  club: { id: string, title: string };
  services: ServicesTickets[];
};

export type ICertificates = {
  sum: number;
  dateRegistration: string;
  balance: number;
};

export type IUser = {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  birthday?: string;
  sex: string;
  club: {
    id: string;
    name: string;
  },
  manager: {
    id: string;
    name: string;
    phone: string;
    email: string;
  },
  promocodes:
    {
      title: string;
      promocode: string;
    }[],
  tags:
    {
      id: string;
      title: string;
    }[],
  cards:
    {
      id: string;
      title: string;
      link: string;
      code: string;
      type: string;
    }[]
};

export type IConfirmationEntries = {
  appointmentId: string;
  arrivalStatus: string;
  capacity: 0
  clubId: string;
  commercial: false
  duration: 45
  employee: { id: string, name: string, position: { id: string, title: string } }
  endDate: string;
  group: { id: string, title: string }
  marketingBadges: []
  payment: { ticket_id: string, type: string, title: string }
  preEntry: false
  reasonAppointment: string;
  reasonClient: string;
  room: { id: string, title: string }
  service: {
    color: string,
    course: { id: string, title: string }
    description: string,
    id: string,
    title: string
  }
  startDate: string;
  status: string;
  type: string;
}
