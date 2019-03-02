var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;



	

var XNet = cc.Class ({
extends : cc.Component,
statics:{
    _socket:{},
    ws_host:"ws://192.168.1.40:8086/game",
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
    
    connect:function(){
        if(this._socket.readyState!=1){

            this._socket=new WebSocket(this.ws_host);
            this._socket.onopen=this._onOpen.bind(this);
        }
        return this;
    },

    _onOpen:function(evt)
    {
        console.log("connected "+this.ws_host);
        //utils.OutObj(evt);
        //var event = new cc.Event(this,"Network",true);
        //event.setUserData("{...}");
        //cc.eventTarget.dispatchEvent(event);
       // cc.EventTarget.dispatchEvent("adas","123",evt); 
       cc.eventManager.dispatchCustomEvent("XNetOpened", {a:1,b:2});



       //var event=new cc.EventCustom("XNetOpened");
       //cc.SystemEvent.dispatchCustomEvent(event);
       XNet.dispatchXNet("XNetOpened",1);

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



    DoRecvCmd(msg)
    {
        _netPros.forEach(function (item, index, array) {
            console.log(item, index);
        });
    },

},



});

export {XNet};