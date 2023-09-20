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

export default {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
};
