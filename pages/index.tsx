import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import EventsList, { EventsListProps } from '../components/Events/EventsList';
import { EventType } from '../types';
import transformToEventItemProps from '../utils/transform-to-event-item-props';
import Head from 'next/head';
import NewsLetterForm from '../components/NewsLetterForm';
import { getEvents } from './api/events';

export const getStaticProps: GetStaticProps<EventsListProps> = () => {
  const events = getEvents({ filterFn: event => event.isFeatured });

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

const Home = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Next Events!</title>
        <meta
          name="description"
          content="A small app where you can find some events to attend."
        />
      </Head>
      <NewsLetterForm />
      <EventsList events={events} />
    </>
  );
};

export default Home;
