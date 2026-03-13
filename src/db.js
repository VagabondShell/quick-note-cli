import fs from 'node:fs/promises'
import path from 'node:path';

const dbPath = path.resolve('db.json');
export const getDb = async () => {
    const db = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(db);
}

export const saveDb = async (db) => {
    const dbObject = { notes: db };
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
    return db;
}

export const inserDb = async (note) => {
    const db = await getDb();
    db.notes.push(note);
    await saveDb(db);
    return note;
}
