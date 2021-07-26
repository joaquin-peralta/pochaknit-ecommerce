import type { NextApiRequest, NextApiResponse } from 'next';
import { currentPrice } from '@utils/maths';
import { Pattern } from '@types';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function preferenceHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const checkoutCart = req.body.cart.map((item: Pattern) => ({
      id: item._id,
      title: `Patrón ${item.category} ${item.name}`,
      description: 'Patrón de tejido',
      picture_url: item.images[0].url,
      unit_price: currentPrice(item.price, item.discount),
      currency_id: 'ARS',
      quantity: 1,
    }));

    const preference = {
      items: checkoutCart,
      back_urls: {
        success: `${process.env.MY_DOMAIN}/success`,
        failure: `${process.env.MY_DOMAIN}/failure`,
        pending: `${process.env.MY_DOMAIN}/pending`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [{ id: 'ticket' }],
      },
      statement_descriptor: 'POCHAKNIT',
    };

    await mercadopago.preferences
      .create(preference)
      .then((response) => res.status(201).json({ success: true, data: response.body }))
      .catch((error) => res.status(500).json({ success: false, data: error }));
  } else {
    res.status(405).json({ success: false, data: 'Bad request.' });
  }
}
