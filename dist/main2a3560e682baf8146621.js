/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/script/control.js":
/*!*******************************!*\
  !*** ./src/script/control.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElements.js */ "./src/script/createElements.js");
/* harmony import */ var _serviceStorage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serviceStorage.js */ "./src/script/serviceStorage.js");



const {
  createRow,
} = _createElements_js__WEBPACK_IMPORTED_MODULE_0__["default"];

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
      (0,_serviceStorage_js__WEBPACK_IMPORTED_MODULE_1__.removeContactData)(phoneDel);
    }
  });
};

const addContactPage = (contact, list) => {
  document.querySelectorAll('.delete').forEach(del => {
    del.classList.remove('is-visible');
  });
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
    (0,_serviceStorage_js__WEBPACK_IMPORTED_MODULE_1__.addContactData)(newContact);
    // очищает форму в конце
    form.reset();
    // закрывает модалку
    closeModal();
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
});


/***/ }),

/***/ "./src/script/createElements.js":
/*!**************************************!*\
  !*** ./src/script/createElements.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
});


/***/ }),

/***/ "./src/script/render.js":
/*!******************************!*\
  !*** ./src/script/render.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderContacts: () => (/* binding */ renderContacts),
/* harmony export */   renderPhoneBook: () => (/* binding */ renderPhoneBook)
/* harmony export */ });
/* harmony import */ var _createElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElements.js */ "./src/script/createElements.js");
/* harmony import */ var _serviceStorage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serviceStorage.js */ "./src/script/serviceStorage.js");



const {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
} = _createElements_js__WEBPACK_IMPORTED_MODULE_0__["default"];

// const {
//   getContactData,
// } = serviceStorage;

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

const renderContacts = (elem) => {
  const data = _serviceStorage_js__WEBPACK_IMPORTED_MODULE_1__.getContactData();
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};



/***/ }),

/***/ "./src/script/serviceStorage.js":
/*!**************************************!*\
  !*** ./src/script/serviceStorage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addContactData: () => (/* binding */ addContactData),
/* harmony export */   getContactData: () => (/* binding */ getContactData),
/* harmony export */   removeContactData: () => (/* binding */ removeContactData),
/* harmony export */   setContactData: () => (/* binding */ setContactData)
/* harmony export */ });
// работа с localStorage
// получение контактов из хранилища
const getContactData = () => (localStorage.getItem('phonebook') ?
JSON.parse(localStorage.getItem('phonebook')) : []);

// записать данные в ханилище
const setContactData = (data) =>
  localStorage.setItem('phonebook', JSON.stringify(data));

// удаляет из localStorage
const removeContactData = phone => {
  const data = getContactData();
  const dataAfterDelete = data.filter(item => item.phone !== phone);
  setContactData(dataAfterDelete);
};
// добавляет в localStorage
const addContactData = contact => {
  const data = getContactData();
  data.push(contact);
  setContactData(data);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _script_createElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script/createElements.js */ "./src/script/createElements.js");
/* harmony import */ var _script_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script/render.js */ "./src/script/render.js");
/* harmony import */ var _script_control_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./script/control.js */ "./src/script/control.js");
/* harmony import */ var _script_serviceStorage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./script/serviceStorage.js */ "./src/script/serviceStorage.js");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");








const {
  createRow,
} = _script_createElements_js__WEBPACK_IMPORTED_MODULE_0__["default"];

const {
  modalControl,
  deleteControl,
  formControl,
} = _script_control_js__WEBPACK_IMPORTED_MODULE_2__["default"];

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
    } = (0,_script_render_js__WEBPACK_IMPORTED_MODULE_1__.renderPhoneBook)(app, title);

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
    const allRow = (0,_script_render_js__WEBPACK_IMPORTED_MODULE_1__.renderContacts)(list);

    const {closeModal} = modalControl(btnAdd, formOverlay);

    // hoverRow(allRow, logo);
    // ховер - показать контакт в header
    listHoverRow(list, logo);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    const data = (0,_script_serviceStorage_js__WEBPACK_IMPORTED_MODULE_3__.getContactData)();
    (0,_script_serviceStorage_js__WEBPACK_IMPORTED_MODULE_3__.setContactData)(data);

    // сортировка по имени или фамлилии
    thead.addEventListener('click', e => {
      const target = e.target;
      const data = (0,_script_serviceStorage_js__WEBPACK_IMPORTED_MODULE_3__.getContactData)();
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

})();

/******/ })()
;
//# sourceMappingURL=main2a3560e682baf8146621.js.map