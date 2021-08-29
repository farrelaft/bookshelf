document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
    var checkBox = document.getElementById("inputBookIsComplete");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (checkBox.checked == true){
            addBook2();
          } else {
            addBook();
          }
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});


document.addEventListener("ondatasaved", () => {
console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
refreshDataFromBooks();
});

