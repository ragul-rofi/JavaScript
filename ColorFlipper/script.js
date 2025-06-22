// get dom elements
// dom---> Document Object Model

const flipbtn = document.getElementById("btn");
const colorcode = document.getElementById("color-code");


// Function to genrate random background color
function getrandomhex(){
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + hex.padStart(6, 0);
}

// event listener for btn click
flipbtn.addEventListener("click",function(){
    const newColor = getrandomhex();
    document.body.style.backgroundColor = newColor;
    colorcode.textContent = newColor;
});