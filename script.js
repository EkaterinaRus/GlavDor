const inputFile = document.querySelector(".file-uploads input[type=file]");
const inputFilebtn = document.querySelector(".prepayment__button");
const fileListContainer = inputFile.closest(".file-uploads").nextElementSibling;
let labelFileUploads = document.querySelector(".file-uploads__text");

let dt = new DataTransfer();
let uploadedFiles = [];

inputFile.addEventListener("change", function () {
    const currentFileCount = uploadedFiles.length;
    const newFileCount = this.files.length;

    if (currentFileCount + newFileCount > 3) {
        alert("Вы не можете загрузить более 3 файлов.");
        return;
    }

    for (let i = 0; i < this.files.length; i++) {
        const fileName = this.files.item(i).name;

        if (uploadedFiles.includes(fileName)) {
            alert(`Файл "${fileName}" уже загружен.`);
            continue;
        }

        uploadedFiles.push(fileName);

        const newFileItem = document.createElement("li");
        newFileItem.classList.add("file-list__item");

        const fileNameSpan = document.createElement("span");
        fileNameSpan.classList.add("file-list__name");
        fileNameSpan.textContent = fileName;

        const removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.classList.add("file-list__remove");

        const removeLinkImg = document.createElement("img");
        removeLinkImg.src = "./img/icon-remove.svg";
        removeLinkImg.alt = "Удалить";
        removeLinkImg.width = "10";
        removeLinkImg.height = "10";

        removeLink.appendChild(removeLinkImg);

        document.querySelector(".prepayment__button").style.marginTop = "-15px";

        removeLink.onclick = function (event) {
            event.preventDefault();
            removeFilesItem(newFileItem, fileName);
        };

        newFileItem.appendChild(fileNameSpan);
        newFileItem.appendChild(removeLink);
        fileListContainer.appendChild(newFileItem);

        dt.items.add(this.files.item(i)); 
    }

    inputFile.files = dt.files;

    updateFileCount(labelFileUploads);
});

function removeFilesItem(fileItem, fileName) {
    fileListContainer.removeChild(fileItem);

    uploadedFiles = uploadedFiles.filter((file) => file !== fileName);

    for (let i = 0; i < dt.items.length; i++) {
        if (fileName === dt.items[i].getAsFile().name) {
            dt.items.remove(i)
            break;
        }
    }

    inputFile.files = dt.files;

    const label = document.querySelector(".file-uploads__text");
    updateFileCount(label);
}

function updateFileCount(label) {
    const countFiles = uploadedFiles.length;

    if (countFiles > 0) {
        label.style.color = "#333333";
        label.innerText = "Загружено файлов: " + countFiles;
    } else {
        label.innerText = "Скан/фото разворота с фото, прописка";
        label.style.color = "#a7a7a7";
    }
}
