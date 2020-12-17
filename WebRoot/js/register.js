

var userT=false;
var nameT=false;
var passwordT=false;
var mailT=false;
var proT=false;


function checkEmail(){
   
    var str = $("#E-mail").val(); 
    var pattern = /[\w]*[@][\w]*[\.][com|net|gov]/;
    if(str.length==0){
        document.getElementById("E-mailInfo").innerText="请输入邮箱";
    }else{
        if(pattern.test(str)) {
            	mailT=true;
                document.getElementById("E-mailInfo").innerText="鐢靛瓙閭欢鍦板潃鍚堟硶";
        } else {
        	mailT=false;
            document.getElementById("E-mailInfo").innerText="鐢靛瓙閭欢鍦板潃闈炴硶";
        }
    }
    
    
}
function checkRegister(){
    
    
        var userName=document.getElementById("userName").value;
        var flag="0";
        $.ajax({
            type: "post",
            url: "ajaxRegisterCheck.do",
            contentType:"application/x-www-form-urlencoded;charset=utf-8",
            data: {"userName":userName,"flag":flag},
            dataType: "text",
            success: function (response) {
            	console.log(response.code+"console.log****************************"); 
                if(response.code==0){
                	userT=true;
                	console.log("console.log12324"); 
                }
                else{
                	userT=false;
                	console.log(response); 
                }
                console.log(response.code+"(("+response.info);
                document.getElementById("userNameInfo").innerText=response.info;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	 alert(XMLHttpRequest.status);
            	 alert(XMLHttpRequest.readyState);
            	 alert(textStatus);
            }
            
        });
    
    
}
function checkUsername(){
    var str = $("#userName").val(); 
    var pattern = /^[a-zA_Z][a-zA-Z0-9]{4,15}$/;
    console.log(str); 
    if(str.length==0){
        document.getElementById("userNameInfo").innerText="请输入用户名";
    }else{
        if(pattern.test(str)) {
        	checkRegister();
        } else {
            document.getElementById("userNameInfo").innerText="鐢ㄦ埛鍚嶅彧鑳戒娇鐢ㄨ嫳鏂囧瓧姣嶅拰鏁板瓧锛屼互瀛楁瘝寮�ご锛岄暱搴︿负4鍒�5涓瓧绗�";
            userT=false;
        }
    }
    
    
}
function checkName(){
    
    var str = $("#name").val(); 
    var pattern = /^[\u4e00-\u9fa5]{2,4}$/;
    if(str.length==0){
        document.getElementById("nameInfo").innerText="请输入真实姓名";
    }else{
        if(pattern.test(str)) {
            
            document.getElementById("nameInfo").innerText="";
            nameT=true;
        } else {
        	nameT=false;
        	document.getElementById("nameInfo").innerText="鐪熷疄濮撳悕鍙兘鏄�-4闀垮害鐨勪腑鏂�";
        }
    }
    
    
}

function checkPassword(){
    
    var str = $("#password").val(); 
    var pattern =/^{.{4,}$/;
    if(str.length==0){
        document.getElementById("passwordInfo").innerText="请输入密码";
    }else{
        if(pattern.test(str)) {
        	document.getElementById("passwordInfo").innerText="瀵嗙爜鏈�皬闀垮害涓�";
        	
        } else {
        	document.getElementById("passwordInfo").innerText="";
            
        }
    }
    
    
}

function recheckedPassword(){
    
    var str1 = $("#checkedPassword").val(); 
    var str2 = $("#password").val();
    
    
    if(str1!=str2||str1.length<4){
    	passwordT=false;
    	document.getElementById("checkedPasswordInfo").innerText="再次输入密码";
    }
        
    else {
        document.getElementById("checkedPasswordInfo").innerText="";
        passwordT=true;
    }
    
}






function fillProvince(){
    $.ajax({
        type: "post",
        url: "queryProvinceCity.do",
        data: {},
        dataType: "json",
        success: function (response) {
            var provinceElement=document.getElementById("province");
            console.log("console.log");
            // 锟斤拷锟絪elect锟斤拷锟斤拷锟斤拷option
            provinceElement.options.length=0;
            // 锟斤拷锟斤拷一锟斤拷选锟斤拷
            provinceElement.add(new Option("璇烽�鎷╃渷浠�,"));
            // 循锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷选锟斤拷
            for(var index=0;index<response.length;index++){
                provinceElement.add(new Option(response[index].provinceName,response[index].provinceCode));
            }
        }
    });
}
function register(){
	console.log(userT); 
	console.log(nameT); 
	console.log(passwordT); 
	console.log(mailT); 
	console.log(proT); 
    if(userT&&nameT&&passwordT&&mailT&&proT){
        var userName=document.getElementById("userName").value;
        var password=document.getElementById("password").value;
        var name=document.getElementById("name").value;
        var flag="1";
        $.ajax({
            type: "post",
            url: "ajaxRegisterCheck.do",
            data: {"userName":userName,"password":password,"name":name,"flag":flag},
            dataType: "json",
            success: function (response) {
                if(response.register==0){
                	console.log("娉ㄥ唽鎴愬姛"); 
                	window.location.href="login.html";
                }
                console.log(response.register); 
                console.log("娉ㄥ唽澶辫触"); 
                    
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
           	 alert(XMLHttpRequest.status);
           	 alert(XMLHttpRequest.readyState);
           	 alert(textStatus);
           }
        });
    }else{
    	
    }
    
}


$(document).ready(function(f){
//    alert("alert");
	fillProvince();
    $("#province").change(function(e){
        $("#city").empty();
        $("#city").append($("<option>").val("").text("璇烽�鎷╁煄甯�"));
        if($(this).val()==""){
            $("#provinceError").css("color","#c00202");
            $("#provinceError").text("鐪佷唤涓嶈兘涓虹┖");
            return;
        }
        province_correct=true;
        proT=true;
        $("#provinceError").text("");
        var provinceCode=$("#province").val();
        $.ajax({
            type: "post",
            url: "queryProvinceCity.do",
            data: {provinceCode:provinceCode},
            dataType: "json",
            success: function (response) {
                for(var index=0;index<response.length;index++){
                    var option =$("<option>").val(response[index].cityCode).text(response[index].cityName);
                    $("#city").append(option);
                }
            }
        });
    });
});
