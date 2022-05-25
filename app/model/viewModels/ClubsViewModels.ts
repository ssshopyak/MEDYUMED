import { Clubs } from '../../lib/types';
import { ViewModel } from '../ViewModel';
import { setClubs } from '../../redux/actions';

export class ClubsViewModels extends ViewModel {
  public setClubs(clubs: Clubs[]) {
    this.dispatch(setClubs(clubs));
  }

  public getClubs() {
    return this.getState().clubs;
  }
}
