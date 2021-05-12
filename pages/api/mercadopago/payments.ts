import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { paymentId } = req.query;

  if (req.method === 'GET') {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    res.status(res.statusCode).json(data);
  } else {
    res.status(405).json({ success: false, error: 'Bad request.' });
  }
}
