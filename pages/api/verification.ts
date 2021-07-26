import type { NextApiRequest, NextApiResponse } from 'next';

const getAccessToken = async () => {
  try {
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_M2M_CLIENT_ID,
        client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return null;
  }
};

const sendVerificationEmail = async (id: string, accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/jobs/verification-email`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      },
    );
    const data = await response.json();
    return data;
  } catch (e) {
    return null;
  }
};

export default async function verificationHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const token = await getAccessToken();
      if (!token) {
        return res.status(500).json({ success: false, data: "Can't get access token" });
      }
      const response = await sendVerificationEmail(req.body, token.access_token);
      if (response.statusCode >= 400) {
        return res.status(res.statusCode).json({ success: false, data: response });
      }
      return res.status(res.statusCode).json({ success: true, data: response });
    } catch (e) {
      return res.status(res.statusCode).json({ success: false, data: e });
    }
  }
  return res.status(405).json({ success: false, data: 'Bad request' });
}
