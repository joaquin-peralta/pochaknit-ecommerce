import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@utils/dbConnect';
import User from '@models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ sub: id });
        if (!user) {
          return res.status(400).json({ error: 'User does not exist' });
        }
        res.status(200).json(user);
        res.end();
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
      break;

    case 'PUT':
      try {
        const user = await User.findOne({ sub: id }).update({ $push: req.body });
        if (!user) {
          return res.status(400).json({ success: false, data: 'User ID does not match.' });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, data: 'Bad request.' });
      break;
  }
  res.end();
  return false;
}
