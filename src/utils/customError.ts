
export class BadRequestError extends Error {
  name
  status
  customMsg
  constructor(customMsg: string) {
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
  constructor(customMsg: string) {
    super("Internal Server Error");
    this.name = this.constructor.name;
    this.status = 500;
    Error.captureStackTrace(this, this.constructor);
    // Saving custom property.
    this.customMsg = customMsg;
  }
}