#!/usr/bin/env node
import { newNote, getAllNotes, findNote, removeNote, removeAllNotes } from './notes.js'

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function listAllNotes(notes) {
    notes.forEach(note => {
        console.log('\n');
        console.log('id: ', note.id);
        console.log('tags: ', note.tags.join(', '));
        console.log('note: ', note.content);
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

    .command('all', 'get all notes', () => { }, async (argv) => {
        const notes = getAllNotes();
        listAllNotes(notes);
    })
    .command('find <filter>', 'get matching notes', yargs => {
        return yargs.positional('filter', {
            describe: 'The search term to filter notes by, will be applied to note.content',
            type: 'string'
        })
    }, async (argv) => {

    })
    .command('remove <id>', 'remove a note by id', yargs => {
        return yargs.positional('id', {
            type: 'number',
            description: 'The id of the note you want to remove'
        })
    }, async (argv) => {

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
    .command('clean', 'remove all notes', () => { }, async (argv) => await removeAllNotes())
    .demandCommand(1)
    .parse()


