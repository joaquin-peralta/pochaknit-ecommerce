import type { NextApiRequest, NextApiResponse } from 'next';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${req.body.payment}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(404).json({ success: false, data: error });
    }
  }
}
