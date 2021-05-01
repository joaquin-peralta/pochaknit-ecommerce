import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@utils/dbConnect';
import User from '@models/User';

type Data = {
  success: boolean;
  data: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id },
  } = req;

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findOne({ sub: id });
        if (!user) {
          res.status(400).json({ success: false, data: 'User does not exist' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;

    /* case 'POST':
      try {
        const user = await User.findOneAndUpdate({ sub }, req.body, {
          new: true,
        });
        if (!user) {
          return res.status(400).json({ success: false, data: 'User ID does not match.' });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break; */

    case 'PUT':
      try {
        const user = await User.findOneAndUpdate({ sub: id }, req.body, { new: true });
        if (!user) {
          res.status(404).json({ success: false, data: 'User not found.' });
        }
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, data: 'Method not allowed.' });
      break;
  }
  res.end();
  return false;
}
