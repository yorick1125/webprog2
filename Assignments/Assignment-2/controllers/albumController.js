const express = require('express');
const router = express.Router();
const routeRoot = '/album';
const model = require('../models/album-model')


router.post('/new', newAlbum)
router.get('/all', listAlbum)
router.get('/id', findAlbumById)
router.put('/album', updateAlbum)
router.delete('/album', deleteAlbum)


/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {Object} An album object
*/
async function newAlbum(request, response){
    const title = request.body.title;
    const year = request.body.year;

    const album = await model.create(title, year);

    response.send(`Album ${album.title} of type ${album.year} was created successfully! `)
    return album;
}

/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {Array} An array of album objects
*/
async function listAlbum(request, response){
    const albums = await model.findAll();
    
    if(albums.length == 0){
        response.send('Empty list of albums.')
        return;
    }

    let message = "";

    albums.forEach((album) => {
        message += album.title + '\n';
    })

    response.send(message);
    return albums;

}

/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {Object} An album object
*/
async function findAlbumById(request, response){
    const id = request.query.id;

    const album = await model.findById(id);
    response.send(`Album ${album.title} with id ${album.id} was found successfully! `)
    return album;
}

/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {boolean} Whether the album was edited successfully
*/
async function updateAlbum(request, response){
    const title = request.query.title;
    const newTitle = request.query.newTitle;
    const newYear = request.query.newYear;

    const success = await model.update(title, newTitle, newYear);

    const message = success ? `Album ${album.title} was updated successfully with new title: ${newTitle} and new year: ${newYear}. ` : 'Could not remove album. '
    response.send(message);
    return success;
}

/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {boolean} Whether the album was deleted successfully
*/
async function deleteAlbum(request, response){
    const title = request.query.title;
    const year = request.query.year;

    const success = await model.remove(title, year);

    const message = success ? `Album ${album.title} was removed successfully! ` : 'Could not remove album. '
    response.send(message);
    return success;
}








module.exports = {
    router,
    routeRoot
}