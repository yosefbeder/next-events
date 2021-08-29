import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import EventsList, {
  EventsListProps,
} from '../../components/Events/EventsList';
import FilterForm from '../../components/FilterForm';
import { getAllEvents } from '../../data/events-data';

export const getStaticProps: GetStaticProps<EventsListProps> = () => {
  return { props: { events: getAllEvents() } };
};

const AllEvents: NextPage<EventsListProps> = ({ events }) => {
  return (
    <>
      <FilterForm />
      <EventsList events={events} />
    </>
  );
};

export default AllEvents;
