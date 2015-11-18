'use strict';

const app = module.exports = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config.js');
const cors = require('cors');
const debug = require('debug')('file-warehouse:index');
const routes = require('./routes');


app.enable('trust proxy');
app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.use((req, res) => {
    res.status(404).end();
});

app.use((err, req, res) => {
    debug(err);
    res.status(500).end();
});

if (!module.parent) {
    const port = config.misc.listen_port;
    app.listen(port, () => {
        debug('listening on ' + port);
    });
}
