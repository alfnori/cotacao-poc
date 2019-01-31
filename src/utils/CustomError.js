class CustomError extends Error {

    code;
    tag;
    message;

    constructor(...args) {

        super(...args);

        this.code = args[0].code;
        this.tag = args[0].tag;
        this.message = args[0].msg;

    }

}

export default CustomError;
