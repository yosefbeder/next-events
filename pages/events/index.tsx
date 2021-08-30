import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import EventsList, {
  EventsListProps,
} from '../../components/Events/EventsList';
import FilterForm from '../../components/FilterForm';
import { EventType } from '../../types';
import transformToArray from '../../utils/transform-to-array';
import transformToEventItemProps from '../../utils/transform-to-event-item-props';

export const getStaticProps: GetStaticProps<EventsListProps> = async () => {
  const req = await fetch(
    'https://next-events-d38eb-default-rtdb.firebaseio.com/events.json',
  );

  const data = await req.json();

  const events = (transformToArray(data) as EventType[]).map(event =>
    transformToEventItemProps(event),
  );

  return {
    props: { events },
    revalidate: 60,
  };
};

const AllEvents = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <FilterForm />
      <EventsList events={events} />
    </>
  );
};

export default AllEvents;
