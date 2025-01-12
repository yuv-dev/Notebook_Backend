const fs = require('fs');

/**
 * @description logger is a function to create a log of any data to any file.
 * @params filepath:path to the storage file
 *         data: value to be stored in file
 * @return void
 */
const logger = (filepath, data)=>{

  function closeFd(fd) {
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  }

  fs.open(filepath, 'a', (err, fd) => {
    if (err) throw err;
  
    try {
      fs.appendFile(fd, data+"\n", 'utf8', (err) => {
        closeFd(fd);
        if (err) throw err;
      });
    } catch (err) {
      closeFd(fd);
      throw err;
    }
  });


}

/**
 * @description reqLogger is a middleware to create a log oll requests send to the app server.
 * @params req-the request body, res - resolves to ay error, next- switch to next middleware in chin
 * @return void
 */
const reqLogger = (req, res, next) => {

    const data = req.url +" "+ new Date();
    const filepath = './Logs/request_logs.txt';

    logger(filepath, data);
    next();
};


/**
 * @description errorLogger is a function to create log of all errors
 * @params err - error at any point
 * @return void
 */
const errorLogger = (err) => {

  const data = new Date() +" "+ err;
  const filepath = './Logs/error_logs.txt'
  logger(filepath, data);

};


module.exports = {
  reqLogger,
  errorLogger
};