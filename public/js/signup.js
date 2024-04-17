let front=document.querySelector(".containerFront");
let back=document.querySelector(".containerBack");
let newUser=document.querySelector(".newUser");
let existingUser=document.querySelector(".existingUser");
newUser.addEventListener("click",flip);
existingUser.addEventListener("click",toflip);
function flip(){
    front.style.zIndex="1";
    back.style.zIndex="2";
    front.style.transform="rotateY(180deg)";
    back.style.transform="rotateY(0deg)";
    front.style.backfaceVisibility = "hidden";
}
function toflip(){
    front.style.zIndex="2";
    back.style.zIndex="1";
    front.style.transform="rotateY(0deg)";
    back.style.transform="rotateY(180deg)";

}


const eye=document.getElementById("togglePassword");
const input=document.getElementById("showPassword");
eye.addEventListener("click",show);

function show(){
    
    if(input.type==="password")
    {
        input.type="text";
    }
    else
    {
        input.type="password";
    }
}

const showCheckbox = document.getElementById("show");
const password = document.getElementById("password");
    
    showCheckbox.addEventListener("change", shown);
    
    function shown() {
        if (showCheckbox.checked) {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }

