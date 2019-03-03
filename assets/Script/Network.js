var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;


import {xx_errid,xx_opcodes} from './Opcodes';
	

var XNet = cc.Class ({
extends : cc.Component,
statics:{
    _socket:{},
    ws_host:"ws://test.9966886699.com:8086/game",
    _netPros:new Map(),

    dispatchXNet(event,msg){
        if(this._netPros[event])
        {
            var listeners=this._netPros[event].slice();
            for(var i=0;i<listeners.length;i++){
                listeners[i].callback(msg,listeners[i].target);
            }
        }
    },
    
    connect:function()
    {
        if(this._socket.readyState!=1){

            this._socket=new WebSocket(this.ws_host);
            this._socket.onopen=this._onOpen.bind(this);
            this._socket.onerror=this._onError.bind(this);
            this._socket.onclose=this._onClose.bind(this);
            this._socket.onmessage=this._onMessage.bind(this);
        }
        return this;
    },



    _onOpen:function(event)
    {
        console.log("connected "+this.ws_host);
        //utils.OutObj(evt);
        //var event = new cc.Event(this,"Network",true);
        //event.setUserData("{...}");
        //cc.eventTarget.dispatchEvent(event);
       // cc.EventTarget.dispatchEvent("adas","123",evt); 
       
       //
       //cc.eventManager.dispatchCustomEvent("XNetOpened", {a:1,b:2});



       //var event=new cc.EventCustom("XNetOpened");
       //cc.SystemEvent.dispatchCustomEvent(event);
       XNet.dispatchXNet(xx_opcodes.XC_NET_CONNECTED,{cmd:xx_opcodes.XC_NET_CONNECTED,rc:0});

    },


    _onError:function(event)
    {
        console.error("WebSocket error observed:", event);
    },

    _onClose:function(event)
    {
        console.log("WebSocket is closed now.");
        XNet.dispatchXNet(xx_opcodes.XC_NET_DISCONNECTED,{cmd:xx_opcodes.XC_NET_DISCONNECTED,rc:0});
    },

    _onMessage:function(event)
    {
        console.debug("WebSocket message received:", event);
        var str = event.data;
        var msg = JSON.parse(str);
        console.log(msg.cmd);
    },


    ListenerAdd(event,callback)
    {
        if(!event|| !callback) return;
        var listenerList=this._netPros[event];
        if(!listenerList) listenerList=this._netPros[event]=new Array();
        for(var i=0;i<listenerList.length;i++)
        {
            if(listenerList[i]==callback) return;
        }
        listenerList.push(callback);
    },

    ListenerRemove(event,callback){
        if(!event|| !callback) return;
        var listenerList=this._netPros[event];
        if(listenerList){
            for(var i=0;i<listenerList.length;i++)
            {
                if(listenerList[i]==callback){ 
                    listenerList.splice(i,1);
                    return;
                }
            }
        }        
    },




},



});

export {XNet};