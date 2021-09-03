import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import EventsList, {
  EventsListProps,
} from '../../components/Events/EventsList';
import FilterForm from '../../components/FilterForm';
import Head from 'next/head';
import { getEvents } from '../api/events';

export const getStaticProps: GetStaticProps<EventsListProps> = async () => {
  return {
    props: { events: getEvents({}) },
    revalidate: 60,
  };
};

const AllEvents = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="A small app where you can find some events to attend."
        />
      </Head>
      <FilterForm />
      <EventsList events={events} />
    </>
  );
};

export default AllEvents;
