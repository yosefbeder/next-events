import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import EventsList, {
  EventsListProps,
} from '../../components/Events/EventsList';
import months from '../../data/months';
import transformToArray from '../../utils/transform-to-array';
import { EventType } from '../../types';
import transformToEventItemProps from '../../utils/transform-to-event-item-props';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

interface SlugType extends ParsedUrlQuery {
  slug: string[];
}

export const getServerSideProps: GetServerSideProps<
  EventsListProps & { year: number; month: number },
  SlugType
> = async ({ params }) => {
  const year = Number(params!.slug[0]);
  const month = Number(params!.slug[1]);

  if (!year || month === undefined) {
    return {
      notFound: true,
    };
  }

  const req = await fetch(
    'https://next-events-d38eb-default-rtdb.firebaseio.com/events.json',
  );

  const data = await req.json();

  const events = (transformToArray(data) as EventType[])
    .filter(event => {
      const date = new Date(event.date);

      return date.getFullYear() === year && date.getMonth() === month;
    })
    .map(event => transformToEventItemProps(event));

  return {
    props: {
      events,
      year,
      month,
    },
  };
};

const FilteredEvents = ({
  events,
  year,
  month,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>
          {month + 1}/{year} Events
        </title>
        <meta name="description" content={`All events on ${month}/${year}`} />
      </Head>

      <h2 className="header-2 w-max mx-auto">
        Events in {months[month]} {year}
      </h2>
      <EventsList events={events} />
    </>
  );
};

export default FilteredEvents;
