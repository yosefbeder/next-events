import React from 'react';
import { IconType } from 'react-icons';
import {
  IoCalendarOutline as CalendarIcon,
  IoMapOutline as MapIcon,
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';

export interface EventItemProps {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
}

interface ListItemProps {
  icon: IconType;
  content: string;
  size?: 'lg' | 'sm';
}

export const ListItem: React.FC<ListItemProps> = ({
  icon: Icon,
  content,
  size = 'sm',
}) => (
  <li
    className={`flex items-center space-x-2 ${
      size === 'sm' ? 'text-gray-600' : 'text-gray-700'
    }`}
  >
    <Icon className={size === 'sm' ? 'text-xl md:text-2xl' : 'text-3xl'} />
    <span className={size === 'sm' ? 'text-md md:text-lg' : 'text-xl'}>
      {content}
    </span>
  </li>
);
const EventItem: React.FC<EventItemProps> = ({
  image,
  title,
  date,
  location,
  id,
}) => {
  return (
    <div className="card w-96 mx-auto overflow-hidden md:flex md:w-full">
      <div className="md:hidden">
        <Image
          className="h-64 w-full object-cover "
          src={image}
          alt={title}
          width={385}
          height={260}
        />
      </div>
      <div className="hidden md:block">
        <Image
          className="object-cover"
          src={image}
          alt={title}
          width={260}
          height={260}
        />
      </div>
      <div className="p-4 md:flex md:flex-col flex-1">
        <h3 className="header-3 mb-4 md:hidden">{title}</h3>
        <h2 className="header-2 hidden md:block md:mb-4">{title}</h2>
        <ul className="mb-4 space-y-2 md:mb-auto">
          <ListItem icon={CalendarIcon} content={date} />
          <ListItem icon={MapIcon} content={location} />
        </ul>
        <Link href={`/events/${id}`}>
          <a className="btn text-center md:text-left md:w-max self-end">
            Know more info
          </a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
