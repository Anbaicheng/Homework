
// <script type="text/javascript">
// $(function(){
//     var time = 300;
//     var timer = setInterval(function () {
//         time--;
//         var str = ("000"+time).slice(-3);
//         $(".codeTime span").text(function(i){return str[i];});
//         if (time==0) {
//             clearInterval(timer);
//             alert("时间到");
//         }
//     }, 1000);
// });
// </script>
function time(){
	document.getElementById("start").disabled = true;
		var start = 300,preDiff = 0;
		    var startTime = Date.now();
		    var t1 = setInterval(function(){
		        var tempTime = Date.now();
		        var diff = (tempTime - startTime)/1000 >> 0;
		        if(diff >= start){
		            clearInterval(t1);
		            show(0);
		            alert("时间到！");
		            return;
		        }
		        if(preDiff === diff) return;
		        preDiff = diff;
		        show(start - diff);
		    },1);
		    function show(n){
					
		        var hundredPalce = n/100 >> 0;
		        var tenPalce = (n - hundredPalce * 100)/10 >> 0;
		        var singlePalce = n%10;
		        var spans = document.querySelectorAll("span");
		        spans[0].innerHTML= hundredPalce;
		        spans[1].innerHTML = tenPalce;
		        spans[2].innerHTML = singlePalce;
		    }
	}
