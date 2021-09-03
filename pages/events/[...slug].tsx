import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import EventsList, {
  EventsListProps,
} from '../../components/Events/EventsList';
import months from '../../data/months';
import Head from 'next/head';
import { getEvents } from '../api/events';

interface SlugType extends ParsedUrlQuery {
  slug: string[];
}

export const getServerSideProps: GetServerSideProps<
  EventsListProps & { year: number; month: number },
  SlugType
> = async ({ params }) => {
  const year = Number(params!.slug[0]);
  const month = Number(params!.slug[1]);

  if (!year || month === undefined || month > 11) {
    return {
      notFound: true,
    };
  }

  const events = getEvents({ year, month });

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
