import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const getClientCredentials = async () => {
      try {
        const response = await fetch('https://dev-lsbcedzv.us.auth0.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: 'https://dev-lsbcedzv.us.auth0.com/api/v2/',
            grant_type: 'client_credentials',
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
        res.end();
        return false;
      }
    };
    const credentials = await getClientCredentials();
    const token = credentials.access_token;

    const sendVerificationEmail = async () => {
      try {
        const response = await fetch(
          'https://dev-lsbcedzv.us.auth0.com/api/v2/jobs/verification-email',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
          },
        );
        const data = await response.json();
        res.status(201).json({ success: true, data });
        res.end();
        return data;
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
        res.end();
        return false;
      }
    };
    await sendVerificationEmail();
  } else {
    res.status(405).json({ success: false, data: 'Bad request.' });
    res.end();
  }
}
