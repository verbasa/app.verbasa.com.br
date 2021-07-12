import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '../../services/api';

export default async function rdVerbasaSignUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, cpf, plan } = req.body;
  console.log(req.body);
  await api
    .post(
      `conversions?api_key=${
        process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY
      }`,
      {
        event_type: 'CONVERSION',
        event_family: 'CDP',
        payload: {
          conversion_identifier: 'verbasa-signup',
          name,
          email,
          cf_cpf: cpf,
          cf_plan: plan,
          // traffic_source: 'Google',
          // traffic_medium: 'cpc',
          // traffic_campaign: 'easter-50-off',
          // traffic_value: 'easter eggs',
        },
      }
    )
    .catch((error) => {
      res.status(400).json('error');
    });

  res.status(200).json('ok');
}
