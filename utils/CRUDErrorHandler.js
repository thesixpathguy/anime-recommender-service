const { ValidationError, EntityAlreadyExistsError } = require('./customErrors');
const { errorCodes } = require('./statusCodes');

function handleError(err, res) {
    if(err instanceof ValidationError) {
        res.status(errorCodes.VALIDATION_ERROR);
    } else if(err instanceof EntityAlreadyExistsError) {
        res.status(errorCodes.CONFLICT);
    } else {
        res.status(errorCodes.SERVER_ERROR);
    }
    return res;
}

module.exports = handleError;