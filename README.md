# loopback4-websocket-demo

这是一个websocket 服务器。


## 主要逻辑
前端通过websocket，与服务端（websocketServer）建立连接的时候，websocketServer通过socket.handshake.query来标记socket的状态；
test 事件 用于 商家接受 websocketServer 推送的数据
push 事件 用于 restApplication 通过 websocketServer 往商家推送新订单提醒。 



##详细请看：

https://github.com/raymondfeng/loopback4-example-websocket
