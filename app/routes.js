module.exports = function(app, passport) {

    // HOMEPAGE
    app.get('/', function(req, res) {
        res.render('page-login.ejs', { message: req.flash('loginMessage') }); 
    });

    // LOGIN
//    app.get('/login', function(req, res) {
//
  //      // render the page and pass in any flash data if it exists
    //    res.render('page-login.ejs', { message: req.flash('loginMessage') }); 
    //});

    // process the login form
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/index', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // SIGNUP
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('page-signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/index', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // PROFILE SECTION 
    app.get('/index', isLoggedIn, function(req, res) {
        res.render('index.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // LOGOUT
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // APP PAGES
    app.get('/chart-flot', function(req, res) {
        res.render('chart-flot.ejs', { message: req.flash('chart-flot') });
    });

    app.get('/comp-chart', function(req, res) {
        res.render('comp-chartjs.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/tables', function(req, res) {
        res.render('tables.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/notify', function(req, res) {
        res.render('notify.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
