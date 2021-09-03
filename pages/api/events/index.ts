import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { EventType } from '../../../types';
import transformToEventItemProps from '../../../utils/transform-to-event-item-props';

export const eventsPath = path.join(process.cwd(), '/data/events.json');
export const events: EventType[] = JSON.parse(
  fs.readFileSync(eventsPath, 'utf-8'),
);

interface GetEventsOptions {
  filterFn?: (event: EventType) => boolean;
  year?: number;
  month?: number;
}

export const getEvents = ({
  year,
  month,
  filterFn = () => true,
}: GetEventsOptions) => {
  if (year && month !== undefined) {
    return events
      .filter(
        ({ date }) =>
          new Date(date).getFullYear() === year &&
          new Date(date).getMonth() === month,
      )
      .filter(filterFn)
      .map(event => transformToEventItemProps(event));
  } else if (!year && month === undefined) {
    return events
      .filter(filterFn)
      .map(event => transformToEventItemProps(event));
  } else {
    throw new Error('Please check the format of the queries');
  }
};

if (!events) throw new Error('Failed to read events from the db');

const getHanlder = (req: NextApiRequest, res: NextApiResponse) => {
  const year = Number(req.query.year);
  const month = Number(req.query.month);

  try {
    const events = getEvents({ year, month });

    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') getHanlder(req, res);
};

export default handler;
