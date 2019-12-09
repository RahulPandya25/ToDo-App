function addAllLists() {
    var allLists = document.getElementsByClassName('card')
    var lists = []
    for(var i=0; i < allLists.length; i++){
        //Card object 
    var list = {
            title : allLists[i].getElementsByClassName('title')[0].outerText,
            todoItems : [],
            completedItems : []
        }
        //ToDo Items
        var todoItemsList = allLists[i].getElementsByClassName('todo-items')
        var todoItemSets = todoItemsList[0].getElementsByClassName('item-set')
        for(var j=0; j < todoItemSets.length; j++){
            var todoItem = todoItemSets[j].outerText
            list.todoItems.push(todoItem)
        }
        //Completed Items
        var completedItemsList = allLists[i].getElementsByClassName('completed-items')
        var completedItemSets = completedItemsList[0].getElementsByClassName('item-set') 
        for(var k=0; k < completedItemSets.length; k++){
            var completedItem = completedItemSets[k].outerText
            list.completedItems.push(completedItem)
        }
        lists.push(list)
    }
    window.localStorage.setItem('Lists', JSON.stringify(lists))

}

addAllLists();
var list = window.localStorage.getItem('Lists')
console.log(list)