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
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
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
    '<div class="item-set"><label class="label">' +
    text +
    '</label><div class="item-action"><div class="cross"><i class="fa fa-times" onclick="removeThisItem(event)"></i></div></div></div>';

  // get completed element
  var cardId = getCardId(event);
  var completedItems = document
    .querySelector("#" + cardId)
    .querySelector(".completed-items");

  completedItems.insertAdjacentHTML("beforeend", html);
};
