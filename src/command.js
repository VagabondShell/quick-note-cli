#!/usr/bin/env node
import { newNote, getAllNotes, findNote, removeNote, removeAllNotes } from './notes.js'

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function listAllNotes(notes) {
    notes.forEach(note => {
        console.log('\n');
        console.log('id: ', note.id);
        console.log('note: ', note.content);
        console.log('Tags: ', note.tags?.length ? note.tags.join(', ') : 'none');
    });
}

yargs(hideBin(process.argv)).command('new <note>', 'Creat new note', yargs => {
    return yargs.positional('note', { type: 'string', description: 'The content of the note you want to store' })
}, async (argv) => {
    const tags = argv.tags ? argv.tags.split(',') : []
    const note = await newNote(argv.note, tags);
    console.log('New note is created: ', note);
})
    .option('tag', { type: 'string', alias: 't', description: 'tag to add to the note' })
    .command('all', 'get all notes', () => { }, async () => {
        const notes = await getAllNotes();
        listAllNotes(notes);
    })
    .command('find <filter>', 'get matching notes', yargs => {
        return yargs.positional('filter', {
            describe: 'The search term to filter notes by, will be applied to note.content',
            type: 'string'
        })
    }, async (argv) => {
        const note = await findNote(argv.filter);
        if (note)
            listAllNotes(note)
        else
            console.log("there is no such not");
    })
    .command('remove <id>', 'remove a note by id', yargs => {
        return yargs.positional('id', {
            type: 'number',
            description: 'The id of the note you want to remove'
        })
    }, async (argv) => {
        const isRemoved = await removeNote(Number(argv.id));
        if (isRemoved)
            console.log("The deletion operation is done suc");
        else
            console.log("Thre is no such id");
    })
    .command('web [port]', 'launch website to see notes', yargs => {
        return yargs
            .positional('port', {
                describe: 'port to bind on',
                default: 5000,
                type: 'number'
            })
    }, async (argv) => {

    })
    .command('clean', 'remove all notes', () => { }, async () => await removeAllNotes())
    .demandCommand(1)
    .parse()


