
import {XNet} from './Network';
import {XGame} from './GCore';


cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        btnConn : cc.Button,
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        myListener : cc.EventListener,
        myListener1: null,

        labNetState:cc.Label
        
    },

    

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;

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
            labNode2.string=XGame.dsid;
        }

        /*
        XNet.ListenerAdd("XNetOpened",function(msg){
            console.log("xxxxxxxxx");
            //this.labelNetState.string="xxx";
        });
        */

        this.myListener1={callback:function(msg,target){
            console.log("xxxxxxxxx");
            //this.labNetState.string="xxx";
            
            var labelNode = target.node.getChildByName('labNetState');
            if(labelNode){
                var label = labelNode.getComponent(cc.Label);
                    if(label) {
                        label.fontSize = 24;
                        //labelNode.color = btnTitleColor;
                       
                        label.string = "xxxx";
                        
                    }
            }
            
        },target:this};

        XNet.ListenerAdd("XNetOpened",this.myListener1);
        //XNet.ListenerAdd("XNetOpened",{callback:this.myListener1,target:this});

       // this.labNetState.string=XGame.dsid;

    },

    // called every frame
    update: function (dt) {

    },

    connect:function()
    {
        console.log("click connect");
        XNet.connect();
    },

});
