import type { NextApiRequest, NextApiResponse } from 'next';
import { currentPrice } from '@utils/maths';
import { Pattern } from '@types';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { bag } = req.body;
    const cart = bag.map((item: Pattern) => ({
      id: item._id,
      title: `${item.category.toUpperCase()} ${item.name.toUpperCase()}`,
      description: `Patrón de tejido ${item.category.toUpperCase()} ${item.name.toUpperCase()}`,
      picture_url: item.images[0].url,
      unit_price: Number(currentPrice(item.price, item.discount)),
      currency_id: 'ARS',
      quantity: 1,
    }));

    const preference = {
      items: cart,
      back_urls: {
        success: 'http://localhost:3000/success',
        failure: 'http://localhost:3000/failure',
        pending: 'http://localhost:3000/',
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [{ id: 'atm' }, { id: 'ticket' }],
      },
      statement_descriptor: 'POCHAKNIT.COM',
    };

    await mercadopago.preferences
      .create(preference)
      .then((response) => {
        res.status(201).json({ success: true, data: response.body });
        res.end();
      })
      .catch((error) => {
        res.status(500).json({ success: false, data: error });
        res.end();
      });
  } else {
    res.status(405);
    res.end();
  }
}
