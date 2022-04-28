(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

function generateCV() {
    // document.getElementById('fname').innerHTML('fname')
    let nameField = document.getElementById("fname").value;
    document.getElementById("nm").innerHTML = nameField;

    let post = document.getElementById("post").value;
    document.getElementById("pst").innerHTML = post;

    let email = document.getElementById("email").value;
    document.getElementById("email1").innerHTML = email;


    let mob = document.getElementById("mob").value;
    document.getElementById("mob1").innerHTML = mob;

    let ctry = document.getElementById("country").value;
    document.getElementById("country1").innerHTML = ctry;

    let ed = document.getElementById("ed").value;
    document.getElementById("ed1").innerHTML = ed;

    // let 1 = document.getElementById("1").value;
    // document.getElementById("ed1").innerHTML = 1;

    let lang = document.getElementById("lang").value;
    document.getElementById("lang1").innerHTML = lang

    let des = document.getElementById("Description").value;
    document.getElementById("description1").innerHTML = des;

    let file = document.getElementById("imgField").files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader.result);
    //set the image to template
    reader.onloadend = function () {
        document.getElementById("imgTemplate").src = reader.result;
    };

};

