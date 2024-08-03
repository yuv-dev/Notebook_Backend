const {errorLogger} = require('./logger');

const errorHandler = (err)=>{
    console.log(err);
    errorLogger(err);
    

}

module.exports = errorHandler;
