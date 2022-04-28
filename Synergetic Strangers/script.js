window.onscroll =  function(){
    let value = window.scrollY;
    let triangle = document.getElementById("home-img");
    triangle.style.transform = "rotate(" + (window.pageYOffset/5) + "deg)";
    triangle.style.left = 575 - value*1.5 + 'px';
    triangle.style.top = -505 + value +'px';

};
let popup = document.getElementById("popup");

function funFactRandomiser(){
    alert('Reached Function... Retrieving fun facts about the Trio...');
}


function openPopup(id){
    popup.classList.add("open-popup");

    if (id=="gurjot"){
        document.getElementById("dp-img").src = "/images/gurjot1.JPG";
        document.getElementById("insta").href = "https://www.instagram.com/singhhgurjot/";
    
    }
    else if(id=="vedant"){
        document.getElementById("dp-img").src = "/images/vedant12.jpeg";
        document.getElementById("insta").href = "https://www.instagram.com/says_ved/";
    }
    else{
        document.getElementById("dp-img").src = "/images/rishi.jpg";
        document.getElementById("insta").href = "https://www.instagram.com/that_flutebox_guy/";
    }
}

function closePopup(id){
    popup.classList.remove("open-popup");

    if (id=="gurjot"){
        document.getElementById("name").innerHTML = "Gurjot Singh";

    }
}