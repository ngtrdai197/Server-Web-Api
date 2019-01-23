const mongoose = require('mongoose');

const dbConnection = () => {
    url = `mongodb://localhost:27017/CRUD_Demo`
    mongoose.Promise = global.Promise;
    mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    }).catch(err => {
        console.log(err);
        process.exit();
    })
}

module.exports = { dbConnection: dbConnection };

// const mongoose = require('mongoose');

// const dbConnection = () => {
//     mongoose.Promise = global.Promise;
//     url = 'mongodb://ngtrdai197:anhdaii1@ds211275.mlab.com:11275/server-web-api'
//     mongoose.connect(url, { useNewUrlParser: true }).then(() => {
//     }).catch(() => {
//         process.exit();
//     })
// }

// module.exports = { dbConnection: dbConnection };