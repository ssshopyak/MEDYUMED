import { ViewModel } from '../ViewModel';
import { setComments, setComment } from '../../redux/actions';
import { ApiReview } from '../api/apiTypes';

export class CommentsViewModels extends ViewModel {
  public setComment(comment: ApiReview) {
    this.dispatch(setComment(comment));
  }

  public setComments(comments: ApiReview[]) {
    this.dispatch(setComments(comments));
  }

  public getComment() {
    return this.getState().comments;
  }
}
