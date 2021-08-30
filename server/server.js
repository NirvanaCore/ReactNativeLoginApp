//mongodb
require('./config/db');

const app = require('express')();
const port = process.env.PORT || 3000;

const UserRouter = require('./api/User');

//for accepting post from data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
