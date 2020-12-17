function login() {
 
    var username = document.getElementById("username");
    var pass = document.getElementById("password");
    var vcode = document.getElementById("vcode");
 
    if (username.value == "") {
 
        alert("请输入用户名");
 
    } else if (pass.value  == "") {
 
        alert("请输入密码");
 
    } else if (vcode.value  == "") {
 
        alert("请输入密码");
    }
    else if(username.value == "admin" && pass.value == "123456"){
 
        window.location.href="login.html";
 
    } else {
 
        alert("请输入正确的用户名和密码！")
 
    }
}//点击验证码图片
function changeImg() {
    //需要让每次请求的url都发生变化。否则服务器会认为访问的是同一张图片，就不会刷新请求了
    document.getElementById("vcodeImg").src = "createVerifyImage.do?t=" + Math.random();
}