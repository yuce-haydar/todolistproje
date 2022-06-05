// elementleri secme 
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstcardbody = document.querySelectorAll(".card-body")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearbutton = document.querySelector("#clear-todos");

eventlisteners();

function eventlisteners() {
    form.addEventListener("submit", addtodo);
    document.addEventListener("DOMContentLoaded", loadtodostoui);
    secondcardbody.addEventListener("click", deletetotodo);
    filter.addEventListener("keyup", filtertodos);
    clearbutton.addEventListener("click", removealltodos);
}
function removealltodos(e) {
    if (confirm("BUTUN TodolaRI SILMEK ISTEDIGINIZE EMIN MISINIZ?")) {
        while (todolist.firstElementChild != null) {
            todolist.removeChild(todolist.firstElementChild);


        }
        localStorage.removeItem("todos");
    }
}
function deletetotodo(e) {// silme fonksiyonu
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deletetotodofromstorage(e.target.parentElement.parentElement.textContent);
        showalert("succses", "basariyla silindi");
    }




}
function deletetotodofromstorage(deletetotodote) {
    let todos = gettodosfromstorrage();
    todos.forEach(function (todo, index) {
        if (todo === deletetotodote) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function filtertodos(e) {
    const filtervalue = e.target.value.toLowerCase();
    const listitems = document.querySelectorAll(".list-group-item");

    listitems.forEach(function (item) {
        const text = item.textContent.toLowerCase();
        if (text.indexOf(filtervalue) === -1) {
            item.setAttribute("style", "display:none !important");
        }
        else {
            item.setAttribute("style", "display:block");
        }

    });



}

function addtodo(e) {// todo ekleme fonksiyonu 


    const newtodo = todoInput.value.trim();
    if (newtodo === "") {

        showalert("danger", "lutfen bir todo giriniz");

    }
    else {

        addTodoUI(newtodo);
        addtodotostorage(newtodo);
        showalert("primary", "basariyla eklendi sayin hazretleri");

    }




    e.preventDefault();

}

function loadtodostoui() {// sayfa yuklendiginde todolari localstorageden cekme 
    let todos = gettodosfromstorrage();
    todos.forEach(function (todo) {
        addTodoUI(todo);
    });






}
function gettodosfromstorrage() {// todolari localstoreden cekme fonksiyonu
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];


    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));



    }
    return todos;
}



function addtodotostorage(newtodo) {//local store todo ekleme fonksiyonu


    let todos = gettodosfromstorrage();
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos));



}
function showalert(type, message) {
    /*
                    <div class="" role="alert">
                        A simple primary alert—check it out!
                    </div>
    */
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstcardbody.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 1000);



}



function addTodoUI(newtodo) {//inputtan aldigimiz newtodo degerini  list item olarak ui kismina ekleyecek fonksiyon
    /*
    <li class="list-group-item d-flex justify-content-between">
                                Todo 1
                                <a href = "#" class ="delete-item">
                                    <i class = "fa fa-remove"></i>
                                </a>
    
                            </li>
    */

    const listitem = document.createElement("li");
    //link ekleme 
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listitem.className = "list-group-item d-flex justify-content-between";

    // text node ekleme 
    listitem.appendChild(document.createTextNode(newtodo));
    listitem.appendChild(link);

    // todo liste list item ekleme yani ul kismina li ekleme
    todolist.appendChild(listitem);



}