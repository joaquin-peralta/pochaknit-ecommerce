import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@utils/dbConnect';
import User from '@models/User';

type Data = {
  success: boolean;
  data: string;
};

export default async function userHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id },
  } = req;

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findOne({ userId: id });
        if (!user) {
          return res.status(400).json({ success: false, data: 'User does not exist' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;

    case 'PATCH':
      try {
        const user = await User.findOneAndUpdate({ userId: id }, req.body);
        if (!user) {
          return res.status(404).json({ success: false, data: 'User not found.' });
        }
        res.status(200).json({ success: true, data: 'User updated.' });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, data: 'Method not allowed.' });
      break;
  }
  return res.end();
}
