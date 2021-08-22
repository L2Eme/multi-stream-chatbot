class AbstractStream {
  listeners: any[]

  constructor() {
    this.listeners = []
  }

  listen() {
    throw new Error("Unimplemented")
  }

  addMessageHandler(handler: any) {
    if (!this.listeners.includes(handler)) {
      this.listeners.push(handler)
    }
  }

  removeMessageHandler(handler: any) {
    this.listeners = this.listeners.filter(l => l !== handler)
  }

  notifyListeners(message: any, publisher: any, ctx: any) {
    const extraCtx = ctx || {}
    const defaultCtx = { streamType: this.constructor.name }
    this.listeners.forEach(l =>
      l(message, publisher, { ...defaultCtx, ...extraCtx })
    )
  }
}

class AbstractTargetedMessagePublisher {
  sendMessage(message: any) {
    throw new Error("Unimplemented")
  }
}

export {
  AbstractStream,
  AbstractTargetedMessagePublisher
}
