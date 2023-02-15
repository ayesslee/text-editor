import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  // connect to database with version
  const jateDb = await openDB('jate', 1);
  //create transaction with specific db
  const tx = jateDb.transaction('jate', 'readwrite');
  // open desired object store
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  // confirm request
  const result = await request;
  console.log('Data saved to database', result);
}

export const getDb = async () => {
  // connect to database with version
  const jateDb = await openDB('jate', 1);
  // create transaction with specific db
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // getAll() method to retrieve all data
  const request = store.getAll();
  // confirm request
  const result = await request;
  console.log(result);
}

initdb();
