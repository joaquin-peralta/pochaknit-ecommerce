import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@utils/dbConnect';
import User from '@models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.find({});
        res.status(200).json(user);
        if (!user) {
          res.status(500).json({ error: 'User does not exist' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({ error: 'Bad request' });
      break;
  }
};
