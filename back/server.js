// require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.set('host', 'localhost');
app.set('port', 3001);
app.use(express.json());
app.use(bodyParser.json({limit: '5mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method == "OPTIONS") {
        res.writeHead(200);
        res.end();
    } else {
        next();
    }
});

const faceRoutes = require('./routes/face');

app.use('/api/face', faceRoutes);

app.listen(app.get('port'), () => console.log(`App is running on http://${app.get('host')}:${app.get('port')}`));