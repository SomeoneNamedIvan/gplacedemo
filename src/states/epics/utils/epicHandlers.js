import Toast from "../../../utils/toast";

const errorHandler = (e, caught) => {
    Toast.init.error.show(e);
    return caught;
};

export {errorHandler}