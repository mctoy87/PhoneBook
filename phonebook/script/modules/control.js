import createElements from './createElements.js';
import {removeContactData, addContactData} from './serviceStorage.js';

const {
  createRow,
} = createElements;

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
      removeContactData(phoneDel);
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
    addContactData(newContact);
    // очищает форму в конце
    form.reset();
    // закрывает модалку
    closeModal();
  });
};

export default {
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
};
