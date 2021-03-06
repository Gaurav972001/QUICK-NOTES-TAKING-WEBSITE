showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTitle=document.getElementById('addTitle');
    let title=localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }
    titleObj.push(addTitle.value);
    localStorage.setItem("title", JSON.stringify(titleObj));
    addTitle.value = "";

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
});

function showNotes() {
    let title = localStorage.getItem("title");
    if (title == null) {
        titelObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
         <div class="card-body">
             <h5 class="card-title">${titleObj[index]}</h5>
             <p class="card-text">${element}</p>
             <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" >Delete note</button>
             </div>
        </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h2 style="text-align:center; color:red">You haven't added any notes yet</h3>`;
        notesElm.innerHTML
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

let clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", function (e) {
    localStorage.clear();
    let notesElm = document.getElementById("notes");
    notesElm.innerHTML = `<h2 style="text-align:center; color:red">You haven't added any notes yet</h3>`;
});

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
    // console.log(search.value);
});
