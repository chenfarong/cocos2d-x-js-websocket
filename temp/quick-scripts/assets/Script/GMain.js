(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GMain.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f343bfftlxFRoc099Rd1m3t', 'GMain', __filename);
// Script/GMain.js

"use strict";

var _Network = require("./Network");

var _GGame = require("./GGame");

var _Opcodes = require("./Opcodes");

function getdate(timestamp) {
  var now = new Date(timestamp),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}

cc.Class({
  extends: cc.Component,

  properties: {
    label: {
      default: null,
      type: cc.Label
    },
    btnConn: cc.Button,
    tiHost: cc.EditBox,
    // defaults, set visually when attaching this script to the Canvas
    text: "Hello, World!",
    myListener: cc.EventListener,
    myListener1: null,
    myConnectTimeout: null,

    labNetState: cc.Label,
    labServerTime: cc.Label,
    lvServers: cc.ScrollView
  },

  netEvent: function netEvent(msg, target) {
    //这里处理游戏来的所有事件
    //if(event==xx_opcodes.SC_SYS_INFO){

    //this.labServerTime.string='time:'+msg.time;

    //   return;
    //}

    if (msg.cmd == _Opcodes.XOpcodes.XC_NET_DISCONNECTED) {
      //fixme 整理要看客户端是否要重连游戏服务器
      cc.director.getScheduler().schedule(target.connectServer, target, 3, 1, 3, false);
      return;
    }

    if (msg.cmd == "XC_NET_ERROR") {
      console.log("xxxx--net--xxxxx");
      cc.director.getScheduler().schedule(target.connectServer, target, 3, 1, 3, false);
      return;
    }

    var labelNode = target.node.getChildByName("labNetState");
    if (labelNode) {
      var label = labelNode.getComponent(cc.Label);
      if (label) {
        if (msg.cmd == "XC_NET_CONNECT_TIMEOUT") {
          label.string = "网络连接超时";
          return;
        }

        if (msg.cmd == _Opcodes.XOpcodes.XC_NET_CONNECTED) {
          label.string = "连接成功";
          return;
        }

        label.fontSize = 24;
        //labelNode.color = btnTitleColor;
        //let _now=getdate(msg.time);
        label.string = "time:" + msg.time.toString();
        var timestamp4 = new Date(msg.time * 1000);
        var ts = timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
        label.string = "" + ts;
      }
    }
  },

  XServerConnected: function XServerConnected(msg, target) {
    console.log("xxxxxxxxx");
  },

  onDestroy: function onDestroy() {
    _Network.XNet.ListenerRemove(_Opcodes.XOpcodes.SC_SYS_INFO, this.myListener1);
  },


  // use this for initialization
  onLoad: function onLoad() {
    //this.tiHost.string = cc.sys.localStorage.getItem('lastServer');
    if (cc.sys.localStorage.getItem("lastServer")) {
      //console.log(cc.sys.localStorage.getItem('serverList'));
      //serverList=JSON.parse(cc.sys.localStorage.getItem('serverList'));
      this.tiHost.string = cc.sys.localStorage.getItem("lastServer");
    }

    cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);

    //cc.debug.isDisplayStats();
    this.label.string = "hello xxx";

    //XNet.ListenerAdd(xx_opcodes.XC_NET_CONNECTED,XServerConnected);
    _Network.XNet.EarAdd(_GGame.XGame);

    //        this.label.string = this.text;
    /*
         this.myListener = cc.EventListener.create({
            event    :cc.EventListener.CUSTOM,
            target   :this,
            eventName:"XNetOpened",//最好参考cocos将此参数定义为一个常量
            callback : function (event) {
    
                //获取Bear实例对象
                //var target = event.getUserData();
    
                //方法调用
                //target.bearJump();
                //target.bearEat();
                //target._labNetState.string="connected";
                console.log("xxxxxxxxx");
            }
        });
        cc.eventManager.addListener(this.myListener,1);
           var labNode=this.node.getChildByName('labNetState');
        labNode.color = new cc.color(255,255,0,255);
        var labNode2=labNode.getComponent(cc.Label);
        if(labNode2){
            labNode2.string=XSession.dsid;
        }
    */
    /*
        XNet.ListenerAdd("XNetOpened",function(msg){
            console.log("xxxxxxxxx");
            //this.labelNetState.string="xxx";
        });
        */

    /*        
        this.myListener1={callback:function(msg,target){
            //console.log("xxxxxxxxx");
            //this.labNetState.string="xxx";
            console.log(JSON.stringify(msg));
            var labelNode = target.node.getChildByName('labNetState');
            if(labelNode){
                var label = labelNode.getComponent(cc.Label);
                    if(label) {
                        label.fontSize = 24;
                        //labelNode.color = btnTitleColor;
                       //let _now=getdate(msg.time);
                        label.string ="time:"+msg.time.toString();
                        let timestamp4=new Date(msg.time*1000);
                        let ts=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
                        label.string =""+ts;
                    }
            }
            
        },target:this};
        XNet.ListenerAdd(xx_opcodes.SC_SYS_INFO,this.myListener1);
    */
    this.myListener1 = { callback: this.netEvent, target: this };

    _Network.XNet.ListenerAdd(_Opcodes.XOpcodes.XC_NET_CONNECTED, this.myListener1);
    _Network.XNet.ListenerAdd(_Opcodes.XOpcodes.SC_SYS_INFO, this.myListener1);
    _Network.XNet.ListenerAdd(_Opcodes.XOpcodes.XC_NET_CONNECT_TIMEOUT, this.myListener1);
    _Network.XNet.ListenerAdd(_Opcodes.XOpcodes.XC_NET_ERROR, this.myListener1);
    _Network.XNet.ListenerAdd(_Opcodes.XOpcodes.XC_NET_DISCONNECTED, this.myListener1);

    /*
        this.myListener1={callback:function(msg,target){
            console.log("xxxxxxxxx");
            let labelNode = target.node.getChildByName('LabelServerTime');
            let label = labelNode.getComponent(cc.Label);
            label.string= "time:"+msg.time;
        },target:this};
         XNet.ListenerAdd(xx_opcodes.SC_SYS_INFO,this.myListener1);
    */

    //XNet.ListenerAdd("XNetOpened",{callback:this.myListener1,target:this});
    // this.labNetState.string=XGame.dsid;
  },

  // called every frame
  update: function update(dt) {},

  connectServer: function connectServer() {
    _Network.XNet.connect();
    cc.director.getScheduler().schedule(this.connectCheck, this, 6, 1, 6, false);
  },


  connectCheck: function connectCheck() {
    _Network.XNet.connectCheck();
  },

  connectTimeout: function connectTimeout() {
    if (_Network.XNet.readyState() == WebSocket.OPEN) {
      //网络健康检查
      cc.director.getScheduler().schedule(this.connectCheck, this, 15, 0, 0, false);
    } else {
      //重新连接服务器
      _Network.XNet.connect();
    }
  },


  connect: function connect() {
    var serverList = new Array();
    if (cc.sys.localStorage.getItem("serverList")) {
      console.log(cc.sys.localStorage.getItem("serverList"));
      serverList = JSON.parse(cc.sys.localStorage.getItem("serverList"));
    }

    //这里要找如果不存在加入
    if (serverList.indexOf(this.tiHost.string) == -1) {
      serverList.push(this.tiHost.string);
    }

    cc.sys.localStorage.setItem("serverList", JSON.stringify(serverList));

    cc.sys.localStorage.setItem("lastServer", this.tiHost.string);

    console.log("click connect" + this.tiHost.string);

    var userData = JSON.parse(cc.sys.localStorage.getItem("serverList"));

    //    let s= cc.sys.localStorage.getItem('serverList');
    console.log("click connect" + JSON.stringify(userData));

    //return;

    _Network.XNet.host(this.tiHost.string);
    this.connectServer();
    //XNet.connect();
    //cc.director.getScheduler().schedule(this.connectCheck,this,6, 1, 6,false);
  },
  btnServerList: function btnServerList(event) {
    console.log("btnServerList");
    var sprite = new cc.Sprite("Texture/HelloWorld.png");
    cc.director.getScene().addChild(sprite);
    //this.lvServers.(sprite, 2);
    //this.node.addChild(sprite);
  }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GMain.js.map
        