import { Pattern } from '@types';

export default async function populateBag() {
  const list: Pattern[] = [];
  try {
    const response = await fetch('http://localhost:1337/patterns');
    const data = await response.json();

    for (const item of data) {
      if (window.localStorage.getItem(item.id) !== null) {
        list.push(item);
      }
    }
  } catch (e) {
    console.error(e);
  }
  return list;
}
