
const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));

var port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

require('./config/routes')(app);