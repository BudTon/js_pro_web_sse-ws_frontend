export default async function checkNikename(nikename) {
  const request = await fetch('http://localhost:7077/participants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nikename),
  });
  const result = await request;

  if (!result.ok) {
    console.error('Ошибка');// eslint-disable-line no-console
    return;
  }

  const json = await result.json();
  const status = await json.status;
  return status; // eslint-disable-line consistent-return
}
