export interface ApiCheckCode {
  passToken: string;
}

export interface ApiPromotions {
  method: string;
  name: string;
  provision: string;
  recipients: {id: string}[];
  value: string;
}

export type ApiUser = {
  name: string;
  lastName: string;
  secondName: string;
  email: string;
  birthday: string;
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
}

export type ApiTickets = {
  club: {id: string, title: string};
  services: ApiServicesTickets[];
};

export interface ApiServicesTickets {
  available_clubs: {id: string, title: string}[];
  balance_frozen: number;
  balance_guest_visit: number;
  count: number;
  endDate: string;
  freeze_list: [];
  min_frozen_count: number;
  service_list: {title: string, count: number}[];
  status: string;
  statusDate: null;
  ticketId: string;
  title: string;
  total_frozen: number;
  total_guest_visit: number;
  type: string;
  аvialable_аctions: [];
}

export interface ApiPriceList {
  availableTime: {};
  category: {};
  comment: string;
  count: {};
  countOfAdditionalOwner: {};
  countOfFreezings: {};
  courseChoiceRequired: boolean;
  cyclePeriodsChoiceRequired: boolean;
  department: {};
  description: string;
  employeeChoiceRequired: boolean;
  id: string;
  price: string;
  services: {};
  title: string;
  type: string;
  validity: {};
}

export interface ApiReview {
  review: string;
  rating: number;
  name: string;
}
