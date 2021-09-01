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
import { EventType } from '../../types';
import transformToArray from '../../utils/transform-to-array';
import Head from 'next/head';
import Image from 'next/image';
import NewCommentForm from '../../components/Comments/NewCommentForm';
import CommentsList from '../../components/Comments/CommentsList';

interface ParamType extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<ParamType> = async () => {
  const req = await fetch(
    'https://next-events-d38eb-default-rtdb.firebaseio.com/events.json',
  );

  const data = await req.json();

  const paths = (transformToArray(data) as EventType[]).map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<EventType, ParamType> = async ({
  params,
}) => {
  const req = await fetch(
    'https://next-events-d38eb-default-rtdb.firebaseio.com/events.json',
  );

  const data = await req.json();

  const event = (transformToArray(data) as EventType[]).find(
    event => event.id === params!.id,
  );

  if (!event)
    return {
      notFound: true,
    };

  return {
    props: event,
    revalidate: 60,
  };
};

const dummyComments = [
  { author: 'Yosef', content: 'This is so cool' },
  { author: 'Mostafa', content: "This isn't so cool" },
];

const Event = ({
  id,
  title,
  description,
  location,
  date,
  image,
  isFeatured,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <NewCommentForm />
      <h3 className="header-3">All comments</h3>
      <CommentsList items={dummyComments} />
    </>
  );
};

export default Event;
