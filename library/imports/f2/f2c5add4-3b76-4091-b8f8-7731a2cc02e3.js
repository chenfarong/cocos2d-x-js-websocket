"use strict";
cc._RF.push(module, 'f2c5a3UO3ZAkbj4dzGizALj', 'Network');
// Script/Network.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.XNet = undefined;

var _Opcodes = require("./Opcodes");

var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

var XNet = cc.Class({
    extends: cc.Component,
    statics: {
        _socket: {},
        ws_host: "ws://test.9966886699.com:8086/game",
        _netPros: new Map(),

        dispatchXNet: function dispatchXNet(event, msg) {
            if (this._netPros[event]) {
                var listeners = this._netPros[event].slice();
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i].callback(msg, listeners[i].target);
                }
            }
        },


        connect: function connect() {
            if (this._socket.readyState != 1) {

                this._socket = new WebSocket(this.ws_host);
                this._socket.onopen = this._onOpen.bind(this);
                this._socket.onerror = this._onError.bind(this);
                this._socket.onclose = this._onClose.bind(this);
                this._socket.onmessage = this._onMessage.bind(this);
            }
            return this;
        },

        _onOpen: function _onOpen(event) {
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
            XNet.dispatchXNet(_Opcodes.xx_opcodes.XC_NET_CONNECTED, { cmd: _Opcodes.xx_opcodes.XC_NET_CONNECTED, rc: 0 });
        },

        _onError: function _onError(event) {
            console.error("WebSocket error observed:", event);
        },

        _onClose: function _onClose(event) {
            console.log("WebSocket is closed now.");
            XNet.dispatchXNet(_Opcodes.xx_opcodes.XC_NET_DISCONNECTED, { cmd: _Opcodes.xx_opcodes.XC_NET_DISCONNECTED, rc: 0 });
        },

        _onMessage: function _onMessage(event) {
            console.debug("WebSocket message received:", event);
            var str = event.data;
            var msg = JSON.parse(str);
            console.log(msg.cmd);
        },

        ListenerAdd: function ListenerAdd(event, callback) {
            if (!event || !callback) return;
            var listenerList = this._netPros[event];
            if (!listenerList) listenerList = this._netPros[event] = new Array();
            for (var i = 0; i < listenerList.length; i++) {
                if (listenerList[i] == callback) return;
            }
            listenerList.push(callback);
        },
        ListenerRemove: function ListenerRemove(event, callback) {
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
        }
    }

});

exports.XNet = XNet;

cc._RF.pop();