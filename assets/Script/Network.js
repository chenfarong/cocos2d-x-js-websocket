var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

import { XOpcodes } from "./Opcodes";

//个人采用文本方式来收发数据
//频率高的采用二进制数据进行收发 例如 移动数据包

var XNet = cc.Class({
  extends: cc.Component,
  statics: {
    _socket: {},
    ws_host: "ws://test.9966886699.com:8086/game",
    _netPros: new Map(),
    _netEars: new Array(),
    _connectTimeout: 5,
    _wsReConnectTimes: 0,
    _reConnectFlag: false,
    _reConnectMax: 3,

    dispatchXNet(event, msg) {
      //        XGame.DoXEvent(event,msg);

      this._netEars.forEach(function(item, index, array) {
        item.netEvent(event, msg);
      });

      if (this._netPros[event]) {
        var listeners = this._netPros[event].slice();
        for (var i = 0; i < listeners.length; i++) {
          listeners[i].callback(msg, listeners[i].target);
        }
      }
    },

    host: function(uri) {
      this.ws_host = uri;
    },

    connect: function() {
      if (this._socket.readyState != WebSocket.OPEN) {
        console.log("connect " + this.ws_host);
        //            if(this._socket!=null) delete this._socket;

        this._socket = new WebSocket(this.ws_host);
        this._socket.onopen = this._onOpen.bind(this);
        this._socket.onerror = this._onError.bind(this);
        this._socket.onclose = this._onClose.bind(this);
        this._socket.onmessage = this._onMessage.bind(this);

        //cc.director.getScheduler().schedule(this.connectTimeoutCheck,this,1, 5, 3,false);
      }
      return this;
    },

    disconnect() {
      if (this._socket && this._socket.readyState == 1) {
        delete this._socket;
        this._socket = nil;
        //cc.director.getScheduler().
      }
    },

    readyState() {
      if (this._socket) return this._socket.readyState;
      return -1;
    },

    _onOpen: function(event) {
      console.log("connected " + this.ws_host);
      //utils.OutObj(evt);
      //var event = new cc.Event(this,"Network",true);
      //event.setUserData("{...}");
      //cc.eventTarget.dispatchEvent(event);
      // cc.EventTarget.dispatchEvent("adas","123",evt);

      //
      //cc.eventManager.dispatchCustomEvent("XNetOpened", {a:1,b:2});

      //var event=new cc.EventCustom("XNetOpened");
      //cc.SystemEvent.dispatchCustomEvent(event);
      XNet.dispatchXNet(XOpcodes.XC_NET_CONNECTED, {
        cmd: XOpcodes.XC_NET_CONNECTED,
        rc: 0
      });
    },

    _onError: function(event) {
      console.error("WebSocket error observed:", event);
      //if(_reConnectFlag)
      //{
      //    connect();
      //}
      XNet.dispatchXNet(XOpcodes.XC_NET_ERROR, {
        cmd: XOpcodes.XC_NET_ERROR,
        rc: event
      });
    },

    _onClose: function(event) {
      console.log("WebSocket is closed now.");
      XNet.dispatchXNet(XOpcodes.XC_NET_DISCONNECTED, {
        cmd: XOpcodes.XC_NET_DISCONNECTED,
        rc: 0
      });
    },

    _onMessage: function(event) {
      // console.debug("WebSocket message received:", event);
      //let str = event.data;
      let msg = JSON.parse(event.data);
      console.log(msg.cmd);
      XNet.dispatchXNet(msg.cmd, msg);
    },

    ListenerAdd(event, callback) {
      if (!event || !callback) return;
      var listenerList = this._netPros[event];
      if (!listenerList) listenerList = this._netPros[event] = new Array();
      for (var i = 0; i < listenerList.length; i++) {
        if (listenerList[i] == callback) return;
      }
      listenerList.push(callback);
    },

    ListenerRemove(event, callback) {
      if (!event || !callback) return;
      var listenerList = this._netPros[event];
      if (listenerList) {
        for (var i = 0; i < listenerList.length; i++) {
          if (listenerList[i] == callback) {
            listenerList.splice(i, 1);
            return;
          }
        }
      }
    },

    EarAdd(ear) {
      this._netEars.push(ear);
    },

    EarRemove(ear) {
      let pos = this._netEars.indexOf(ear);
      this._netEars.splice(pos, 1);
    },

    connectCheck: function() {
      if (this._socket == null) return;

      if (this._socket.readyState == WebSocket.CONNECTING) {
        console.log("websocket connect timeout");
        XNet.dispatchXNet(XOpcodes.XC_NET_CONNECT_TIMEOUT, {
          cmd: XOpcodes.XC_NET_CONNECT_TIMEOUT,
          rc: 0
        });
        this.connect();
      }

      if (this._socket.readyState == WebSocket.CLOSED) {
        console.log("websocket reconnect");
        //this.connect();
      }
    },

    sendString: function(text) {
      if (!this._socket) return;
      if (this._socket.readyState == WebSocket.OPEN) {
        this._socket.send(text);
      }
    }
  }
});

export { XNet };
