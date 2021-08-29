import type { NextPage } from 'next';
import EventsList from '../components/Events/EventsList';
import { getFeaturedEvents } from '../data/events-data';

const Home: NextPage = () => {
  return (
    <>
      <EventsList events={getFeaturedEvents()} />
    </>
  );
};

export default Home;
