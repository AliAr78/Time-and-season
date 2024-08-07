const bodyTag = document.querySelector("body");
const themeSwitchBtn = document.getElementById("theme-switcher");
const addToDo = document.getElementById("add-btn");
const inputToDo = document.getElementById("addt");
const ul = document.getElementById("todo-list");
const clearAllchecked = document.getElementById("clear-completed");
const filter = document.getElementById("filter");

function main() {
  
    makeTodoElements(JSON.parse(localStorage.getItem("todos")));

    ul.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("card") && !e.target.classList.contains("daragging")) {
            const draggingCard = document.querySelector(".daragging");
            const cards = [...ul.querySelectorAll(".card")];
            const currentPos = cards.indexOf(draggingCard);
            const newPos = cards.indexOf(e.target);

            if (currentPos > newPos) {
                ul.insertBefore(draggingCard, e.target);
            } else {
                ul.insertBefore(draggingCard, e.target.nextSibling);
            }

            const todos = JSON.parse(localStorage.getItem("todos"));
            const removed = todos.splice(currentPos, 1);
            todos.splice(newPos, 0, removed[0]);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    });
}

function toggleTodo() {
    const container = document.getElementById('todo-container');
    const toggle = document.getElementById('toggle-btn');
    
    if (container.style.right === '0px') {
        container.style.right = '-350px';
        toggle.style.transform = 'translateY(-50%)';
    } else {
        container.style.right = '0px';
        toggle.style.transform = 'translateY(-50%) rotate(180deg)';
    }
}

document.getElementById('toggle-btn').addEventListener('click', toggleTodo);

addToDo.addEventListener("click", () => {
    const item = inputToDo.value.trim();
    if (item) {
        inputToDo.value = "";
        const todos = !localStorage.getItem("todos") ? [] : JSON.parse(localStorage.getItem("todos"));
        const currenttodos = { item: item, isComplet: false };
        todos.push(currenttodos);
        localStorage.setItem("todos", JSON.stringify(todos));
        makeTodoElements([currenttodos]);
    }
});

inputToDo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addToDo.click();
    }
});

filter.addEventListener("click", (e) => {
    const id = e.target.id;
    if (id) {
        document.querySelector(".on").classList.remove("on");
        document.getElementById(id).classList.add("on");
        document.getElementById("todo-list").className = `todos ${id}`;
    }
});

clearAllchecked.addEventListener("click", () => {
    const deleteIndexes = [];
    document.querySelectorAll(".card.checked").forEach((card) => {
        deleteIndexes.push([...document.querySelectorAll(".todos .card")].indexOf(card));
        card.classList.add("fall");
        card.addEventListener("animationend", () => {
            card.remove();
        });
    });
    removeCompletedTodos(deleteIndexes);
});

function removetodos(Index) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(Index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeCompletedTodos(indexes) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter((todo, index) => !indexes.includes(index));
    localStorage.setItem("todos", JSON.stringify(todos));
}

function stateTodo(index, isCompleted) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos[index].isComplet = isCompleted;
    localStorage.setItem("todos", JSON.stringify(todos));
}

function makeTodoElements(todoArray) {
    if (!todoArray) return;
    const itemLeft = document.getElementById('items-left');
    todoArray.forEach((todoObject) => {
        const card = document.createElement("li");
        const cbCon = document.createElement("div");
        const cbInput = document.createElement("input");
        const spanChek = document.createElement("span");
        const pItem = document.createElement("p");
        const btnClear = document.createElement("button");
        const img = document.createElement("img");

        card.classList.add("card");
        cbCon.classList.add("cb-container");
        cbInput.classList.add("cb-input");
        spanChek.classList.add("check");
        pItem.classList.add("item");
        btnClear.classList.add("clear");

        card.setAttribute("draggable", true);
        cbInput.setAttribute("type", "checkbox");
        img.setAttribute("src", "assets/images/clear it.svg");
        img.style.height = "20px";
        img.style.width = "20px";
        img.setAttribute("alt", "Clear it");

        if (todoObject.isComplet) {
            card.classList.add("checked");
            cbInput.setAttribute("checked", "checked");
        }

        pItem.textContent = todoObject.item;

        card.addEventListener("dragstart", () => {
            card.classList.add("daragging");
        });

        card.addEventListener("dragend", () => {
            card.classList.remove("daragging");
        });

        btnClear.addEventListener("click", () => {
            const currentCard = btnClear.parentElement;
            currentCard.classList.add("fall");
            const indexOfCurentCard = [...document.querySelectorAll(".todos .card")].indexOf(currentCard);
            removetodos(indexOfCurentCard);

            currentCard.addEventListener("animationend", () => {
                setTimeout(() => {
                    currentCard.remove();
                    itemLeft.textContent = document.querySelectorAll(".todos .card:not(.checked)").length;
                }, 100);
            });
        });

        cbInput.addEventListener("click", () => {
            const currentCard = cbInput.parentElement.parentElement;
            const checked = cbInput.checked;
            const currentCardIndex = [...document.querySelectorAll(".todos .card")].indexOf(currentCard);
            stateTodo(currentCardIndex, checked);

            checked ? currentCard.classList.add("checked") : currentCard.classList.remove("checked");
            itemLeft.textContent = document.querySelectorAll(".todos .card:not(.checked)").length;
        });

        btnClear.appendChild(img);
        cbCon.appendChild(cbInput);
        cbCon.appendChild(spanChek);
        card.appendChild(cbCon);
        card.appendChild(pItem);
        card.appendChild(btnClear);

        document.getElementById("todo-list").appendChild(card);
    });
    document.getElementById('items-left').textContent = document.querySelectorAll(".todos .card:not(.checked)").length;
}

document.addEventListener("DOMContentLoaded", main);








// 👋 Hi, I’m @AliAr78
// 👀 I’m interested in Front end development
// 🌱 I’m currently learning Js and React
// 💞️ I’m looking to collaborate on Web applications and Front end development
// 📫 How to reach me: ali.a.r.frontdev@gmail.com
