import createElements from './createElements.mjs';
import * as serv from './serviceStorage';

import {
  createImageLogo,
} from './createElements.mjs';

const {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
} = createElements;

// const {
//   getContactData,
// } = serviceStorage;

// 3. рендерит форму страницы
export const renderPhoneBook = (app, title) => {
  // создать header страницы
  const header = createHeader();
  // создать картинку (тестовую для webpack)
  const imageLogo = createImageLogo();
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
  header.headerContainer.append(imageLogo, logo);
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

export const renderContacts = (elem) => {
  const data = serv.getContactData();
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};

