import Database from 'better-sqlite3';

import fs from 'node:fs/promises';

await fs.mkdir('data/', { recursive: true });

const schema = await fs.readFile('src/schema.sql', 'utf8');


const db = new Database('data/app.db');
db.pragma('foreign_keys = ON');

db.exec(schema);



// CREATE
export function createUser(name, email) {
  const info = db
    .prepare('INSERT INTO users (name, email) VALUES (?, ?)')
    .run(name, email);
  return info.lastInsertRowid;          // the new id
}

// READ (all)
export function getAllUsers() {
  return db.prepare('SELECT * FROM users').all();
}

// READ (one)
export function getUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

// UPDATE
export function updateUserName(id, name) {
  const info = db
    .prepare('UPDATE users SET name = ? WHERE id = ?')
    .run(name, id);
  return info.changes;                  // how many rows were changed
}

// DELETE
export function deleteUser(id) {
  const info = db.prepare('DELETE FROM users WHERE id = ?').run(id);
  return info.changes;
}