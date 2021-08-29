import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { getAllEvents, getEventById } from '../../data/events-data';
import { ListItem } from '../../components/Events/Event';
import {
  IoCalendarOutline as CalendarIcon,
  IoMapOutline as MapIcon,
  IoAlertCircleOutline as AlertIcon,
} from 'react-icons/io5';
import { ParsedUrlQuery } from 'querystring';

interface ParamType extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<ParamType> = () => {
  return {
    paths: getAllEvents().map(({ id }) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EventProps, ParamType> = ({
  params,
}) => {
  return { props: getEventById(params!.id)! };
};

interface EventProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

const Event: NextPage<EventProps> = ({
  id,
  title,
  description,
  location,
  date,
  image,
  isFeatured,
}) => {
  return (
    <>
      <img
        className="w-full h-80 rounded-lg shadow-lg object-cover sm:h-96"
        src={image}
        alt={title}
      />
      <h2 className="header-2">{title}</h2>
      <ul className="space-y-2">
        <ListItem size="lg" icon={CalendarIcon} content={date} />
        <ListItem size="lg" icon={MapIcon} content={location} />
        {!isFeatured && (
          <ListItem
            size="lg"
            icon={AlertIcon}
            content="This Event isn't available anymore"
          />
        )}
      </ul>
      <p className="paragraph-1">{description}</p>
    </>
  );
};

export default Event;
