// to get masonary layout using cocalde.js
var colc = new Colcade(".grid", {
  columns: ".grid-col",
  items: ".grid-item"
});

// Color Mode
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
  // document.getElementById("checkbox").checked = true;
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
  // document.getElementById("checkbox").checked = false;
};

if (darkMode === "enabled") {
  enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");

  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

var getCardId = function(event) {
  // get cardId of this item
  var card = event.path.filter(element => {
    return element.className === "grid-item card";
  });
  return card[0].id;
};

var removeThisItem = function(event) {
  // get itemset of this item
  var itemset = event.path.filter(element => {
    return element.className === "item-set";
  });
  // remove this item
  itemset[0].remove();
};

var completeThisItem = function(event) {
  // get itemset of this item
  var itemset = event.path.filter(element => {
    return element.className === "item-set";
  });
  // get the text to add to complete text
  var text = itemset[0].innerText;
  // remove this item
  itemset[0].remove();

  // html for completed item
  var html =
    '<div class="item-set">' +
    '<label class="label">' +
    text +
    "</label>" +
    '<div class="item-action">' +
    '<div class="cross"><i class="fa fa-times" onclick="removeThisItem(event)"></i></div>' +
    "</div>" +
    "</div>";

  // get completed element
  var cardId = getCardId(event);
  var completedItems = document
    .querySelector("#" + cardId)
    .querySelector(".completed-items");

  completedItems.insertAdjacentHTML("beforeend", html);
};

var addNewTodoItem = function(event) {
  var cardId = getCardId(event);

  // get itemset of this new item
  var itemset = event.path.filter(element => {
    return element.className === "item-set";
  });
  var input = itemset[0].children[0];
  var text = input.value; // input value;

  // html for todo item
  var html =
    '<div class="item-set">' +
    '<label class="label">' +
    text +
    "</label>" +
    '<div class="item-action">' +
    '<div class="tick"><i class="fa fa-check" onclick="completeThisItem(event)"></i></div>' +
    '<div class="cross"><i class="fa fa-times" onclick="removeThisItem(event)"></i></div>' +
    "</div>" +
    "</div>";
  var todoItems = document
    .querySelector("#" + cardId)
    .querySelector(".todo-items");
  todoItems.insertAdjacentHTML("beforeend", html);

  input.value = ""; // reset input value
};

var addNewTodoItemOnEnter = function(event) {
  if (event.which == 13 || event.keyCode == 13) {
    var cardId = getCardId(event);
    var text = event.target.value;
    // html for todo item
    var html =
      '<div class="item-set">' +
      '<label class="label">' +
      text +
      "</label>" +
      '<div class="item-action">' +
      '<div class="tick"><i class="fa fa-check" onclick="completeThisItem(event)"></i></div>' +
      '<div class="cross"><i class="fa fa-times" onclick="removeThisItem(event)"></i></div>' +
      "</div>" +
      "</div>";
    var todoItems = document
      .querySelector("#" + cardId)
      .querySelector(".todo-items");
    todoItems.insertAdjacentHTML("beforeend", html);

    event.target.value = ""; // reset input value
  }
};

var createElementFromString = function(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

var saveTitle = function(event) {
  var title = event.target.value;
  // save this title value to json
};

// Todo: get the ID first
var addNewCard = function() {
  var id = 10; //hardcoded for testing

  var html =
    '<div class="grid-item card" id="card-' +
    id +
    '">' +
    '<div class="title">' +
    '<input type="text" placeholder="Add Title" onfocusout="saveTitle(event)"/>' +
    "</div>" +
    '<div class="todo-items"></div>' +
    '<div class="new-item">' +
    '<div class="item-set" id="new-item-' +
    id +
    '">' +
    '<input type="text" placeholder="Add New Item" onkeypress="addNewTodoItemOnEnter(event)"/>' +
    '<div class="item-action">' +
    '<div class="plus"><i class="fa fa-plus" onclick="addNewTodoItem(event)"></i></div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="completed-items"></div>' +
    "</div>";

  var element = createElementFromString(html);
  colc.append(element);
};
