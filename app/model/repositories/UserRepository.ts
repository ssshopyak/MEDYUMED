import { Repository } from './Repository';
import {
  IAuth, IUser, Token, Clubs, IAppointmentServices, ITickets, ICertificates, IConfirmationEntries, IPopularCategories,
} from '../../lib/types';
import { ApiReview } from '../api/apiTypes';
import { parseError } from '../../lib/utils';

export class UserRepository extends Repository {
  public getToken(): Promise<Token> {
    return this.db.getToken();
  }

  public setToken(token: Token) {
    this.db.setToken(token);
  }

  public async sendCode(phone: string): Promise<void> {
    try {
      return await this.api.sendCode(phone);
    } catch (e) {
      return parseError(e);
    }
  }

  public async checkCode(phone: string, code: string) {
    try {
      const result = await this.api.checkCode(phone, code);
      this.setToken(result.passToken);
      return result.passToken;
    } catch (e) {
      return parseError(e);
    }
  }

  public async auth(phone: string): Promise<IAuth | undefined> {
    try {
      return await this.api.auth(phone);
    } catch (e) {
      return parseError(e);
    }
  }

  public async register(phone: string, name: string, email: string): Promise<IAuth | undefined> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.register(token, phone, name, email);
      } catch (e) {
        return parseError(e);
      }
    }
    return undefined;
  }

  public async getUser(): Promise<IUser | undefined> {
    const token = await this.getToken();
    try {
      if (token) {
        return await this.api.getUser(token);
      }
    } catch (e) {
      return parseError(e);
    }
    return undefined;
  }

  public async getBonuses() {
    const token = await this.getToken();
    try {
      if (token) {
        return await this.api.getBonuses(token);
      }
    } catch (e) {
      return parseError(e);
    }
    return undefined;
  }

  public async getDeposits() {
    const token = await this.getToken();
    try {
      if (token) {
        return await this.api.deposits(token);
      }
    } catch (e) {
      return parseError(e);
    }
    return undefined;
  }

  public async getTickets() :Promise<ITickets | undefined> {
    const token = await this.getToken();
    try {
      if (token) {
        return await this.api.tickets(token);
      }
    } catch (e) {
      return parseError(e);
    }
    return undefined;
  }

  public async getCertificates():Promise<ICertificates[] | undefined> {
    const token = await this.getToken();
    try {
      if (token) {
        return await this.api.certificates(token);
      }
    } catch (e) {
      return parseError(e);
    }
    return undefined;
  }

  public async updateUser(userData: {club: string, email: string, name: string, birthday: string, sex: string, lastName?: string, secondName?: string}): Promise<{userToken: string} | undefined> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.updateUser(token, userData);
      } catch (e) {
        return parseError(e);
      }
    }
    return undefined;
  }

  public async edit(name: string, email: string): Promise<void> {
    const token = await this.getToken();
    if (token) {
      try {
        await this.api.edit(token, name, email);
      } catch (e) {
        throw parseError(e);
      }
    }
  }

  public async club(): Promise<Clubs[]> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.club(token);
      } catch (e) {
        parseError(e);
      }
    }
    return [];
  }

  public async masters(serviceId: string, clubId: string, employeeId?: string, startDate?: string, endDate?:string) {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.masters(token, serviceId, clubId, employeeId, startDate, endDate);
      } catch (e) {
        parseError(e);
      }
    }
    return [];
  }

  public async appointmentDates(clubId: string, serviceId?: string, startDate?: string, endDate?: string, employeeId?: string): Promise<string[]> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.appointmentDates(token, clubId, serviceId, startDate, endDate, employeeId);
      } catch (e) {
        parseError(e);
      }
    }
    return [];
  }

  public async appointmentTimes(clubId: string, serviceId?: string, startDate?: string, endDate?: string, employeeId?: string): Promise<{dateTime: string, appointmentId: string}[]> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.appointmentTimes(token, clubId, serviceId, startDate, endDate, employeeId);
      } catch (e) {
        parseError(e);
      }
    }
    return [];
  }

  public async appointmentServices(clubId: string, employeeId?: string, serviceId?:string, parentId?: string): Promise<{[key: string]: IAppointmentServices[]}> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.appointmentServices(token, clubId, employeeId, serviceId, parentId);
      } catch (e) {
        parseError(e);
      }
    }
    return {};
  }

  public async getPopularCategories(serviceId?:string): Promise<IPopularCategories[]> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.popularCategories(token, serviceId);
      } catch (e) {
        parseError(e);
      }
    }
    return [];
  }

  public async masterReviews(employeeId: string): Promise<ApiReview[]> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.review(token, employeeId);
      } catch (e) {
        parseError(e);
      }
    }
    return [];
  }

  public async addMasterReviews(reviewData: {appointmentId: string, rating: string, review: string}) {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.addReview(token, reviewData);
      } catch (e) {
        parseError(e);
      }
    }
    return undefined;
  }

  public async makeAppointment(data?: {clubId: string, serviceId:string, employeeId: string, date: string, comment?: string}) {
    const token = await this.getToken();
    if (token) {
      try {
        await this.api.makeAppointment(token, data);
      } catch (e) {
        throw parseError(e);
      }
    }
  }

  public async searchServices(clubId: string, text:string): Promise<IAppointmentServices[]> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.searchServices(token, clubId, text);
      } catch (e) {
        parseError(e);
      }
    }
    return [];
  }

  public async visitsHistory(page?: number, limit?:number, pagination?: boolean, appointmentId?: string, type?: string, status?: string):Promise<IConfirmationEntries[]> {
    const token = await this.getToken();
    if (token) {
      try {
        return await this.api.visitsHistory(token, page, limit, pagination, appointmentId, type, status);
      } catch (e) {
        parseError(e);
      }
    }
    return [];
  }

  public async deleteAppointment(appointmentId: string) {
    const token = await this.getToken();
    if (token) {
      try {
        await this.api.deleteAppointment(token, appointmentId);
      } catch (e) {
        parseError(e);
      }
    }
  }
}
