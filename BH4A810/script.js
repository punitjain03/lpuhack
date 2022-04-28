// alert('hey')
// alert('hey');
// let bodycss=document.getElementsByTagName("BODY")[0];
let registerpage=document.getElementById('registerpage');
let loginpage=document.getElementById('loginpage');
// let login_error=document.getElementById('login-error');
// let register_confirm=document.getElementById('register_confirm');

function getlogin(){
    loginpage.classList.add('show');
    registerpage.classList.remove('show');  
    bodycss.style.overflow="hidden";
    
    
}
function getloginback(){
    loginpage.classList.remove('showl');
    registerpage.classList.remove('showr');
    bodycss.style.removeProperty('overflow');
}

function getregister(){
    registerpage.classList.add('show');
    bodycss.style.overflow="hidden";
    loginpage.classList.remove('show');

}

function getregisterback(){
    loginpage.classList.remove('showl');
    registerpage.classList.remove('showr');
    bodycss.style.removeProperty('overflow');
}


function error_back(){
    login_error.classList.remove('show');

}

function register_confirm_back(){
    register_confirm.classList.remove('show');
}
