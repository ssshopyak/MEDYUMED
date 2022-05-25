import { RestApiHelper } from 'rest-api-helper';
import { Alert } from 'react-native';
import config from './apiConfig';
import {
  Clubs, IAppointmentServices, Master, IAuth, ICheckCode, IUser, ITickets, Bonuses, ICertificates, IConfirmationEntries,
  IPopularCategories,
} from '../../lib/types';
import { parseAppointmentService, parseTime, parseCheckCode, parseServiceTickets, parseUser } from './parsers';
import { ApiPriceList, ApiPromotions, ApiReview, ApiTickets, ApiUser } from './apiTypes';

export default class ApiService {
  private baseURL = '';

  constructor(prod = true) {
    this.baseURL = prod ? config.PROD_URL : config.DEV_URL;
    RestApiHelper.builder().withConfig({
      ...config,
      baseURL: this.baseURL,
    });
  }

  processError(error: { message: string, response?: { status: number } }) {
    const messageJson = JSON.parse(error.message);
    if (messageJson.data !== null) {
      Alert.alert('Ошибка', messageJson.data);
    } else {
      Alert.alert('Ошибка', error.message);
    }
    return {
      ok: false,
      statusText: error.message || 'An Unknown error occurred with the Request',
      statusCode: error.response?.status,
    };
  }

  async sendCode(phone: string): Promise<void> {
    const METHOD = 'sendCode';
    await RestApiHelper.build<{}>(METHOD)
      .withBody({ phone })
      .fetch();
  }

  async checkCode(phone: string, confirmationCode: string): Promise<ICheckCode> {
    const METHOD = 'checkCode';
    const response = await RestApiHelper.build<{ data: ICheckCode}>(METHOD)
      .withBody({ phone, confirmationCode })
      .fetch();
    if (response.body.data !== null) {
      return parseCheckCode(response.body.data);
    } else {
      throw response.body.error;
    }
  }

  async auth(phone: string): Promise<IAuth> {
    const METHOD = 'auth';
    const response = await RestApiHelper.build<{data: IAuth}>(METHOD)
      .withBody({ phone })
      .fetch();
    return response.body.data;
  }

  async register(passToken: string, phone: string, name: string, email: string): Promise<IAuth> {
    const METHOD = 'register';
    const response = await RestApiHelper.build<{data: IAuth}>(METHOD)
      .withBody({ phone, passToken, name, email }).fetch();
    return response.body.data;
  }

  async getUser(usertoken: string): Promise<IUser> {
    const METHOD = 'getUser';
    const response = await RestApiHelper.build<{data: ApiUser}>(METHOD)
      .withHeaders({ usertoken })
      .fetch();
    return parseUser(response.body.data);
  }

  async getBonuses(usertoken: string): Promise<Bonuses[]> {
    const METHOD = 'bonuses';
    const response = await RestApiHelper.build<{data: Bonuses[]}>(METHOD)
      .withHeaders({ usertoken })
      .fetch();
    return response.body.data;
  }

  async updateUser(usertoken: string, userData:{club: string, email: string, name: string, birthday: string, sex: string, lastName?: string, secondName?: string, doNotDisturb?: string}): Promise<{userToken: string}> {
    const METHOD = 'updateUser';
    const response = await RestApiHelper.build<{data: {userToken: string}}>(METHOD)
      .withHeaders({ usertoken })
      .withBody(userData)
      .fetch();
    return response.body.data;
  }

  async edit(userToken: string, name: string, email: string): Promise<void> {
    const METHOD = 'edit';
    await RestApiHelper.build<void>(METHOD)
      .withBody({ userToken, name, email }).fetch();
  }

  async club(usertoken: string): Promise<Clubs[]> {
    const METHOD = 'club';
    const response = await RestApiHelper.build<{data: Clubs[]}>(METHOD)
      .withHeaders({ usertoken }).fetch();
    return response.body.data;
  }

