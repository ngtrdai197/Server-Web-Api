const mongoose = require('mongoose');

const dbConnection = () => {
    url = `mongodb://localhost:27017/CRUD_Demo`
    mongoose.Promise = global.Promise;
    mongoose.connect(url, {useNewUrlParser: true}).then(()=>{
    }).catch(err =>{
        console.log(err);
        process.exit();
    })
}

module.exports = {dbConnection: dbConnection};