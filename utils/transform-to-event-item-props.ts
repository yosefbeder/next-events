import { EventItemProps } from '../components/Events/EventItem';
import { EventType } from '../types';

const transformToEventItemProps = ({
  id,
  title,
  image,
  date,
  location,
}: EventType): EventItemProps => ({
  id,
  title,
  image,
  date,
  location,
});

export default transformToEventItemProps;
