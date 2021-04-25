import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnectUsers } from '@utils/dbConnect';
import User from '@models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnectUsers();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
      break;
    default:
      res.status(400).json({ error: 'Bad request' });
      break;
  }
};
