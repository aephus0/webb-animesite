class Response {}

export class ErrorRes extends Response {
  constructor(
    status = "error",
    public message?: any,
    public code?: any,
    public data?: any
  ) {
    super();
    status;
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

export class SuccessRes extends Response {
  constructor(public status: string, public data?: any) {
    super();
    this.status = "Success";
    this.data = data;
  }
}

export class FailRes extends Response {
  constructor(public status: string, public data?: any) {
    super();
    this.status = "Fail";
    this.data = data;
  }
}
