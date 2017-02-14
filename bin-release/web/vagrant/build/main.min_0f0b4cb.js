var LoadingUI=function(e){function t(){e.call(this),this.createView()}__extends(t,e);var i=t,a=i.prototype;return a.createView=function(){var e=egret.MainContext.instance.stage.stageWidth,t=egret.MainContext.instance.stage.stageHeight;this.bg=new egret.Shape,this.bg.graphics.beginFill(16767502,1),this.bg.graphics.drawRect(0,0,e,t),this.bg.graphics.endFill(),this.addChild(this.bg),this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=500,this.textField.width=e,this.textField.height=100,this.textField.textColor=0,this.textField.textAlign="center",this.textfield=new egret.TextField,this.addChild(this.textfield),this.textfield.y=532,this.textfield.width=e,this.textfield.height=100,this.textfield.textColor=0,this.textfield.textAlign="center"},a.setProgress=function(e,t){this.textfield.text="加载了"+e+"个,还剩"+(t-e)+"个",this.textField.text="猫哥正在为您拼命加载游戏资源..."},t}(egret.Sprite);egret.registerClass(LoadingUI,"LoadingUI");var Main=function(e){function t(){e.call(this),this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)}__extends(t,e);var i=t,a=i.prototype;return a.onAddToStage=function(){this.loadingView=new LoadingUI,this.stage.addChild(this.loadingView),RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this),RES.loadConfig("resource/default.res.json","resource/")},a.onConfigComplete=function(){RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this),RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this),RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this),RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this),RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this),RES.loadGroup("preload")},a.onResourceLoadComplete=function(e){"preload"==e.groupName&&(this.stage.removeChild(this.loadingView),RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this),RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this),RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this),RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this),this.createGameScene())},a.onItemLoadError=function(e){console.warn("Url:"+e.resItem.url+" has failed to load")},a.onResourceLoadError=function(e){console.warn("Group:"+e.groupName+" has failed to load"),this.onResourceLoadComplete(e)},a.onResourceProgress=function(e){"preload"==e.groupName&&this.loadingView.setProgress(e.itemsLoaded,e.itemsTotal)},a.createGameScene=function(){this.createGameScene1()},a.createGameScene1=function(){var e=this,t=new egret.DisplayObjectContainer,i=new egret.Shape,a=this.stage.stageWidth,n=this.stage.stageHeight;i.graphics.beginFill(16767502,1),i.graphics.drawRect(0,0,a,n),i.graphics.endFill(),t.addChild(i);var s=this.createBitmapByName("bk-sanshe_png");t.addChild(s);var r=this.createBitmapByName("bk-dian_png");t.addChild(r);var h=this.createBitmapByName("bk-p1_png");t.addChild(h);var o=this.createBitmapByName("left_png"),d=this.createBitmapByName("right_png");o.x=0,o.y=658,t.addChild(o),d.x=a-141,d.y=658,t.addChild(d);var c=this.createBitmapByName("icon-emao_png");t.addChild(c);var l=this.createBitmapByName("btn-lijixiaheishou_png");t.addChild(l),l.x=82,l.y=995,this.addChild(t),l.touchEnabled=!0,l.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){TweenMax.to(t,1,{x:-1e3,y:-1e3,scale:0,appha:0,rotation:-100,ease:Back.easeInOut,onComplete:function(){e.removeChild(t)}}),e.createGameScene2(),e.setChildIndex(t,t.numChildren-1)},this,!0),c.touchEnabled=!0,c.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){window.location.href="http://m.emao.com"},this,!0)},a.createGameScene2=function(){new P2Scene(P2Scene.scene,this.stage)},a.createGameScene3=function(){new P3Scene(P3Scene.scene,this.stage)},a.createBitmapByName=function(e){var t=new egret.Bitmap,i=RES.getRes(e);return t.texture=i,t},a.startAnimation=function(e){for(var t=this,i=new egret.HtmlTextParser,a=[],n=0;n<e.length;n++)a.push(i.parser(e[n]));var s=t.textfield,r=-1,h=function(){r++,r>=a.length&&(r=0);var e=a[r];t.changeDescription(s,e);var i=egret.Tween.get(s);i.to({alpha:1},200),i.wait(2e3),i.to({alpha:0},200),i.call(h,t)};h()},a.changeDescription=function(e,t){e.textFlow=t},t}(egret.DisplayObjectContainer);egret.registerClass(Main,"Main");var P2Scene=function(){function e(t,i){var a=this;this.scene=e.scene,this.bodyType=p2.Body.DYNAMIC,this.world=e.world,this.factor=50,this.stageWidth=egret.MainContext.instance.stage.stageWidth,this.stageHeight=egret.MainContext.instance.stage.stageHeight,this.scoreLabel=new egret.TextField,this.deadlineLabel=new egret.TextField,this.flag=!1,this.container=t,this.stage=i,this.createScene();var n=e.world.bodies.slice();n.forEach(function(t){e.world.removeBody(t)}),e.world.sleepMode=p2.World.BODY_SLEEPING,this.createScore(),this.show(function(){return a.loop()}),this.createDeadline(),this.createGround(),e.stageHeight=egret.MainContext.instance.stage.$stageHeight,e.stageWidth=egret.MainContext.instance.stage.$stageWidth}var t=e,i=t.prototype;return i.createScore=function(){this.container.addChild(this.scoreLabel),this.setScore(e.score=0),this.scoreLabel.x=this.stageWidth-60,this.scoreLabel.y=30,this.scoreLabel.textColor=14685975},i.createDeadline=function(){this.container.addChild(this.deadlineLabel),this.setDeadline(this.deadline=e.TIME),this.deadlineLabel.x=this.stageWidth/2-80,this.deadlineLabel.textColor=16777215,this.deadlineLabel.size=60},i.setScore=function(e){this.scoreLabel.text=""+e},i.setDeadline=function(e){e%60==0?this.deadlineLabel.text="0"+Math.floor(e/60)+":00":(9>=e&&(e="0"+e),this.deadlineLabel.text="00:"+e)},e.getInstance=function(t,i){return e.instance?e.instance:new e(t,i)},i.createDurex=function(e,t,i){var a=this.createBitmapByName(t,i);a.x=Math.random()*this.stageWidth,a.y=Math.random()*(this.stageHeight-1e3);var n=new p2.Body({mass:100,position:[a.x/this.factor*10,(this.stageHeight-a.y)/this.factor],angle:.01*(180*Math.random()-360),velocity:[80*Math.random()-40,40*-Math.random()],angularVelocity:50*Math.random()-25,type:this.bodyType});n.addShape(new p2.Box({width:77/this.factor,height:215/this.factor})),n.userData=a,a.__body=n,a.addEventListener(egret.TouchEvent.TOUCH_TAP,e,{display:a,P2Scene:this}),a.touchEnabled=!0,this.world.addBody(n),this.container.addChild(a)},i.createGround=function(){var e=new p2.Plane({}),t=new p2.Body({mass:0,position:[0,-1e3]});t.addShape(e),this.world.addBody(t)},i.createBitmapByName=function(e,t){var i=new egret.Bitmap,a=RES.getRes(e);return i.texture=a,i.__textureName=e,t&&(i.__anotherTextureName=t),i},i.loop=function(){var t=0,i=this,a=function(){i.flag||(this.display.__body.userData=this.P2Scene.createBitmapByName(this.display.__anotherTextureName),this.P2Scene.container.removeChild(this.display),this.P2Scene.container.addChild(this.display.__body.userData),this.P2Scene.setScore(++e.score))},n=function(t){if(!i.flag){var a=e.world;a.step(t/1e3),egret.MainContext.instance.stage.stageHeight,a.bodies.length,a.bodies.forEach(function(t){var i=t.userData;i&&(i.x=t.position[0]*this.factor/10,i.y=e.stageHeight-t.position[1]*this.factor,i.rotation=t.angle)},this)}},s=egret.Ticker.getInstance();s.register(n,this);var r=new egret.Timer(200,5*e.TIME);r.addEventListener(egret.TimerEvent.TIMER,function(){var i=this.random(1,3);t++,t%5===0&&this.setDeadline(--e.deadline),this.createDurex(a,"tt"+i+"_png","xtt"+i+"_png")},this),r.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(){s.unregister(n,null),this.alert(e.score)},this),r.start()},i.random=function(e,t){var i=t-e,a=Math.random();return e+Math.round(a*i)},i.alert=function(e){var t=this;void 0===e&&(e=0),this.flag=!0;var i=new egret.DisplayObjectContainer;this.dialog=this.createBitmapByName("dialog_png"),i.addChild(this.dialog),this.dialog.x=27,this.dialog.y=370;var a=new egret.TextField;a.text="恭喜，您成功扎破了"+e+"个套";var n=new egret.TextField;n.text="让他们喜当爹",a.textAlign="center",n.textAlign="center",a.width=686,n.width=686,a.size=50,n.size=50,a.textColor=0,n.textColor=0,a.y=445,n.y=503,a.x=32,n.x=32,this.btn_queding=this.createBitmapByName("btn-queding_png"),this.btn_queding.y=616,this.btn_queding.x=136,i.addChild(this.btn_queding),this.btn_queding.touchEnabled=!0,this.btn_queding.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){TweenMax.to(i,1,{x:-1e3,y:-1e3,scale:0,opacity:0,rotation:-100,ease:Back.easeInOut,onComplete:function(){new P3Scene(P3Scene.scene,t.stage),P3Scene.scene.x=0,P3Scene.scene.y=0,P3Scene.scene.alpha=1,P3Scene.scene.rotation=0,TweenMax.from(P3Scene.scene,.8,{x:-100,y:-100,scale:.4,alpha:0,rotation:-100,ease:Back.easeInOut,yoyo:!0})}})}),i.addChild(a),i.addChild(n),this.scene.addChild(i),i.x=0,i.y=0,TweenMax.from(i,1,{y:100,alpha:0})},i.createScene=function(){var t=e.scene;t.removeChildren(),t.x=0,t.y=0;var i=this.createBitmapByName("bk-p2_png"),a=this.createBitmapByName("car_png"),n=new egret.Shape,s=[this.createBitmapByName("n3_png"),this.createBitmapByName("n2_png"),this.createBitmapByName("n1_png")],r=s[0],h=s[1],o=s[2];r.x=370,r.y=499,h.x=370,h.y=499,o.x=370,o.y=499,r.anchorOffsetX=43,r.anchorOffsetY=43,h.anchorOffsetX=43,h.anchorOffsetY=43,o.anchorOffsetX=43,o.anchorOffsetY=43,n.graphics.beginFill(0,1),n.graphics.drawRect(0,0,this.stage.width,this.stage.height),n.graphics.endFill(),t.addChild(i),t.addChild(a),t.addChild(n),t.addChild(r),t.addChild(h),t.addChild(o),this.stage.addChild(t),this.stage.setChildIndex(t,t.numChildren-3),this.car=a,this.mask=n,this.djs1=r,this.djs2=h,this.djs3=o},i.show=function(e){var t=this.scene,i=this.car,a=this.mask,n=this.djs1,s=this.djs2,r=this.djs3,h=new TimelineMax({onComplete:function(){e()}});t.anchorOffsetX=this.stage.width/2,t.anchorOffsetY=this.stage.height/2,h.fromTo(t,1,{x:0,y:0,alpha:.1,ease:Back.easeOut,scaleX:9,scaleY:9},{x:0,y:0,alpha:1,ease:Back.easeInOut,scaleX:9,scaleY:9}).fromTo(t,1,{scaleX:9,scaleY:9},{scaleX:1,scaleY:1,anchorOffsetX:0,anchorOffsetY:0}).fromTo(i,1,{x:-400,y:40},{x:0,y:0}).fromTo(a,.2,{alpha:0},{alpha:.7}).staggerFromTo([n,s,r],1,{alpha:0,scaleX:1.6,scaleY:1.6,ease:Power4.easeInOut},{alpha:1,scaleX:.6,scaleY:.6,ease:Power4.easeInOut,onComplete:function(){TweenMax.to(this.target,.2,{alpha:0,onComplete:function(){t.removeChild(this.target)}})}},1)},e.damping=.5,e.gravity=[0,-4],e.world=new p2.World({gravity:e.gravity}),e.scene=new egret.DisplayObjectContainer,e.score=0,e.TIME=30,e.deadline=e.TIME,e}();egret.registerClass(P2Scene,"P2Scene");var P3Scene=function(){function e(e,t){this.cst(e,t),this.init(),this.createView(),this.bindEvent()}var t=e,i=t.prototype;return e.getInstance=function(t,i){return e.instance?e.instance:new e(t,i)},i.cst=function(e,t){this.scene=e,this.stage=t,this.stageWidth=this.stage.stageWidth,this.stageHeight=this.stage.stageHeight},i.init=function(){this.stage.scaleMode=egret.StageScaleMode.EXACT_FIT,this.stage.addChild(this.scene)},i.createView=function(){var e=this.createBitmapByName("bk-sanshe_png"),t=this.createBitmapByName("bk-dian_png"),i=new egret.Shape;i.graphics.beginFill(16767502,1),i.graphics.drawRect(0,0,this.stageWidth,this.stageHeight),i.graphics.endFill(),this.scene.addChild(i),this.scene.addChild(e),this.scene.addChild(t);var a=this.createBitmapByName("xinzhi_png");this.scene.addChild(a),a.y=28,a.x=29;var n=this.createBitmapByName("icon-emao_png");this.scene.addChild(n),n.y=22,n.x=29,this.logo=n;var s=this.createBitmapByName("tts_png");this.scene.addChild(s),s.y=279,s.x=64;var r=this.createBitmapByName("xinfeng_png");this.scene.addChild(r),r.y=866,r.x=0;var h=this.createBitmapByName("btn-1_png");this.scene.addChild(h),h.y=940,h.x=64,this.btn1=h;var o=this.createBitmapByName("btn-2_png");this.scene.addChild(o),o.y=940,o.x=350,this.btn2=o;var d=this.createBitmapByName("btn-3_png");this.scene.addChild(d),d.y=1041,d.x=350,this.btn3=d;var c=this.createBitmapByName("shou--left_png");this.scene.addChild(c),c.y=963,c.x=0;var l=this.createBitmapByName("shou--right_png");this.scene.addChild(l),l.y=963,l.x=639},i.bindEvent=function(){this.btn1.touchEnabled=!0,this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){btn1()},this),this.btn2.touchEnabled=!0,this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){var e=this;this.stage.removeChildren(),this.stage.addChild(this.scene),P2Scene.deadline=P2Scene.TIME,P2Scene.scene=new egret.DisplayObjectContainer,new P2Scene(P2Scene.scene,this.stage),this.scene.x=0,this.scene.y=0,TweenMax.to(this.scene,.6,{y:0,x:0,rotation:100,alpha:0,onComplete:function(){return e.stage.removeChild(e.scene)},ease:Back.easeInOut})},this),this.btn3.touchEnabled=!0,this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){btn3()},this),this.logo.touchEnabled=!0,this.logo.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){window.location.href="http://m.emao.com"},this,!0)},i.createBitmapByName=function(e){var t=new egret.Bitmap,i=RES.getRes(e);return t.texture=i,t},e.scene=new egret.DisplayObjectContainer,e}();egret.registerClass(P3Scene,"P3Scene");