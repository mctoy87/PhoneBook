// работа с localStorage
// получение контактов из хранилища
export const getContactData = () => (localStorage.getItem('phonebook') ?
JSON.parse(localStorage.getItem('phonebook')) : []);

// записать данные в ханилище
export const setContactData = (data) =>
  localStorage.setItem('phonebook', JSON.stringify(data));

// удаляет из localStorage
export const removeContactData = phone => {
  const data = getContactData();
  const dataAfterDelete = data.filter(item => item.phone !== phone);
  setContactData(dataAfterDelete);
};
// добавляет в localStorage
export const addContactData = contact => {
  const data = getContactData();
  data.push(contact);
  setContactData(data);
};
