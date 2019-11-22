
		  var app = angular.module("myapp",[]);
			app.controller("myctrl",function($scope){
				
				$scope.isdataShow=true;
				$scope.istableShow=true;
				$scope.ismessageShow=false;
				
				$scope.datas=[
				{id:001,name:"JavaScript实践",price:45,gnumber:1}, 
				{id:002,name:"PHP基础案例教程",price:49,gnumber:2}, 
				{id:003,name:"HTML+CSS网页制作",price:45,gnumber:3}, 
				{id:004,name:"Java入门基础",price:45,gnumber:1}];
				
				$scope.count=function(){
					var countPrice=0;
					for (var i = 0; i < $scope.datas.length; i++) {
						countPrice+=$scope.datas[i].price*$scope.datas[i].gnumber;
					}
					return countPrice;
				}
				
				$scope.deleteall=function(){
					$scope.datas=[];
					$scope.isdataShow=false;
					$scope.ismessageShow=true;
				}
				
				$scope.checkedall=function(){
					var ischeckbox=$("input[type='checkbox']");
					ischeckbox.each(function(){
						$(this).prop("checked",true);
					});
				}
				
				$scope.deleteone=function(Id){
					for (var i = 0; i < $scope.datas.length; i++) {
						if($scope.datas[i].id==Id)
						{
							$scope.datas.splice(i,1);
							break;
						}
					}
				}
				
				//判断数量,用ID作为参数
				$scope.reduce=function(Id){
					//遍历所有数据
					for (var i = 0; i < $scope.datas.length; i++) {
						//当发现符合参数的数据时进入
						if($scope.datas[i].id==Id)
						{
							//数量减一
							$scope.datas[i].gnumber--;
							//如果数量小于一时,弹窗提醒
							if($scope.datas[i].gnumber<1)
							{
								var c = confirm("确定删除该商品吗?");
								//确定删除
								if(c)
								{
									//执行删除
									$scope.datas.splice(i,1);
								}else{
									//否则还将数量重置为一
									$scope.datas[i].gnumber=1;
								}
							}
							break;
						}
					}
				}
				
				$scope.increase=function(Id){
					for (var i = 0; i < $scope.datas.length; i++) {
						if($scope.datas[i].id==Id)
						{
							$scope.datas[i].gnumber++;
							break;
						}
					}
				}
				
			});
