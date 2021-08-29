import React from 'react';
import EventsList from '../../components/Events/EventsList';
import FilterForm from '../../components/FilterForm';
import { getAllEvents } from '../../data/events-data';

const AllEvents = () => {
  return (
    <>
      <FilterForm />
      <EventsList events={getAllEvents()} />
    </>
  );
};

export default AllEvents;
