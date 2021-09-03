import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { ListItem } from '../../components/Events/EventItem';
import {
  IoCalendarOutline as CalendarIcon,
  IoLocationOutline as MapIcon,
  IoAlertCircleOutline as AlertIcon,
} from 'react-icons/io5';
import { BsHash as HashIcon } from 'react-icons/bs';
import { ParsedUrlQuery } from 'querystring';
import { CommentType, EventType } from '../../types';
import Head from 'next/head';
import Image from 'next/image';
import NewCommentForm from '../../components/Comments/NewCommentForm';
import CommentsList from '../../components/Comments/CommentsList';
import { getEvent } from '../api/events/[id]';
import { getEvents } from '../api/events';
import useSWR from 'swr';

interface ParamType extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<ParamType> = () => {
  const paths = getEvents().map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<EventType, ParamType> = ({
  params,
}) => {
  try {
    const event = getEvent(params!.id);

    return {
      props: event,
      revalidate: 60,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

const fetcher = async (url: string) => {
  const res = await fetch(url).then(req => req.json());

  if (!res.success) {
    throw new Error(res.error);
  } else {
    return res.data as CommentType[];
  }
};

const Event = ({
  id,
  title,
  description,
  location,
  date,
  image,
  isFeatured,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, error } = useSWR(`/api/events/${id}/comments`, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Image
        width={765}
        height={385}
        className="w-full h-80 rounded-lg object-cover sm:h-96"
        src={image}
        alt={title}
      />
      <h2 className="header-1">{title}</h2>
      <ul className="space-y-2">
        <ListItem size="lg" icon={HashIcon} content={id} />
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
      <p className="paragraph-1 max-w-screen-sm">{description}</p>
      <h2 className="header-2">Comments</h2>
      <hr />
      <h3 className="header-3">Add a comment</h3>
      <NewCommentForm eventId={id} />
      <h3 className="header-3">All comments</h3>
      {(() => {
        if (error) {
          console.log(error);
          return (
            <p className="paragraph-1">
              Failed to load the comments
              <br />
              <span className="text-sm">error message: {error.message}</span>
            </p>
          );
        }
        if (!data) return <p className="paragraph-1">...Loading</p>;
        if (data) {
          return <CommentsList items={data} />;
        }
      })()}
    </>
  );
};

export default Event;
