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

interface SlugType extends ParsedUrlQuery {
  slug: string[];
}

export const getServerSideProps: GetServerSideProps<EventsListProps, SlugType> =
  async ({ params }) => {
    const year = Number(params!.slug[0]);
    const month = Number(params!.slug[1]);

    console.log(year, month);

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
      },
    };
  };

const FilteredEvents = ({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  let year: number;
  let month: number;

  if (router.query.slug) {
    year = +router.query.slug[0];
    month = +router.query.slug[1];
  }

  return (
    <>
      {router.query.slug && (
        <h2 className="header-2 w-max mx-auto">
          Events in {months[month!]} {year!}
        </h2>
      )}
      <EventsList events={events} />
    </>
  );
};

export default FilteredEvents;
