import io from 'socket.io-client'

const localIP = 'ws://raspberrypi:3000'

class Socket {
  constructor () {
    console.log('Initialising Socket')
    this.socket = io(localIP)
    // this.socket.prependAny(console.log)
  }

  addEventListener (event) {
    this.socket.on(event.type, event.callback)
  }

  removeEventListener (events) {
    events = Array.isArray(events) ? events : [events]
    events.forEach(this.socket.off)
  }

  sendEvent (event, msg) {
    this.socket.emit(event, msg)
  }

  /**
   *  his allows for GET and POST like requests through the socket interface
   *  Sends the request to the server through the socket and creates a temporary listener and returns the result in a prommise
   *  @param details object containing send (the event to send to the server), data (the data to send with the event), and get (the event sent from the server)
   *
   */
  singleRequest (details) {
    return new Promise((resolve, reject) => {
      if (!details.send) return reject('No event given to emit. Expected property "send"')
      if (!details.get) return reject('No event given to receive. Expected property "get"')
      this.sendEvent(details.send, details.data)
      this.addEventListener({
        type: details.get,
        callback: (msg) => {
          this.removeEventListener(details.get)
          resolve(msg)
        }
      })
    })
  }
}

export const socketio = new Socket()
export default socketio
