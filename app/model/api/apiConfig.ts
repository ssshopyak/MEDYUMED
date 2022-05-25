import { Config } from 'rest-api-helper';

declare const global: any;

const RUN_IN_V8 = Boolean(global.origin);

interface ExtendedConfig extends Omit<Config, 'baseURL'> {
  PROD_URL: string;
  DEV_URL: string;
}

const config: ExtendedConfig = {
  PROD_URL: 'https://api.medymed.ru/api',
  DEV_URL: 'https://api.medymed.ru/api',
  logger: __DEV__ && RUN_IN_V8,
  statusDescription: {
    200: 'OK',
    401: 'Invalid API token',
  },
  headers: {
    'content-type': 'application/json',
  },
  successStatus: [200],
  request: {
    sendCode: {
      method: 'post',
      url: '/user/send-sms',
    },
    checkCode: {
      method: 'post',
      url: '/user/check-code',
    },
    register: {
      method: 'post',
      url: '/user/register',
    },
    auth: {
      method: 'post',
      url: '/user/auth',
    },
    edit: {
      method: 'post',
      url: '/user/edit',
    },
    getUser: {
      method: 'get',
      url: '/user',
    },
    bonuses: {
      method: 'get',
      url: '/user/bonuses',
    },
    club: {
      method: 'get',
      url: '/club',
    },
    masters: {
      method: 'get',
      url: '/service/masters',
    },
    updateUser: {
      method: 'put',
      url: '/user',
    },
    appointmentDates: {
      method: 'get',
      url: '/service/appointment-dates',
    },
    appointmentTimes: {
      method: 'get',
      url: '/service/appointment-times',
    },
    appointmentServices: {
      method: 'get',
      url: '/service/appointment-services',
    },
    service: {
      method: 'get',
      url: '/service',
    },
    promotions: {
      method: 'get',
      url: '/service/promotions',
    },
    review: {
      method: 'get',
      url: '/service/review',
    },
    addReview: {
      method: 'post',
      url: '/service/review',
    },
    priceList: {
      method: 'get',
      url: '/service/price-list',
    },
    searchServices: {
      method: 'get',
      url: '/service/search',
    },
    visitsHistory: {
      method: 'get',
      url: '/user/visits-history',
    },
    deposits: {
      method: 'get',
      url: '/user/deposits',
    },
    tickets: {
      method: 'get',
      url: '/service/tickets',
    },
    certificates: {
      method: 'get',
      url: '/service/certificates',
    },
    popularCategories: {
      method: 'get',
      url: '/service/groups',
    },
    makeAppointment: {
      method: 'post',
      url: '/service/make-appointment',
    },
    deleteAppointment: {
      method: 'delete',
      url: '/service/appointment',
    },
  },
};

export default config;
