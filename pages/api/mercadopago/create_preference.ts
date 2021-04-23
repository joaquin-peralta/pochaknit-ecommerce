import type { NextApiRequest, NextApiResponse } from 'next';
import { Pattern } from '@types';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const cart = req.body.map((item: Pattern) => ({
      id: item.id,
      title: `${item.category} ${item.name}`,
      description: 'Patrón de tejido',
      picture_url: item.images[0].url,
      unit_price: Number(item.price),
      currency_id: 'ARS',
      quantity: 1,
    }));

    const preference = {
      items: cart,
      back_urls: {
        success: 'http://localhost:3000/success',
        failure: 'http://localhost:3000/',
        pending: 'http://localhost:3000/',
      },
      auto_return: 'approved',
    };

    await mercadopago.preferences
      .create(preference)
      .then((response) => {
        res.status(201).json({ data: response.body });
        res.end();
      })
      .catch(() => {
        res.status(500).end();
      });
  } else {
    res.status(405);
    res.end();
  }
}
