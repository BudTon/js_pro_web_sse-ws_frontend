// class SubscriptionApi {
//   constructor(apiUrl) {
//     this.apiUrl = apiUrl;
//   }

//   async add(user) {
//     console.log(user, ' - user');

//     const request = await fetch(this.apiUrl + 'subscriptions/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json' // избовляет от строки
//       },
//       body: JSON.stringify(user)
//     });

//     const result = await request;
//     if (!result.ok) {
//       console.error('Ошибка');
//       return;
//     }
//     const json = await result.json();
//     const status = json.status;
//     console.log(status, ' - status');
//   }

//   async remove(user) {
//     const qwery = 'subscriptions/' + encodeURIComponent(user.phone);//encodeURIComponent чтобы не потнерять + в номере телефона

//     const request = await fetch(this.apiUrl + qwery, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json' // избовляет от строки
//       },
//     });
//     const result = await request;
//     if (!result.ok) {
//       console.error('Ошибка');
//       return;
//     }
//     const json = await result.json();
//     const status = json.status;

//     console.log(status, ' - status');
//   }
// }

const eventSource = new EventSource('http://localhost:7071/sse');
eventSource.addEventListener('open', (e) => {
  console.log(e, ' - open sse');
});

eventSource.addEventListener('error', (e) => {
  console.log(e, ' - error sse');
});

// const subscriptions = document.querySelector('.subscriptions')
// eventSource.addEventListener('message', (e) => {
//   console.log(e, ' - message sse');
//   const { name, phone } = JSON.parse(e.data)
//   subscriptions.appendChild(document.createTextNode(`name: ${name}, phone: ${phone}\n`))

// });

const ws = new WebSocket('ws://localhost:7071/ws');

const chat = document.querySelector('.chat');
const chatMessage = document.querySelector('.chat-message');
const chatSend = document.querySelector('.chat-send');
const nikenameModal = document.querySelector('.widget-create-nikename');
const nikenameCreateBtn = document.querySelector('.btn-widget');
const nikenameInput = document.querySelector('.input-modal');
const nikenameList = document.querySelector('.nikename-list');

nikenameCreateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const nikenames = document.querySelectorAll('.nikename');
  const clientNikename = nikenameInput.value;
  let count = 0;

  if (nikenames.length !== 0) {
    nikenames.forEach((nickname) => {
      if (nickname.textContent === clientNikename) {
        count += 1;
      }
    });
  }

  if (clientNikename === ''
    || clientNikename.includes('nickname')
    || count !== 0
  ) {
    nikenameInput.value = '';
    return;
  }

  nikenameModal.classList.add('hidden');
  const message = { message: clientNikename };
  if (!message.message) return;
  ws.send(JSON.stringify({ nickname: clientNikename }));
  chatMessage.value = '';
});

chatMessage.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const message = { message: chatMessage.value };
    if (!message.message) return;
    console.log(message);
    ws.send(message.message);
    chatMessage.value = '';
  }
});

ws.addEventListener('open', (e) => {
  console.log(e, ' - open ws');
});

ws.addEventListener('error', (e) => {
  console.log(e, ' - error ws');
});

ws.addEventListener('close', (e) => {
  console.log(e, ' - close ws');
});

window.addEventListener('beforeunload', () => {
  if (ws && ws.readyState !== WebSocket.CLOSED) {
    ws.close();
  }
});

ws.addEventListener('message', (e) => {
  const data = JSON.parse(e.data);
  console.log(data, ' - data');
  const { chat: messages } = data;
  console.log(messages, ' - messages!!!!!!!!!!!!!!!!');
  if (messages !== undefined) {
    messages.forEach((message) => {
      chat.appendChild(document.createTextNode(`${message}\n`));
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
    console.log(nikenameList.querySelector(`.${nicknameClose}`), ' - nicknameClose');
    nikenameList.querySelector(`.${nicknameClose}`).remove();
  }
});

// window.api = new SubscriptionApi('http://localhost:7071/');
