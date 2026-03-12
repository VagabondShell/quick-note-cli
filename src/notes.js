import { getDb, saveDb, inserDb } from './db.js'
export const newNote = async (note, tags) => {
    const newNote = {
        content: note,
        id: Date.now(),
        tags
    };
    await inserDb(newNote);
    return newNote;
}

export const getAllNotes = async () => {
    const { notes } = getDb();
    return notes;
}

export const findNote = async (filter) => {
    const notes = getAllNotes();
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()));
}

export const removeNote = async (id) => {
    const notes = getAllNotes();
    const match = notes.find(note => note.id === id);
    if (match) {
        const newNotes = notes.filter(note => note.id !== id);
        await saveDb(newNotes);
        return id;
    }
}

export const removeAllNotes = async () => saveDb({ note: [] })

