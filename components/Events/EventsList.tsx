import React from 'react';
import Event from './Event';

export interface EventsListProps {
  events: {
    id: string;
    title: string;
    location: string;
    date: string;
    image: string;
  }[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <div className="w-full space-y-4">
      {events.map(({ id, ...restProps }) => (
        <Event key={id} id={id} {...restProps} />
      ))}
    </div>
  );
};

export default EventsList;
