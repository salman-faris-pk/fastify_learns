
class AppError extends Error {
    constructor(message, statusCode = 400, code) {
      super(message);
      this.statusCode = statusCode;
      this.code = code || 'APP_ERROR';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(entity = 'Resource') {
      super(`${entity} not found`, 404, 'NOT_FOUND');
    }
  }
  
  class ConflictError extends AppError {
    constructor(entity = 'Resource') {
      super(`${entity} already exists`, 409, 'CONFLICT');
    }
  }
  
  class AuthError extends AppError {
    constructor(message = 'Invalid credentials') {
      super(message, 401, 'UNAUTHORIZED');
    }
  }
  
  class ValidationError extends AppError {
    constructor(errors) {
      super('Validation failed', 422, 'VALIDATION_ERROR');
      this.errors = errors;
    }
  }
  
  export default function errorHandler(fastify) {
    fastify.setErrorHandler((error, request, reply) => {

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          status: 'error',
          code: error.code,
          message: error.message,
          ...(error.errors && { errors: error.errors })
        });
      }
  
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return reply.status(409).send({
          status: 'error',
          code: 'DUPLICATE_KEY',
          message: `${field} already exists`
        });
      }
  
      if (error.name === 'JsonWebTokenError') {
        return reply.status(401).send({
          status: 'error',
          code: 'INVALID_TOKEN',
          message: 'Invalid authentication token'
        });
      }
  
      fastify.log.error(error);
  
      const response = {
        status: 'error',
        code: 'SERVER_ERROR',
        message: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'Something went wrong'
      };
  
      reply.status(500).send(response);
    });
  }
  
  export { 
    AppError,
    NotFoundError,
    ConflictError,
    AuthError,
    ValidationError 
  };