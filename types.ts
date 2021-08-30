import { EventItemProps } from './components/Events/EventItem';

export interface EventType extends EventItemProps {
  isFeatured: boolean;
  description: string;
}
