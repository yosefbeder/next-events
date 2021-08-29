import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import EventsList, {
  EventsListProps,
} from '../../components/Events/EventsList';
import { getFilteredEvents } from '../../data/events-data';
import months from '../../data/months';

interface SlugType extends ParsedUrlQuery {
  slug: string[];
}

export const getServerSideProps: GetServerSideProps<
  FilteredEventsProps,
  SlugType
> = async ({ params }) => {
  const yearIsNum = !Number.isNaN(params!.slug[0]);
  const monthIsNum = !Number.isNaN(params!.slug[0]);

  if (!params || !yearIsNum || !monthIsNum) return { notFound: true };

  const year = +params.slug[0];
  const month = +params.slug[1];

  return {
    props: {
      events: getFilteredEvents({
        year,
        month,
      }),
      year,
      month,
    },
  };
};

interface FilteredEventsProps extends EventsListProps {
  year: number;
  month: number;
}

const FilteredEvents: NextPage<FilteredEventsProps> = ({
  events,
  year,
  month,
}) => {
  console.log(events);

  return (
    <>
      <h2 className="header-2 w-max mx-auto">
        Events in {months[month]} {year}
      </h2>
      <EventsList events={events} />
    </>
  );
};

export default FilteredEvents;
