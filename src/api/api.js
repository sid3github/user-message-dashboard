const API_URL = 'http://localhost:3000/messages';

export async function fetchMessages() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function addMessage(newMessage) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessage),
  });
  return await response.json();
}
