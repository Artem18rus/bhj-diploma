/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelect = this.element.querySelector('.accounts-select');
    let elemOption;
    
    Account.list(User.current(), (err, data) => {
        if (data.success) {
          for (let i = 0; i < data.data.length; i++) {
            let dataItem = data.data[i];
            elemOption += `
              <option value="${dataItem.id}">${dataItem.name}</option>
            `;
          }
          accountsSelect.innerHTML = elemOption;
        }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, data) => {
      if (data.success) {
        this.element.reset();
        let modal = new Modal(this.element.closest('.modal'));
        modal.close();
        App.update();
      } else {
          alert(response.error);
        return;
      }
    });
  }
}