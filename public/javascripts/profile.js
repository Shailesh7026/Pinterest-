
const editbtn = document.querySelector("#edit");
const fileInput = document.querySelector("#file-input");

editbtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
  document.querySelector("#file-form").submit();
});