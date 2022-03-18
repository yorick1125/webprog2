const express = require('express');
const router = express.Router();
const routeRoot = '/album';
const model = require('../models/album-model')


router.post('/new', newAlbum)
router.get('/all', listPokemon)
router.get('/album', findAlbumById)
router.put('/album', updateAlbum)
router.delete('/album', deleteAlbum)



async function newAlbum(request, response){
    const title = request.query.title;
    const year = request.query.year;

    const album = await model.create(title, year);

    response.send(`Album ${album.title} of type ${album.year} was created successfully! `)
}

async function listPokemon(request, response){
    const albums = await model.findAll();
    
    let message = "";

    albums.forEach((album) => {
        message += album.title + '\n';
    })

    response.send(message);

}

async function findAlbumById(request, response){
    const id = request.query.id;

    const album = await model.findById(id);
    response.send(`Album ${album.title} with id ${album.id} was found successfully! `)
}

async function updateAlbum(request, response){
    const title = request.query.title;
    const newTitle = request.query.newTitle;
    const newYear = request.query.newYear;

    const success = await model.update(title, newTitle, newYear);

    const message = success ? `Album ${album.title} was updated successfully with new title: ${newTitle} and new year: ${newYear}. ` : 'Could not remove album. '
    response.send(message);
}

async function deleteAlbum(request, response){
    const title = request.query.title;
    const year = request.query.year;

    const success = await model.remove(title, year);

    const message = success ? `Album ${album.title} was removed successfully! ` : 'Could not remove album. '
    response.send(message);
}








module.exports = {
    router,
    routeRoot
}