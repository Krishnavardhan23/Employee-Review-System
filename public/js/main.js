const btn = document.querySelector('.Loginbtn');
const closebtn = document.querySelector('.closebtn');

btn.addEventListener('click', () => {
    const pop = document.getElementById("popuppage");
    pop.classList.toggle("active");
});

closebtn.addEventListener('click', () => {
    const pop = document.getElementById("popuppage");
    pop.classList.toggle("active");
});

const signup = document.querySelector('.signup-btn');
signup.addEventListener('click', () => {
    window.location.href = 'index2.html'; 
});
