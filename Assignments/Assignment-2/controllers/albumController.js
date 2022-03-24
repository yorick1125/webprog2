const express = require('express');
const router = express.Router();
const routeRoot = '/album';
const model = require('../models/album-model')


router.post('/new', newAlbum)
router.get('/all', listAlbum)
router.get('/show', findAlbumByTitle)
router.put('/update', updateAlbum)
router.delete('/removal', deleteAlbum)


/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {Object} An album object
*/
async function newAlbum(request, response){
    const title = request.body.title;
    const year = request.body.year;

    try{
        const album = await model.create(title, year);
        response.send(`Album ${album.title} released in ${album.year} was created successfully! `)
        return album;
    }
    catch(error){
        if(error instanceof model.InvalidInputError){
            response.statusCode = 400;
            response.send(error.message);
        }
        else if(error instanceof model.DatabaseExecutionError){
            response.statusCode = 500;
            response.send(error.message);
        }
        else{
            console.error(error.message);
            throw error;
        }
    }


}

/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {Array} An array of album objects
*/
async function listAlbum(request, response){
    try {
        const albums = await model.findAll();
    
        if(albums.length == 0){
            response.send('Empty list of albums.')
            return;
        }
    
        let message = "";
    
        albums.forEach((album) => {
            message += album.id + " | " + album.title + " | " + album.year + '\n';
        })
    
        response.send(message);
        return albums;
    } 
    catch (error) {
        if(error instanceof model.DatabaseExecutionError){
            response.statusCode = 500;
            response.send(error.message);
        }
        else{
            console.error(error.message);
            throw error;
        }
}


}

/**
 * Finds an album based on id
* @param {Object} request
* @param {Object} response
* @returns {Object} An album object
*/
async function findAlbumByTitle(request, response){
    const title = request.query.title;

    try {
        const albums = await model.findByTitle(title);
        if(albums[0]){
            response.send(`Album ${albums[0].title} was found successfully! `)
        }
        else{
            response.statusCode = 404;
            response.send(`Album could not be found. `)
        }
        return albums[0];
    } 
    catch (error) {
        if(error instanceof model.DatabaseExecutionError){
            response.statusCode = 500;
            response.send(error.message);
        }
        else{
            console.error(error.message);
            throw error;
        }
    }

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

    try {
        const success = await model.update(title, newTitle, newYear);

        response.send(`Album ${title} was updated successfully with new title: ${newTitle} and new year: ${newYear}. `)
    
        return success;
    } 
    catch (error) {
        if(error instanceof model.InvalidInputError){
            response.statusCode = 400;
            response.send(error.message);
        }
        else if(error instanceof model.DatabaseExecutionError){
            response.statusCode = 500;
            response.send(error.message);
        }
        else{
            console.error(error.message);
            throw error;
        }

    }

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


    try {
        const success = await model.remove(title, year);
        response.send(`Album ${title} was removed successfully!`)
        return success;
    } 
    
    catch (error) {
        if(error instanceof model.DatabaseExecutionError){
            response.statusCode = 500;
            response.send(error.message);
        }
        else{
            console.error(error.message);
            throw error;
        }
    }

}


module.exports = {
    router,
    routeRoot
}