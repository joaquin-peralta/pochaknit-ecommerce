import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnectUsers } from '@utils/dbConnect';
import User from '@models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { sub },
    method,
  } = req;

  await dbConnectUsers();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const user = await User.findOne({ sub });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT' /* Edit a model by its ID */:
      try {
        const filter = { sub };
        const update = { purchases: req.body };
        // @ts-ignore
        const user = await User.findOneAndUpdate(filter, { $push: update });
        if (!user) {
          return res.status(400);
        }
        res.status(200);
      } catch (error) {
        res.status(400);
      }
      break;
    case 'POST':
      try {
        const user = await User.findOne({ sub });
        for (const purchase of req.body) {
          user.purchases.push(purchase);
        }
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
