import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { validate } from 'validate.js';

const newsLetterPath = path.join(process.cwd(), 'data/newsletterlist.json');
const newsletterList: string[] = JSON.parse(
  fs.readFileSync(newsLetterPath, 'utf-8'),
);

const reqSchema = {
  email: { email: true, presence: true },
};

/*
  POST
  GET with some security
*/

const getHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const adminId = req.headers['admin-id'];

  if (adminId) {
    if (adminId === process.env.ADMIN_ID) {
      res.status(200).json({ success: true, data: newsletterList });
    } else {
      res
        .status(401)
        .json({ success: false, error: "Your Admin-Id isn't valid" });
    }
  } else {
    res.status(400).json({
      success: false,
      error: 'Admin-Id should be included in the headers',
    });
  }
};

const postHanlder = async (req: NextApiRequest, res: NextApiResponse) => {
  const error = validate(req.body, reqSchema);

  if (error) {
    res.status(400).json({
      success: false,
      error: Object.entries(error)
        .map(([key, value]) => `'${key}': ${value}`)
        .join('\n'),
    });
  } else {
    if (newsletterList.includes(req.body.email)) {
      res.status(400).json({
        success: false,
        error: 'This email is already enrolled in our list',
      });
    } else {
      try {
        newsletterList.push(req.body.email);
        await fsPromises.writeFile(
          newsLetterPath,
          JSON.stringify(newsletterList),
        );
        res.status(200).json({ success: true, data: req.body.email });
      } catch (err) {
        newsletterList.pop();
        res.status(500).json({
          success: false,
          error:
            'Something went wrong while writting your email to the database',
        });
      }
    }
  }
};

const hanlder = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') getHandler(req, res);
  if (req.method === 'POST') postHanlder(req, res);
};

export default hanlder;
