import createElements from './modules/createElements.js';
import {renderContacts, renderPhoneBook} from './modules/render.js';
import control from './modules/control.js';
import {getContactData, setContactData} from './modules/serviceStorage.js';


const {
  createRow,
} = createElements;

const {
  modalControl,
  deleteControl,
  formControl,
} = control;

// блочная область видимости -чтобы выносить в глобальную ОВ только то что нужно
{
  // 2. ф-я принимает селектор элемента и заголовок со страницы
  // и передает в render функцию
  const init = (selectApp, title) => {
    // получить эл-т по селектору
    const app = document.querySelector(selectApp);

    const {
      list,
      thead,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    const listHoverRow = (list, logo) => {
      const text = logo.textContent;

      // наведение мыши - показывает контакт(телефон)
      list.addEventListener('mouseover', (e) => {
        logo.textContent = e.target.closest('.contact').phoneLink.textContent;
      });
      list.addEventListener('mouseout', () => {
        logo.textContent = text;
      });
    };

    // сортировать объект по полю (имени или фамилии)
    // колл-бэк функция сортировки
    const sortByField = function(field) {
      return function(a, b) {
        return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      };
    };
    // Функционал
    const allRow = renderContacts(list);

    const {closeModal} = modalControl(btnAdd, formOverlay);

    // hoverRow(allRow, logo);
    // ховер - показать контакт в header
    listHoverRow(list, logo);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    const data = getContactData();
    setContactData(data);

    // сортировка по имени или фамлилии
    thead.addEventListener('click', e => {
      const target = e.target;
      const data = getContactData();
      // сортировка по имени на событии в thead
      if (target.classList.contains('firstName')) {
        localStorage.setItem('sorting', 'name');
        const sortData = data.sort(sortByField('name'));
        // создать новые объекты в верстке
        const sortRow = sortData.map(createRow);
        // очистить элемент в верстке
        list.innerHTML = '';
        // вставить элементы в верстку
        list.append(...sortRow);
      }

      // сортировка по фаимлии на событии в thead
      if (target.classList.contains('surName')) {
        localStorage.setItem('sorting', 'surname');
        const sortData = data.sort(sortByField('surname'));
        const sortRow = sortData.map(createRow);
        // очистить элемент в верстке
        list.innerHTML = '';
        // вставить элементы в верстку
        list.append(...sortRow);
      }
    });
  };
  // 1. выносит в window ф-ю инициализации app.
  window.phonebookInit = init;
}