  async masters(usertoken: string, serviceId: string, clubId: string, employeeId?:string, startDate?: string, endDate?:string): Promise<Master[]> {
    const METHOD = 'masters';
    const response = await RestApiHelper.build<{data: Master[]}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ serviceId, clubId, employeeId, startDate, endDate })
      .fetch();
    return response.body.data;
  }

  async appointmentDates(usertoken: string, clubId: string, serviceId?: string, startDate?: string, endDate?: string, employeeId?: string): Promise<string[]> {
    const METHOD = 'appointmentDates';
    const response = await RestApiHelper.build<{data: string[]}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ clubId, serviceId, startDate, endDate, employeeId })
      .fetch();
    return response.body.data;
  }

  async appointmentTimes(usertoken: string, clubId: string, serviceId?: string, startDate?: string, endDate?: string, employeeId?: string): Promise<{dateTime: string, appointmentId: string}[]> {
    const METHOD = 'appointmentTimes';
    const response = await RestApiHelper.build<{data: {dateTime: string, appointmentId: string}[]}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ clubId, serviceId, startDate, endDate, employeeId })
      .fetch();
    return parseTime(response.body.data, startDate!);
  }

  async appointmentServices(usertoken: string, clubId: string, employeeId?: string, serviceId?:string, parentId?: string): Promise<{[key: string]: IAppointmentServices[]}> {
    const METHOD = 'appointmentServices';
    const response = await RestApiHelper.build<{data: IAppointmentServices[]}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ clubId, employeeId, serviceId, parentId })
      .fetch();
    return parseAppointmentService(response.body.data);
  }

  async getService(usertoken: string, clubId?: string, serviceId?: string, startDate?: string, endDate?: string, page?: number, limit?:number, pagination?:boolean): Promise<{}> {
    const METHOD = 'service';
    const response = await RestApiHelper.build<{}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ clubId, serviceId, startDate, endDate, page, limit, pagination })
      .fetch();
    return response.body;
  }

  async promotions(usertoken: string) {
    const METHOD = 'promotions';
    const response = await RestApiHelper.build<{data : ApiPromotions}>(METHOD)
      .withHeaders({ usertoken })
      .fetch();
    return response.body.data;
  }

  async review(usertoken: string, employeeId: string) {
    const METHOD = 'review';
    const response = await RestApiHelper.build<{data: ApiReview[]}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ employeeId })
      .fetch();
    return response.body.data;
  }

  async addReview(usertoken: string, reviewData: {appointmentId: string, rating: string, review: string}) {
    const METHOD = 'addReview';
    const response = await RestApiHelper.build<{}>(METHOD)
      .withHeaders({ usertoken })
      .withBody(reviewData)
      .fetch();
    return response.body;
  }

  async priceList(usertoken: string, clubId: string, type?:string, count?:string, serviceId?: string, employeeId?:string, startDate?:string, courseId?:string) {
    const METHOD = 'priceList';
    const response = await RestApiHelper.build<{data: ApiPriceList}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ clubId, type, count, serviceId, employeeId, startDate, courseId })
      .fetch();
    return response.body.data;
  }

  async makeAppointment(usertoken: string, data?: {clubId: string, serviceId:string, employeeId: string, date: string, comment?: string}) {
    const METHOD = 'makeAppointment';
    const response = await RestApiHelper.build<{}>(METHOD)
      .withHeaders({ usertoken })
      .withBody(data)
      .fetch();
    return response.body;
  }

  async deposits(usertoken: string) {
    const METHOD = 'deposits';
    const response = await RestApiHelper.build<{}>(METHOD)
      .withHeaders({ usertoken })
      .fetch();
    return response.body;
  }

  async tickets(usertoken: string): Promise<ITickets> {
    const METHOD = 'tickets';
    const response = await RestApiHelper.build<{data: ApiTickets}>(METHOD)
      .withHeaders({ usertoken })
      .fetch();
    return { club: response.body.data.club, services: response.body.data.services.map(parseServiceTickets) };
  }

  async certificates(usertoken: string): Promise<ICertificates[]> {
    const METHOD = 'certificates';
    const response = await RestApiHelper.build<{data: ICertificates[]}>(METHOD)
      .withHeaders({ usertoken })
      .fetch();
    return response.body.data;
  }

  async popularCategories(usertoken: string, serviceId?: string): Promise<IPopularCategories[]> {
    const METHOD = 'popularCategories';
    const response = await RestApiHelper.build<{data: IPopularCategories[]}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ serviceId, isPopular: true })
      .fetch();
    return response.body.data;
  }

  async searchServices(usertoken: string, clubId: string, text:string): Promise<IAppointmentServices[]> {
    const METHOD = 'searchServices';
    const response = await RestApiHelper.build<{data: IAppointmentServices[]}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ clubId, text })
      .fetch();
    return response.body.data;
  }

  async visitsHistory(usertoken: string, page?: number, limit?:number, pagination?: boolean, appointmentId?: string, type?: string, status?: string): Promise<IConfirmationEntries[]> {
    const METHOD = 'visitsHistory';
    const response = await RestApiHelper.build<{data: IConfirmationEntries[]}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ page, limit, pagination, appointmentId, type, status })
      .fetch();
    return response.body.data;
  }

  async deleteAppointment(usertoken: string, appointmentId: string) {
    const METHOD = 'deleteAppointment';
    const response = await RestApiHelper.build<{}>(METHOD)
      .withHeaders({ usertoken })
      .withQueryParams({ appointmentId })
      .fetch();
    return response.body;
  }
}
