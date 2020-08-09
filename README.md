# loopback4-websocket-demo

这是一个websocket 服务器。

## 安装
    $ git clone https://github.com/ccmanny/loopback4-websocket-demo.git 
    $ cd loopback4-websocket-demo 
    $ npm i 
    $ npm start 

## 主要逻辑
前端通过websocket，与服务端（websocketServer）建立连接的时候，websocketServer通过socket.handshake.query来标记socket的状态；<br/>
test 事件 用于 商家接受 websocketServer 推送的数据。<br/>
pushSomeone 事件 用于 restApplication 通过 websocketServer 往商家推送新订单提醒。 <br/>
逻辑可看:<br/>
https://github.com/ccmanny/loopback4-websocket-demo/blob/master/src/controllers/websocket.controller.ts<br/>

## 详细请看：

https://github.com/raymondfeng/loopback4-example-websocket <br/>
https://github.com/socketio/socket.io <br/>
