"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'GSession');
// Script/GSession.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

/*
dsid是auth方式进行验证 通常这种模式是游客模式
dsid2是auth2方式进行的一种验证
*/
var XSession = {
  dsid: "",
  token: "",
  dsid2: "",
  token2: "",
  auth: false, //是否验证通过
  actorId: "",
  actorName: "",
  power: 0,
  gameState: 0, //游戏阶段
  isLogin: false //是否在登录状态
};

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start: function start() {}

  // update (dt) {},

});

exports.XSession = XSession;

cc._RF.pop();