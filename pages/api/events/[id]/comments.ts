import { NextApiRequest, NextApiResponse } from 'next';
import { eventsPath, events } from '..';
import fs from 'fs/promises';
import { v4 } from 'uuid';
import validate from 'validate.js';
import formatError from '../../../../utils/format-error';

const commentSchema = {
  name: { type: 'string', presence: true },
  email: { email: true, presence: true },
  content: { type: 'string', presence: true },
};

/* 
  Getting comments => GET api/events/[id]/comments
  Adding a comment => POST api/events/[id/comments
*/

const getHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const event = events.find(({ id }) => id === req.query.id);

  if (!event)
    res
      .status(400)
      .json({ success: false, error: "There's no event with this id!" });
  else res.status(200).json({ success: true, data: event.comments });
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // validate comment
  const eventIndex = events.findIndex(({ id }) => id === req.query.id);
  const error = validate(req.body, commentSchema);

  if (error)
    res.status(400).json({
      success: false,
      error: formatError(error),
    });
  else {
    try {
      const id = v4();
      const comment = {
        id,
        author: { email: req.body.email, name: req.body.name },
        content: req.body.content,
      };

      events[eventIndex].comments.push(comment);

      await fs.writeFile(eventsPath, JSON.stringify(events));

      res.status(200).json({ success: true, data: comment });
    } catch (err) {
      events[eventIndex].comments.pop();
      res
        .status(500)
        .json({ success: false, error: 'Failed to update the database' });
    }
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') getHandler(req, res);
  if (req.method === 'POST') postHandler(req, res);
};

export default handler;
