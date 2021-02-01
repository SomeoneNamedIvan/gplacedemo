import {toast} from "react-toastify";
import React from "react";

export default class Toast {
    constructor() {
        this.type = toast.TYPE.ERROR;
        this.position = toast.POSITION.BOTTOM_RIGHT;
        this.isError = true;
    }

    static get init() {
        if (Toast.instance == null || Toast.instance === undefined) {
            Toast.instance = new Toast();

        }
        return Toast.instance;
    }

    get top() {
        this.position = toast.POSITION.TOP_RIGHT;
        return this;
    }

    get bottom() {
        this.position = toast.POSITION.BOTTOM_RIGHT;
        return this;
    }

    get success() {
        this.type = toast.TYPE.SUCCESS;
        this.isError = false;
        return this;
    }

    get warning() {
        this.type = toast.TYPE.WARNING;
        this.isError = false;
        return this;
    }

    get error() {
        this.type = toast.TYPE.ERROR;
        this.isError = true;
        return this;
    }

    show(msg, timeout) {
        const option = {
            type: this.type,
            position: this.position,
        };

        if (timeout) {
            option.autoClose = timeout;
        }


        let message = msg && (msg.message || msg.errors || msg.type || msg.errmsg || msg.errorMsg || JSON.stringify(msg));

        toast(message, option);
    }

}
