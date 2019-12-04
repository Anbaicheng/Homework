/**
 * Created by Administrator on 2016/9/17.
 */
/*
 * 需求：
 *    1、默认情况下，用户和电脑不停地出拳
 *    2、当玩家选择后，用户和电脑停止出拳了，电脑随机选择一个券，与玩家的拳比较，分出胜负
 * 分析：
 *  对象： 玩家   电脑(玩家和电脑都是player) 系统
 *  构造器： 玩家构造器
 *  玩家功能：出拳
 *  电脑功能： 出拳
 *  系统： 判断谁获胜
 * */
//玩家构造器
function Player(name) {
	//玩家的公有属性
	this.name = name;
	this.point = -1; // 0：石头；1：剪刀；2：布
}
Player.prototype = {
	takeBox: function() { //出拳方法,属于抽象的，不用实现的方法
	}
};

function Person(name) { //普通玩家
	Player.call(this, name); //调用父级构造器
}
Person.prototype = new Player();
Person.prototype.takeBox = function(point) { //普通玩家计算点数
	//自己选择一个出拳
	console.log("普通玩家的点数：" + point);
	this.point = point;
	return this.point;
};

function Machine(name) {
	Player.call(this, name); //调用父级构造器
}
Machine.prototype = new Player();
Machine.prototype.takeBox = function() {
	//电脑玩家的计算点数
	//随机出拳
	console.log("电脑计算点数：" + ((Math.random() * 100 << 2) % 3));
	this.point = ((Math.random() * 100 << 2) % 3); //得到0到2之间的数
	return this.point;
};

function BoxSystem(player, gameplayer) { //猜拳系统构造器,player：普通玩家；gameplayer电脑
	this.normalplayer = player;
	this.gameplayer = gameplayer;
	this.init();
}
BoxSystem.prototype = {
	//起名字
	init: function() {
		var playername = window.prompt("请输入您的名字：");
		this.normalplayer.name = playername;
		var names = document.getElementsByClassName("playname");
		names[0].innerText = this.normalplayer.name;
		names[1].innerText = this.gameplayer.name;

	},
	//动态更换图片
	startAnimate: function() {
		var players = document.getElementsByClassName("player");
		var _index = 0;
		this.intervalIndex = window.setInterval(function() {
			//每500ms将目标元素img的src替换
			players[0].src = "img/" + (_index++) % 3 + ".jpg";
			players[1].src = "img/" + (_index++) % 3 + ".jpg";
		}, 500);
	},
	//开始游戏
	play: function(targetObj) {
		//“开始游戏”按钮添加disabled的class
		this.toggleShow(document.getElementsByClassName("person")[0]);
		this.toggleBtn(targetObj, "disabled");
		//开始图片动画
		this.startAnimate();
		//改变文字
		this.showText(document.getElementById("box"), "请出拳······");
	},
	//切换开始按钮的状态
	toggleBtn: function(btnObj, className) {
		if (btnObj.className.indexOf(className) == -1) {
			btnObj.addClassName("disabled");
			btnObj.disabled = true; //禁用按钮
		} else {
			btnObj.removeClassName("disabled");
			console.log("恢复按钮啊");
			btnObj.disabled = false; //恢复按钮
		}
	},
	//显示结果或文本
	showText: function(targetObj, message) {
		targetObj.innerText = message;
	},
	//显示或隐藏元素
	toggleShow: function(targetObj) {
		if (!targetObj.style.display || targetObj.style.display == "none") {
			targetObj.style.display = "block";
		} else {
			targetObj.style.display = "none";
		}
	},
	//裁决胜负
	judge: function(point) {
		clearInterval(this.intervalIndex);
		this.toggleBtn(document.getElementById("begin"), "disabled");
		this.toggleShow(document.getElementsByClassName("person")[0]);
		var p1Point = this.normalplayer.takeBox(point);
		var p2Point = this.gameplayer.takeBox();
		var players = document.getElementsByClassName("player");
		//每500ms将目标元素img的src替换
		players[0].src = "images/" + p1Point + ".png";
		players[1].src = "images/" + p2Point + ".png";
		var differ = this.verdict(p1Point, p2Point);
		switch (differ) {
			case 1:
				this.showText(document.getElementById("box"), this.normalplayer.name + "赢");

				break;
			case -1:
				this.showText(document.getElementById("box"), this.gameplayer.name + "赢");
				break;
			default:
				this.showText(document.getElementById("box"), "平局!!!");
		}

	},
	//计算输赢的函数
	verdict: function(p1Point, p2Point) {
		var differ = p1Point - p2Point;
		console.log("differ:" + differ);
		if (differ == 0) {
			return 0;
		} else if (differ == -1 || differ == 2) { //玩家赢了
			return 1;
		} else {
			return -1; //电脑赢了
		}
	}
};

//为元素添加类(如有多要添加的类用空格隔开)
Element.prototype.addClassName = function(classs) {
	var oldClassName = this.className;
	var classAry = classs.split(" "),
		classAryLength = classAry.length,
		isSignleString = classAryLength > 1 ? false : true;
	//如果要添加的class只有一个
	if (isSignleString) {
		//如果原来的className里面已经存在了要添加的className则不添加。
		if (oldClassName.indexOf(classAry[0]) == -1) {
			this.className = oldClassName ? oldClassName + " " + classAry[0] : classAry[0];
		}
	} else { //如果添加的class有多个
		var classNameStr = oldClassName ? oldClassName + " " : "";
		for (var i = 0; i < classAryLength; i++) {
			if (oldClassName.indexOf(classAry[i]) == -1) {
				if (i == classAryLength - 1) {

					classNameStr += classAry[i];
				} else {
					classNameStr += classAry[i] + " ";
				}
			}
		}
		this.className = classNameStr;
	}
};
//移除class
Element.prototype.removeClassName = function(classs) {
	var oldClassName = this.className;
	//如果当前元素的className为空，则return;
	if (!this.className) {
		return;
	}
	var classAry = classs.split(" "),
		classAryLength = classAry.length;
	for (var i = 0; i < classAryLength; i++) {
		var curStrLength = classAry[i].length;
		/*
		 * 完整匹配一个字符串
		 * regClass: 匹配"ab"或" ab"或" ab "或"ab "但不匹配："abc"和"cab"
		 * \b匹配字符的边界
		 * */
		var regClass = new RegExp('(\\s*)\\b' + classAry[i] + '\\b\\s*', "g");
		console.log(oldClassName.match(regClass)); //全局匹配一个
		if (!regClass.test(oldClassName)) { //不存在就continue
			continue;
		} else {
			oldClassName = oldClassName.replace(regClass, " ");
		}
	}
	this.className = oldClassName;
};
window.οnlοad = function() {
	var p1 = new Person();
	var p2 = new Machine("电脑");
	var sys = new BoxSystem(p1, p2);
	var play = document.getElementById("begin");
	play.addEventListener("click", function() {
		sys.play(play)
	}, false);
	var chooses = document.getElementsByClassName("choose");
	var chooseLength = chooses.length;
	for (var i = 0; i < chooseLength; i++) {
		(function(j) {
			chooses[j].addEventListener("click", function() { //给三张图片绑定点击事件
				sys.judge(j);
			}, false);
		})(i)
	}
};
