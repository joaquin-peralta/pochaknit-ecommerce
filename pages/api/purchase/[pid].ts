import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@utils/dbConnect';
import User from '@models/User';

export default async function purchaseHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pid, status },
  } = req;

  await dbConnect();

  if (req.method === 'PATCH') {
    try {
      const user = await User.findOneAndUpdate(
        { 'purchases._id': pid },
        { $set: { 'purchases.$.status': status } },
      );
      if (!user) {
        return res.status(404).json({ success: false, data: 'User not found.' });
      }
      return res.status(200).json({ success: true, data: 'User updated.' });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  }
  return res.status(405).json({ success: false, data: 'Method not allowed.' });
}
