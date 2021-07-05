class Response {
}
export class ErrorRes extends Response {
    message;
    code;
    data;
    constructor(status = "error", message, code, data) {
        super();
        this.message = message;
        this.code = code;
        this.data = data;
        status;
        this.message = message;
        this.code = code;
        this.data = data;
    }
}
export class SuccessRes extends Response {
    status;
    data;
    constructor(status, data) {
        super();
        this.status = status;
        this.data = data;
        this.status = "Success";
        this.data = data;
    }
}
export class FailRes extends Response {
    status;
    data;
    constructor(status, data) {
        super();
        this.status = status;
        this.data = data;
        this.status = "Fail";
        this.data = data;
    }
}
