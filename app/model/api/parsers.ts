import moment from 'moment';
import { IAppointmentServices, ICheckCode, IUser, ServicesTickets } from '../../lib/types';
import { ApiCheckCode, ApiServicesTickets, ApiUser } from './apiTypes';

export function parseCheckCode(checkCode: ApiCheckCode): ICheckCode {
  return {
    passToken: checkCode.passToken,
  };
}

export function parseTime(time: {dateTime: string, appointmentId: string}[], startDate: string): {dateTime: string, appointmentId: string}[] {
  const parseTimes = time.filter(value => (
    value.dateTime.includes(startDate) && value.dateTime.slice(11)
  ));
  return parseTimes.map(value => (
    {
      dateTime: moment(value.dateTime).format('HH:mm'),
      appointmentId: value.appointmentId,
    }
  ));
}

export function parseAppointmentService(services: IAppointmentServices[]): {} {
  let test: {[key: string]: {}[]} = {};
  services.forEach((value) => {
    if (Object.prototype.hasOwnProperty.call(test, value.parent.title)) {
      test[value.parent.title] = [...test[value.parent.title], value];
    } else {
      test = {
        ...test,
        [value.parent.title]: [value],
      };
    }
  });
  return test;
}

export function parseServiceTickets(services: ApiServicesTickets): ServicesTickets {
  return {
    availableClubs: services.available_clubs,
    balanceFrozen: services.balance_frozen,
    balanceGuestVisit: services.balance_guest_visit,
    count: services.count,
    endDate: services.endDate,
    freezeList: services.freeze_list,
    minFrozenCount: services.min_frozen_count,
    serviceList: services.service_list,
    status: services.status,
    statusDate: services.statusDate,
    ticketId: services.ticketId,
    title: services.title,
    totalFrozen: services.total_frozen,
    totalGuestVisit: services.total_guest_visit,
    type: services.type,
    availableActions: services.аvialable_аctions,
  };
}

export function parseUser(user: ApiUser): IUser {
  return {
    name: user.name,
    surname: user.lastName,
    patronymic: user.secondName,
    email: user.email,
    birthday: user.birthday,
    sex: user.sex,
    club: user.club,
    manager: user.manager,
    promocodes: user.promocodes,
    tags: user.tags,
    cards: user.cards,
  };
}
