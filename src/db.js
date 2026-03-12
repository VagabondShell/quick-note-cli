import fs from 'node:fs/promises'

const dbPath = '../db.json';
export const getDb = async () => {
    const db = await fs.readFile(dbPath, 'utf8');
    return JSON.parce(db);
}

export const saveDb = async (db) => {
    await fd.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
    return db;
}

export const inserDb = async (note) => {
    const db = await getDb();
    db.notes.push(note);
    await saveDb(db);
    return note;
}

