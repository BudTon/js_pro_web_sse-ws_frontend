import checkNikename from '../components/functional/checkNikename';
import sendChatMessage from '../components/functional/sendChatMessage';

const nikenameCreateBtn = document.querySelector('.btn-widget');
const nikenameInput = document.querySelector('.input-modal');

nikenameCreateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const clientNikename = nikenameInput.value;
  const statusNikename = checkNikename({ nikename: clientNikename });

  statusNikename.then((result) => {
    if (clientNikename === ''
      || clientNikename.includes('nickname')
      || result === 'false'
    ) {
      nikenameInput.value = '';
      nikenameInput.placeholder = 'Такой псевдоним уже существует';
      return;
    }

    sendChatMessage(clientNikename);
  });
});
