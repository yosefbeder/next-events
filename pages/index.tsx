import type { GetStaticProps, NextPage } from 'next';
import EventsList, { EventsListProps } from '../components/Events/EventsList';
import { getFeaturedEvents } from '../data/events-data';

export const getStaticProps: GetStaticProps<EventsListProps> = () => {
  return { props: { events: getFeaturedEvents() } };
};

const Home: NextPage<EventsListProps> = ({ events }) => {
  return (
    <>
      <EventsList events={events} />
    </>
  );
};

export default Home;
