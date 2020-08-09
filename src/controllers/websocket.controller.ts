import { Socket } from 'socket.io';
import { ws } from '../decorators/websocket.decorator';


/**
 * A demo controller for websocket
 */
@ws('/chats')
export class WebSocketController {
  constructor(
    @ws.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket,
  ) { }

  /**
   * The method is invoked when a client connects to the server
   * @param socket
   */
  @ws.connect()
  connect(socket: Socket) {
    console.log('Client connected: %s', this.socket.id);
    let query = this.socket.handshake.query;
    //TODO bind 'room' in 'user'
    console.log(query.uid);
    this.socket.join(query.uid);
    // socket.emit('test2', 'serverTest');
    console.log('rooms ------ ');
    // console.log(this.socket.rooms);
    console.log('--------- ');
  }

  /**
   * Register a handler for 'chat message' events
   * @param msg
   */
  @ws.subscribe('chat message')
  // @ws.emit('namespace' | 'requestor' | 'broadcast')
  handleChatMessage(msg: unknown) {
    console.log('Chat message: %s', msg);
    this.socket.nsp.emit('chat message', `[${this.socket.id}] ${msg}`);
  }

  @ws.subscribe('test')
  // @ws.emit('namespace' | 'requestor' | 'broadcast')
  test(msg: string) {
    //console.info(this.socket.handshake);
    // let query = this.socket.handshake.query;
    // this.socket.to('room1').emit('test2', 'dc');
    // this.socket.broadcast.emit('test', 'serverTest');
    console.log(this.socket.rooms);
    console.log('test message: %s', msg);
    //console.log('this.beforeSocket.nsp.name = ' + this.socket.nsp.name);
    // this.socket.nsp.name = "/chats/2";
    // this.socket.nsp.to('asd').emit('test', `[${this.socket.id}] ${msg}`);
    // console.log('this.afterSocket.nsp.name = ' + this.socket.nsp.name);
  }
  /**
   * funsion pushSomeone is used for restApplicetion via websocker server
   * to push data for someOne
   * @param msg
   */
  @ws.subscribe('pushSomeone')
  // @ws.emit('namespace' | 'requestor' | 'broadcast')
  pushSomeone(msg: string) {
    console.log('need push message: %s', msg);
    let msgObj = JSON.parse(msg);
    let room = msgObj.room;
    let key = msgObj.key;
    let SendMsg = msgObj.msg;
    if (room && key && SendMsg)
      this.socket.nsp.to(room).emit('test', SendMsg);
    // this.socket.nsp.emit('test', SendMsg);

  }
  /**
   * Register a handler for all events
   * @param msg
   */
  @ws.subscribe(/.+/)
  logMessage(...args: unknown[]) {
    console.log('Message: %s', args);
  }

  /**
   * The method is invoked when a client disconnects from the server
   * @param socket
   */
  @ws.disconnect()
  disconnect() {
    console.log('Client disconnected: %s', this.socket.id);
  }
}
