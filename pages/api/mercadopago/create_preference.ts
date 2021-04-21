import type { NextApiRequest, NextApiResponse } from 'next';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const product = req.body[0];

    const preference = {
      items: [
        {
          title: `${product.category} ${product.name}`,
          unit_price: Number(product.price),
          quantity: 1,
        },
      ],
      back_urls: {
        success: 'http://localhost:3000/',
        failure: 'http://localhost:3000/',
        pending: 'http://localhost:3000/',
      },
      auto_return: 'approved',
    };

    mercadopago.preferences
      .create(preference)
      .then((response) => {
        res.status(201).json({ init_point: response.body.init_point });
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(201);
  } else {
    res.status(400).json({ success: false });
  }
}
