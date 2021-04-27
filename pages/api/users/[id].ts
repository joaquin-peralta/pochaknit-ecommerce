import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnectUsers } from '@utils/dbConnect';
import User from '@models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  await dbConnectUsers();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ query });
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
        const filter = { query };
        const update = { purchases: '66666666' };
        const user = await User.findOneAndUpdate(filter, { $push: update });
        if (!user) {
          return res.status(400);
        }
        res.status(200);
      } catch (error) {
        res.status(400);
      }
      break;
    default:
      res.status(400);
      break;
  }
  res.end();
  return false;
}
