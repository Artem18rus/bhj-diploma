/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const app = document.querySelector('.app')
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.onclick = function() {
      app.classList.toggle('sidebar-open');
      app.classList.toggle('sidebar-collapse');
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const menuRegister = document.querySelector('.menu-item_register');
    menuRegister.addEventListener('click', (event) => {
      App.getModal('register').open();
    })
    
    const menuLogin = document.querySelector('.menu-item_login');
    menuLogin.addEventListener('click', (event) => {
      App.getModal('login').open();
    })

    const menuItemLogout = document.querySelector('.menu-item_logout');
    menuItemLogout.addEventListener('click', (event) => {
      User.logout((err, response) => {
        if(response.success) {
          App.setState('init');
        }
      });
    })
  }
}