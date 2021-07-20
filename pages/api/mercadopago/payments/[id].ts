import type { NextApiRequest, NextApiResponse } from 'next';

export default async function paymentHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      res.status(res.statusCode).json(data);
    } catch (err) {
      console.error(err);
      res.status(res.statusCode).json(err);
    }
  } else {
    res.status(405).json({ success: false, error: 'Bad request.' });
  }
}
