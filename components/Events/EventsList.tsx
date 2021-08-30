import React from 'react';
import EventItem, { EventItemProps } from './EventItem';

export interface EventsListProps {
  events: EventItemProps[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  if (events.length === 0)
    return <h3 className="header-3 w-max mx-auto">No event was found :(</h3>;

  return (
    <div className="w-full space-y-4">
      {events.map(({ id, ...restProps }) => (
        <EventItem key={id} id={id} {...restProps} />
      ))}
    </div>
  );
};

export default EventsList;
