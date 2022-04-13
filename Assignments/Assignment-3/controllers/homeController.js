const express = require('express');
const router = express.Router();
const routeRoot = '/home';

router.get('/', showHomepage)
router.post('/', showForm)

function showHomepage(request, response){
    const homePageData = {
        heading: "Home",
        content: "Welcome to our homepage"
    }


    response.render('home.hbs', homePageData)
}

function showForm(request, response){
    switch (request.body.choice) {
         case 'add':
              response.render('forms.hbs', {displayAddForm: true});
              break;
          case 'show':
              response.render('forms.hbs', {displayShowForm: true});
              break;
          case 'list':
              response.redirect('/albums'); // send user to right endpoint
              break;
          case 'edit':
              response.render('forms.hbs', {displayEditForm: true});
              break;
          case 'delete':
              response.render('forms.hbs', {displayDeleteForm: true});
              break;
          default:
              response.render('home.hbs');  // no valid choice made
    }
}

module.exports = {
    router,
    routeRoot
}