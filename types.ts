import { CommentItemProps } from './components/Comments/CommentItem';
import { EventItemProps } from './components/Events/EventItem';

export interface CommentType extends CommentItemProps {
  id: string;
}

export interface EventType extends EventItemProps {
  isFeatured: boolean;
  description: string;
  comments: CommentType[];
}
