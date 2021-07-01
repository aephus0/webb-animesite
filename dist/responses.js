class Response {
}
class ErrorRes extends Response {
    constructor(message, code, data) {
        super();
        this.status = "error";
        this.message = message;
        this.code = code;
        this.data = data;
    }
}
class SuccessRes extends Response {
    constructor(data) {
        super();
        this.status = "success";
        this.data = data;
    }
}
class FailRes extends Response {
    constructor(data) {
        super();
        this.status = "fail";
        this.data = data;
    }
}
module.exports = { ErrorRes, SuccessRes, FailRes };
