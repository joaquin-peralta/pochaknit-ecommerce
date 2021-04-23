import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnectStrapi } from '@utils/dbConnect';
import Product from '@models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnectStrapi();

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        res.status(200).json(product);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
      break;
    default:
      res.status(400).json({ error: 'Bad request' });
      break;
  }
}
