export default class CreateWiget {
  constructor(element) {
    this.element = element;
    this.showH();
    this.showButtonBox();
    this.showTicketList();
  }

  showH() {
    const h = `
    <h1>7. Домашнее задание к занятию "Работа с HTTP"</h1>
    <h2>7.1-7.2 HelpDesk</h2>
    `;
    this.element.insertAdjacentHTML('beforeend', h);
  }

  showButtonBox() {
    const buttonBox = `
    <div class="created-box">
      <button class="ticket-create-button">Добавить тикет</button>
    </div>
    `;
    this.element.insertAdjacentHTML('beforeend', buttonBox);
  }

  showTicketList() {
    const ticketList = `
    <div class="ticket-list"></div>
    `;
    this.element.insertAdjacentHTML('beforeend', ticketList);
  }

  /* eslint-disable class-methods-use-this */
}
