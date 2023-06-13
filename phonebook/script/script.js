'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

// блочная область видимости -чтобы выносить в глобальную ОВ только то что нужно
{
// работа с localStorage
  //  getStorage получает в виде аргумента ключ и по нему запрашивает
  // данные из localStorage и возвращает их, если их нет то возвращает
  // пустой массив

  const getStorage = (key) => {
    if (!localStorage.hasOwnProperty(key)) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  };
  // записать данные в ханилище
  // получает ключ и объект в виде аргументов и дописывает данные в localStorage
  const setStorage = (key, obj) => {
    if (!localStorage.hasOwnProperty(key)) {
      const data = [];
      data.push(...obj);
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, JSON.stringify(obj));
    }
  };

  // удаляет из localStorage
  const removeStorage = key => {
    const data = getStorage('phonebook');
    const dataAfterDelete = data.filter(item => item.phone !== key);
    setStorage('phonebook', dataAfterDelete);
  };
  // добавляет в localStorage
  const addContactData = contact => {
    const data = getStorage('phonebook');
    data.push(contact);
    setStorage('phonebook', data);
  };

  // создает контейнер для header
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    // т.к. в header все элементы располагаются внутри контейнера
    const headerContainer = createContainer();
    header.append(headerContainer);
    // привязать header - headerContainer
    // далее можно исп-ть св-во header.headerContainer для добавления эл-в
    header.headerContainer = headerContainer;
    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    // позволяет добавлять внутрь эл-ты
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');
    // заполним кнопками - перебор массива и возврат кнопок
    // деструктуируем объект
    const btns = params.map(({className, type, text}) => {
      // создаем кнопки
      const button = document.createElement('button');
      // заполним данными из атрибутов
      button.className = className;
      button.type = type;
      button.textContent = text;
      return button;
    });
    // вставить btns в btnWrapper
    btnWrapper.append(...btns);
    // возвращаем объект ({}- после return)
    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="firstName">Имя</th>
        <th class="surName">Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');
    // вставить в таблицу
    table.append(thead, tbody);
    // чтобы не возвращать объект table, а на прямую
    table.tbody = tbody;
    table.thead = thead;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    // создать модалку
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name" >Имя:</label>
        <input class="form-input" name="name" 
          id="name" type="text" required>
      </div>
        <div class="form-group">
        <label class="form-label" for="surname" >Фамилия:</label>
      <input class="form-input" name="surname" 
        id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" 
          id="phone" type="number" required>
      </div>
    `);

    // кнопки в модалке скопируем из buttonGroup
    const buttonGroup = createButtonsGroup([
      // придумываем параметры кнопок
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    // т.к. в footer все элементы располагаются внутри контейнера
    const footerContainer = createContainer();
    footer.append(footerContainer);
    // привязать footer - footerContainer
    // далее можно исп-ть св-во footer.footerContainer для добавления эл-в
    footer.footerContainer = footerContainer;
    return footer;
  };

  // 3. рендерит форму страницы
  const renderPhoneBook = (app, title) => {
    // создать header страницы
    const header = createHeader();
    // создать заголовок
    const logo = createLogo(title);
    // cоздать main
    const main = createMain();
    // создать обертку для кнопок, передавая массив
    const buttonGroup = createButtonsGroup([
      // придумываем параметры кнопок
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    // создать таблицу
    const table = createTable();
    // создать форму/модалку
    const {form, overlay} = createForm();
    // создать footer страницы
    const footer = createFooter();

    // вставить заколовок
    header.headerContainer.append(logo);
    // добавить на страницу обертку для кнопок и таблицу и overlay
    // т.к. возвращается объект, то append .btnWrapper
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    // добавить header и main и footer на страницу
    app.append(header, main, footer);

    return {
      list: table.tbody,
      thead: table.thead,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');

    const buttonDel = document.createElement('button');
    tdDel.append(buttonDel);
    buttonDel.classList.add('del-icon');

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    tdPhone.classList.add('telefon');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('button');
    tdEdit.classList.add('btn', 'btn-outline-danger', 'btn-sm');
    tdEdit.insertAdjacentHTML('beforeend', `
    <i>Редактировать</i>
    `);
    tdEdit.style.cssText = `
      padding-left: 20px;
      background-image: url('../phonebook/img/edit.svg');
      background-repeat: no-repeat;
      background-position: 0 50%;
    `;
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
console.log('allRow: ', allRow);
    // наведение мыши - показывает контакт(телефон)
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };
    btnAdd.addEventListener('click', openModal);

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };
    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay ||
          target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
        // удалить из localStorage
        const phoneDel = target.closest('.contact').childNodes[3].textContent;
        removeStorage(phoneDel);
      }
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      // не дает обновлять страницу на submit
      e.preventDefault();
      // отправляет данные
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);

      // добавляет новый контакт в верстку
      addContactPage(newContact, list);
      // добавляет новый контакт в хранилище
      addContactData(newContact);
      // очищает форму в конце
      form.reset();
      // закрывает модалку
      closeModal();
    });
  };

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
      console.log('list: ', list);

      // наведение мыши - показывает контакт(телефон)
      list.addEventListener('mouseover', (e) => {
        logo.textContent = e.target.closest('.contact').phoneLink.textContent;
      });
      list.addEventListener('mouseout', () => {
        logo.textContent = text;
      });
    };
    // Функционал
    const allRow = renderContacts(list, data);

    const {closeModal} = modalControl(btnAdd, formOverlay);

    // hoverRow(allRow, logo);
    // ховер - показать контакт в header
    listHoverRow(list, logo);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    setStorage('phonebook', data);

    // сортировка по имени или фамлилии
    thead.addEventListener('click', e => {
      const target = e.target;

      // сортировка по имени на событии в thead
      if (target.classList.contains('firstName')) {
        console.log(target);
        localStorage.setItem('sorting', 'name');
        // call-back фун-я сортировки по имени
        const SortArray = (x, y) => {
          if (x.name < y.name) {
            return -1;
          }
          if (x.name > y.name) {
            return 1;
          }
          return 0;
        };

        // сортировать объект по имени
        const sortData = data.sort(SortArray);
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
        // call-back фун-я сортировки по фамилии
        const SortArray = (x, y) => {
          if (x.surname < y.surname) {
            return -1;
          }
          if (x.surname > y.surname) {
            return 1;
          }
          return 0;
        };

        // сортировать объект по фамилии
        const sortData = data.sort(SortArray);

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
