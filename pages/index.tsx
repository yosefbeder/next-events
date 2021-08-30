import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import EventsList, { EventsListProps } from '../components/Events/EventsList';
import { EventType } from '../types';
import transformToArray from '../utils/transform-to-array';
import transformToEventItemProps from '../utils/transform-to-event-item-props';

export const getStaticProps: GetStaticProps<EventsListProps> = async () => {
  const req = await fetch(
    'https://next-events-d38eb-default-rtdb.firebaseio.com/events.json',
  );

  const data = await req.json();

  const events = (transformToArray(data) as EventType[])
    .filter(event => event.isFeatured)
    .map(event => transformToEventItemProps(event));

  return {
    props: {
      events,
      revalidate: 60,
    },
  };
};

const Home = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <EventsList events={events} />
    </>
  );
};

export default Home;
