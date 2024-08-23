// components/database/customerTable.js

import * as SQLite from 'expo-sqlite';

let db;

export const openDatabaseAsync = async () => {
    try{
  if (!db) {
    db = await SQLite.openDatabaseAsync('grocery_store.db');
  }
  return db;
} catch (error) {
  console.error('Error opening database', error);
}
};

// export const createCustomerTable = async () => {
//   const database = await openDatabaseAsync();
  
//   try {
//     await new Promise((resolve, reject) => {
//       database.transaction(tx => {
//         tx.executeSql(
//           `CREATE TABLE IF NOT EXISTS Customers (
//             customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
//             customer_name TEXT NOT NULL,
//             contact_number TEXT,
//             email TEXT,
//             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//           );`,
//           [],
//           (_, result) => resolve(result),
//           (_, error) => reject(error)
//         );
//       });
//     });
//     console.log('Customers table created successfully');
//   } catch (error) {
//     console.error('Error creating Customers table', error);
//   }
// };

export const createCustomerTable = async () => {
    try {
      // Define the SQL command for creating the table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Customers (
          customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_name TEXT NOT NULL,
          contact_number TEXT,
          email TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `;
  
      // Execute the SQL command asynchronously
    //   await db.execAsync([{ sql: createTableQuery, args: [] }]);
    await db.execAsync(createTableQuery);
      console.log('Customers table created successfully');
    } catch (error) {
      console.error('Error creating Customers table', error);
    }
  };