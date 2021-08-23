"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractStream {
    constructor() {
        this.listeners = [];
    }
    listen() {
        throw new Error("Unimplemented");
    }
    addMessageHandler(handler) {
        if (!this.listeners.includes(handler)) {
            this.listeners.push(handler);
        }
    }
    removeMessageHandler(handler) {
        this.listeners = this.listeners.filter(l => l !== handler);
    }
    notifyListeners(message, publisher, ctx) {
        const extraCtx = ctx || {};
        const defaultCtx = { streamType: this.constructor.name };
        this.listeners.forEach(l => l(message, publisher, Object.assign(Object.assign({}, defaultCtx), extraCtx)));
    }
}
exports.AbstractStream = AbstractStream;
class AbstractTargetedMessagePublisher {
    sendMessage(message) {
        throw new Error("Unimplemented");
    }
}
exports.AbstractTargetedMessagePublisher = AbstractTargetedMessagePublisher;
