
import {XNet} from './Network';
import {XGame} from './GGame';
import {xx_opcodes} from './Opcodes';

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
        btnConn : cc.Button,
        tiHost: cc.EditBox,
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        myListener : cc.EventListener,
        myListener1: null,
        myConnectTimeout:null,

        labNetState:cc.Label,
        labServerTime:cc.Label
    },

    netEvent:function(msg,target) {
        //这里处理游戏来的所有事件
        //if(event==xx_opcodes.SC_SYS_INFO){

            //this.labServerTime.string='time:'+msg.time;
            
         //   return;
        //}

        if(msg.cmd==xx_opcodes.XC_NET_DISCONNECTED){
            //fixme 整理要看客户端是否要重连游戏服务器
            cc.director.getScheduler().schedule(target.connectServer,target,3, 1, 3,false);
            return;
        }

        if(msg.cmd=="XC_NET_ERROR")
        {
            console.log("xxxx--net--xxxxx");
            cc.director.getScheduler().schedule(target.connectServer,target,3, 1, 3,false);
            return;
        }

        let labelNode = target.node.getChildByName('labNetState');
        if(labelNode){
            let label = labelNode.getComponent(cc.Label);
                if(label) {

                    if(msg.cmd=="XC_NET_CONNECT_TIMEOUT")
                    {
                        label.string="网络连接超时";
                        return;
                    }

                    if(msg.cmd==xx_opcodes.XC_NET_CONNECTED){
                        label.string="连接成功";
                        return;
                    }

                    label.fontSize = 24;
                    //labelNode.color = btnTitleColor;
                   //let _now=getdate(msg.time);
                    label.string ="time:"+msg.time.toString();
                    let timestamp4=new Date(msg.time*1000);
                    let ts=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
                    label.string =""+ts;
                }
        }
    },

    XServerConnected:function(msg,target)
    {
        console.log("xxxxxxxxx");
    },

    onDestroy(){
        XNet.ListenerRemove(xx_opcodes.SC_SYS_INFO,this.myListener1);
    },

    // use this for initialization
    onLoad: function () {

       //this.tiHost.string = cc.sys.localStorage.getItem('lastServer');
       if(cc.sys.localStorage.getItem('lastServer')){
        //console.log(cc.sys.localStorage.getItem('serverList'));
        //serverList=JSON.parse(cc.sys.localStorage.getItem('serverList'));
        this.tiHost.string = cc.sys.localStorage.getItem('lastServer');
    }

        cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);


        //XNet.ListenerAdd(xx_opcodes.XC_NET_CONNECTED,XServerConnected);
       XNet.EarAdd(XGame);
       
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
        this.myListener1={callback:this.netEvent,target:this};

        XNet.ListenerAdd(xx_opcodes.XC_NET_CONNECTED,this.myListener1);
        XNet.ListenerAdd(xx_opcodes.SC_SYS_INFO,this.myListener1);
        XNet.ListenerAdd(xx_opcodes.XC_NET_CONNECT_TIMEOUT,this.myListener1);
        XNet.ListenerAdd(xx_opcodes.XC_NET_ERROR,this.myListener1);
        XNet.ListenerAdd(xx_opcodes.XC_NET_DISCONNECTED,this.myListener1);

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
    update: function (dt) {

    },

    connectServer(){
        XNet.connect();
        cc.director.getScheduler().schedule(this.connectCheck,this,6, 1, 6,false);
    },

    connectCheck:function(){
        XNet.connectCheck();
    },

    connectTimeout(){
        if(XNet.readyState()==WebSocket.OPEN){
            //网络健康检查
            cc.director.getScheduler().schedule(this.connectCheck,this,15, 0, 0,false);
        }else{
            //重新连接服务器
            XNet.connect();
        }
    },

    connect:function()
    {
        let serverList=new Array();
        if(cc.sys.localStorage.getItem('serverList')){
            console.log(cc.sys.localStorage.getItem('serverList'));
            serverList=JSON.parse(cc.sys.localStorage.getItem('serverList'));
        }

        //这里要找如果不存在加入
        if(serverList.indexOf(this.tiHost.string)==-1){
            serverList.push(this.tiHost.string);
        }

        cc.sys.localStorage.setItem('serverList',JSON.stringify(serverList));

        cc.sys.localStorage.setItem('lastServer',this.tiHost.string);

        console.log("click connect"+this.tiHost.string);

        var userData = JSON.parse(cc.sys.localStorage.getItem('serverList'));

    //    let s= cc.sys.localStorage.getItem('serverList');
        console.log("click connect"+JSON.stringify(userData));

        //return;

        XNet.host(this.tiHost.string);
        this.connectServer();
        //XNet.connect();
        //cc.director.getScheduler().schedule(this.connectCheck,this,6, 1, 6,false);

    },

});
