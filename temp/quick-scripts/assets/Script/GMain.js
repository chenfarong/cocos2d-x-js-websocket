(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GMain.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'GMain', __filename);
// Script/GMain.js

'use strict';

var _Network = require('./Network');

var _GCore = require('./GCore');

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        btnConn: cc.Button,
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        myListener: cc.EventListener,
        myListener1: null,

        labNetState: cc.Label

    },

    // use this for initialization
    onLoad: function onLoad() {
        this.label.string = this.text;

        this.myListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: "XNetOpened", //最好参考cocos将此参数定义为一个常量
            callback: function callback(event) {

                //获取Bear实例对象
                //var target = event.getUserData();

                //方法调用
                //target.bearJump();
                //target.bearEat();
                //target._labNetState.string="connected";
                console.log("xxxxxxxxx");
            }
        });
        cc.eventManager.addListener(this.myListener, 1);

        var labNode = this.node.getChildByName('labNetState');
        labNode.color = new cc.color(255, 255, 0, 255);
        var labNode2 = labNode.getComponent(cc.Label);
        if (labNode2) {
            labNode2.string = _GCore.XGame.dsid;
        }

        /*
        XNet.ListenerAdd("XNetOpened",function(msg){
            console.log("xxxxxxxxx");
            //this.labelNetState.string="xxx";
        });
        */

        this.myListener1 = { callback: function callback(msg, target) {
                console.log("xxxxxxxxx");
                //this.labNetState.string="xxx";

                var labelNode = target.node.getChildByName('labNetState');
                if (labelNode) {
                    var label = labelNode.getComponent(cc.Label);
                    if (label) {
                        label.fontSize = 24;
                        //labelNode.color = btnTitleColor;

                        label.string = "xxxx";
                    }
                }
            }, target: this };

        _Network.XNet.ListenerAdd("XNetOpened", this.myListener1);
        //XNet.ListenerAdd("XNetOpened",{callback:this.myListener1,target:this});

        // this.labNetState.string=XGame.dsid;
    },

    // called every frame
    update: function update(dt) {},

    connect: function connect() {
        console.log("click connect");
        _Network.XNet.connect();
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
        