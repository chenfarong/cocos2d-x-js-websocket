(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Opcodes.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3a8d7uQeatO6b8/ziLa2tYA', 'Opcodes', __filename);
// Script/Opcodes.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var XOpcodes = {
  XC_NET_CONNECTED: "XC_NET_CONNECTED", //成功连接
  XC_NET_CONNECTED_FAILED: "XC_NET_CONNECT_FAILED", //连接失败
  XC_NET_DISCONNECTED: "XC_NET_DISCONNECTED", //断开连接
  XC_NET_ERROR: "XC_NET_ERROR", //网络错误
  XC_NET_CONNECT_TIMEOUT: "XC_NET_CONNECT_TIMEOUT", //连接超时

  XC_TOKEN_NEW: "XC_TOKEN_NEW", //获取令牌
  XC_TOKEN_AUTH: "XC_TOKEN_AUTH", //验证令牌

  SC_SYS_INFO: "GX_SYSINFO_R" //系统消息
};

exports.XOpcodes = XOpcodes;

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
        //# sourceMappingURL=Opcodes.js.map
        