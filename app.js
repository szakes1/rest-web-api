const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pug = require('pug');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const websiteRouter = require('./api/routes/website');
const uploadsRouter = require('./api/routes/uploads');
const dllsRouter = require('./api/routes/dlls');
const usersRouter = require('./api/routes/users');

// Connect to a database
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

// log all requests in a console
app.use(morgan('tiny'));

// Set 'public' as a static directory
app.use('/', express.static('public'));

// Parse the JSON data from a POST request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Render from pug to HTML
app.set('view engine', 'pug');

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Handle routes which should handle requests
app.use('/', websiteRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/dlls', dllsRouter);
app.use('/api/users', usersRouter);



// Error handlers
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

// return JSON if path equals /api
app.use('/api', (error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

// return HTML if path equals /
app.use('/', (error, req, res, next) => {
    res.status(error.status).render('404');
});

module.exports = app;