export default class CreateModal {
  constructor(element) {
    this.element = element;
    this.showCreateTicket();
    this.showChangeTicket();
    this.showDeleteTicket();
  }

  showCreateTicket() {
    const modalCreate = `
    <div data-widget="subscribe" class="widget-create-ticket shadow popup hidden">
      <form data-id="subscribe-form" class="create-ticket">
        <p class="title">Добавить тикет</p>
        <p class="title-description">Краткое описание</p>
        <input data-id="name" name="name" class="input" required>
        <p class="title-description">Полное описание</p>
        <textarea data-id="description" name="description" class="input-textarea" required></textarea>
        <div class="button-box">
          <button class="btn-widget-cancel cancellation">Отмена</button>
          <button class="btn-widget load">Ok</button>
        </div>
      </form>
    </div>
    `;
    this.element.insertAdjacentHTML('afterend', modalCreate);
  }

  showChangeTicket() {
    const modalCancel = `
    <div data-widget="subscribe" class="widget-change-ticket shadow popup hidden">
      <form data-id="subscribe-form" class="change-ticket">
        <p class="title">Измененить тикет</p>
        <p class="title-description">Краткое описание</p>
        <input data-id="name" name="name" class="input" required>
        <p class="title-description">Полное описание</p>
        <textarea data-id="description" name="description" class="input-textarea" required></textarea>
        <div class="button-box">
          <button class="btn-widget-cancel cancellation">Отмена</button>
          <button class="btn-widget upload">Ok</button>
        </div>
      </form>
    </div>
    `;
    this.element.insertAdjacentHTML('afterend', modalCancel);
  }

  showDeleteTicket() {
    const modalDelete = `
    <div class="widget-delete-ticket shadow popup hidden">
      <div class="delete-ticket">
        <p class="title">Удалить тикет</p>
        <p class="title-description">Вы уверены, что хотите удалить тикет? Это действие необратимо</p>
        <div class="button-box">
          <button class="btn-widget-cancel cancellation">Отмена</button>
          <button class="btn-widget delete">Ok</button>
        </div>
      </div>
    </div>
    `;
    this.element.insertAdjacentHTML('afterend', modalDelete);
  }

  /* eslint-disable class-methods-use-this */
}
