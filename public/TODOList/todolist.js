let todo_input = document.querySelector(".todo_input");
let Add_todo = document.querySelector(".Add_todo");
let todo_items = document.querySelector(".todo_items");
let todo_date = document.querySelector(".todo_date");
let todolist = [
   
];

displaytodoitems();
Add_todo.addEventListener('click',()=>{
    addtodo();
    displaytodoitems();
})




function addtodo(){
    let input = todo_input.value; /*todoitem*/
    let dateinput = todo_date.value;  /*tododate*/

    console.log(input)
    todolist.push({item: input, dueDate: dateinput});
    todo_input.value = "";
    todo_date.value = ""
}
function displaytodoitems(){
    let todo_container = document.querySelector(".todo_container");

    
    
    let newHtml ='';

    
    for(let i = 0; i<todolist.length; i++){
        let item = todolist[i].item;
        let dueDate = todolist[i].dueDate;
        newHtml += `
        
            <span>${item}</span>
            <span>${dueDate}</span>
            <button onclick = "todolist.splice(${i},1);
            displaytodoitems();">Delete</button>
        `;
        
    }
    todo_container.innerHTML = newHtml;
    
}