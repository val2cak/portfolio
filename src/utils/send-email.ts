import { FormData } from '../types/form-types';

export function sendEmail(
  data: FormData
): Promise<{ status: number; message: string }> {
  const apiEndpoint = '/api/email';

  return fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error sending email');
      }

      return res.json();
    })
    .then((response) => {
      return { status: response.status, message: response.message };
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Error sending email');
    });
}
