

const searchElem = document.querySelector(".search");
const searchDiv = document.querySelector(".search-div");
const searchInput = document.querySelector("#search-input");
const navbar = document.querySelector("nav");
const dropDown = document.querySelector("#drop-down-symbol");
const dropDownDiv = document.querySelector(".drop-down-div");

document.addEventListener("click", (event) => {
  if (
    event.target == searchDiv ||
    event.target == searchElem ||
    searchDiv.contains(event.target) ||
    searchElem.contains(event.target)
  ) {
    searchDiv.style.display = "block";
    searchInput.focus();
    dropDownDiv.style.display = "none";
  } else if (event.target == dropDown) {
    console.log(event.target);
    dropDownDiv.style.display = "block";
    searchDiv.style.display = "none";
    console.log(dropDownDiv.style.display);
  } else {
    if (dropDownDiv.style.display == "block") {
      dropDownDiv.style.display = "none";
    }
    if (searchDiv.style.display == "block") {
      searchDiv.style.display = "none";
    }
  }
});



//this is for change the active link style 
const links = document.querySelectorAll(".link");

// Get current URL 
const currentURL = window.location.href; 

links.forEach(link => {
  // Get link URL
  const linkURL = link.href;
  
  // Check if link URL matches current URL
  if(linkURL == currentURL) {
    link.classList.add("active");
  }
});
