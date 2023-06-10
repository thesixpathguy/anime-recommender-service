class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
    }
}

class EntityAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
    }
}

class ValidationError extends Error {
    constructor(email) {
        if (!email) {
            super('Email is required.');
        }
        else {
            super(`Email ${email} is invalid.`);
        }
        this.name = 'ValidationError';
    }
}

module.exports = { ValidationError, DatabaseError, EntityAlreadyExistsError};