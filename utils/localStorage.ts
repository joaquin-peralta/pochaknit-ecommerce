import { Pattern } from '@types';

const localStorage = {
  populateBag: (item: Pattern): {} => {
    const retrievedObject = window.localStorage.getItem(String(item.id));
    if (retrievedObject !== null) {
      return JSON.parse(retrievedObject);
    }
    return {};
  },
  cleanBag: () => window.localStorage.clear,
};

export default localStorage;
