import { NextApiRequest, NextApiResponse } from 'next';
import { events } from '..';

/* 
  Getting an event => GET api/events/[id]
*/

export const getEvent = (id: string) => {
  const event = events.find(event => event.id === id);

  if (!event) throw new Error("There's no event with this id!");
  else return event;
};

const getHanlder = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const event = getEvent(req.query.id as string);
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') getHanlder(req, res);
};

export default handler;
