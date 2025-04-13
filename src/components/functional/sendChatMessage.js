import createdMessangeElement from '../CreateClass/createdMassengeElement';

export default function sendChatMessage(clientNikename) {
  const chat = document.querySelector('.chat');
  const chatMessage = document.querySelector('.chat-message');
  const nikenameModal = document.querySelector('.widget-create-nikename');
  const nikenameList = document.querySelector('.nikename-list');

  const ws = new WebSocket('wss://js-pro-web-sse-ws-backend.onrender.com/ws');
  // const ws = new WebSocket('ws://localhost:7077/ws');

  chatMessage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const message = { message: chatMessage.value };
      if (!message.message) return;
      ws.send(message.message);
      chatMessage.value = '';
    }
  });

  ws.addEventListener('open', (e) => {
    console.log(e, ' - open ws');// eslint-disable-line no-console
    const message = { message: clientNikename };
    if (!message.message) return;
    ws.send(JSON.stringify({ nickname: clientNikename }));
    nikenameModal.classList.add('hidden');
    chatMessage.value = '';
  });

  ws.addEventListener('error', (e) => {
    console.log(e, ' - error ws');// eslint-disable-line no-console
  });

  ws.addEventListener('close', (e) => {
    console.log(e, ' - close ws');// eslint-disable-line no-console
  });

  window.addEventListener('beforeunload', () => {
    if (ws && ws.readyState !== WebSocket.CLOSED) {
      ws.close();
    }
  });

  ws.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    const { chat: messages } = data;

    if (messages !== undefined) {
      messages.forEach((message) => {
        chat.insertAdjacentHTML('beforeend', createdMessangeElement(message));
      });
      chat.scrollTop = chat.scrollHeight;
    }

    const { participants: participantsList } = data;

    if (participantsList) {
      const oldNikeNames = Array.from(document.querySelectorAll('.nikename')).map((elementList) => elementList.textContent);
      participantsList.forEach((participant) => {
        if (!oldNikeNames.includes(participant)) {
          nikenameList.insertAdjacentHTML('beforeend', `<li class="nikename ${participant}">${participant}</li>`);
        }
      });
    }

    const { nicknameClose } = data;

    if (nicknameClose) {
      nikenameList.querySelector(`.${nicknameClose}`).remove();
    }
  });
}
