
export class BadRequestError extends Error {
  name
  status
  customMsg
  constructor(customMsg: string, error: { stack?: any } = {}) {
    super("Bad request");
    this.name = this.constructor.name;
    this.status = 400;
    Error.captureStackTrace(this, this.constructor);
    // Saving custom property.
    this.customMsg = customMsg;
  }
}


export class InternalServerError extends Error {
  name
  status
  customMsg
  constructor(customMsg: string, error: { stack?: any } = {}) {
    super("Internal Server Error");
    this.name = this.constructor.name;
    this.status = 500;
    this.stack = error!.stack ?  error.stack : Error.captureStackTrace(this, this.constructor);
    // Error.captureStackTrace(this, this.constructor);
    // Saving custom property.
    this.customMsg = customMsg;
  }
}

export class ValidationError extends Error {
  name
  status
  customMsg
  constructor(customMsg: string, error: { stack?: any } = {}) {
    super("Validation Error");
    this.name = this.constructor.name;
    this.status = 500;
    this.stack = error!.stack ?  error.stack : Error.captureStackTrace(this, this.constructor);
    // Saving custom property.
    this.customMsg = customMsg;
  }
}