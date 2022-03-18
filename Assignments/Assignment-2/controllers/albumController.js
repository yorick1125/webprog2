const express = require('express');
const router = express.Router();
const routeRoot = '/album';
const model = require('../models/album-model')


router.post('/new', newAlbum)
router.get('/all', listAlbum)
router.get('/find', findAlbumByTitle)
router.put('/edit', updateAlbum)
router.delete('/remove', deleteAlbum)


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

    // if invalid
    if(album == null){
        response.statusCode = 404;
        response.send('Could not create Album.')
        return;
    }

    response.send(`Album ${album.title} released in ${album.year} was created successfully! `)
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
async function findAlbumByTitle(request, response){
    const title = request.query.title;

    const albums = await model.findByTitle(title);
    if(albums[0]){
        response.send(`Album ${albums[0].title} was found successfully! `)
    }
    else{
        response.send(`Album could not be found. `)
    }
    return albums[0];
}

/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {boolean} Whether the album was edited successfully
*/
async function updateAlbum(request, response){
    const title = request.body.title;
    const newTitle = request.body.newTitle;
    const newYear = request.body.newYear;

    const success = await model.update(title, newTitle, newYear);

    if(success){
        response.send(`Album ${title} was updated successfully with new title: ${newTitle} and new year: ${newYear}. `)
    }
    else{
        response.statusCode = 404;
        response.send('Could not edit album. ');
    }

    return success;
}

/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {boolean} Whether the album was deleted successfully
*/
async function deleteAlbum(request, response){
    const title = request.body.title;
    const year = request.body.year;

    const success = await model.remove(title, year);

    if(success){
        response.send(`Album ${title} was removed successfully!`)
    }
    else{
        response.statusCode = 404;
        response.send('Could not remove album. ')
    }

    return success;
}








module.exports = {
    router,
    routeRoot
}