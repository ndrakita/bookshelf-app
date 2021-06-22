document.addEventListener("DOMContentLoaded", function () {

    const submitForm /* HTMLFormElement */ = document.getElementById("form");
    const checkbox = document.getElementById("inputBookIsComplete");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (checkbox.checked) {
            addToRead();
        }
        else {
            addToReadnt();
        }
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});
