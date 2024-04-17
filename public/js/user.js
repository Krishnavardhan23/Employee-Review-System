function openSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const fas = document.querySelector(".fas");
    fas.style.visibility = "hidden";
    sidebar.style.visibility = "visible";
    sidebar.style.transition = "ease-in-out";
}

function hideSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const fas = document.querySelector(".fas");
    fas.style.visibility = "visible";
    sidebar.style.visibility = "hidden";
}

const icon = document.querySelector(".fas");
icon.addEventListener("click", openSidebar);

const backbutton = document.querySelector(".back-button");
backbutton.addEventListener("click", hideSidebar);

// function showTask(index) {
//     const popup = document.querySelector(`.popup${index}`);
//     popup.style.display = popup.style.display == "none" ? "block" : "none";
// }
