const inputTask = document.getElementById("input-task");  // To store data of object having id input-task 
const taskList = document.getElementById("task-list");
const addButton = document.getElementById("add-btn");

console.log(inputTask); // only for styding purpose
console.log(taskList);
console.log(addButton);

addButton.addEventListener("click",function(event){
    event.preventDefault();   // Now form/page does not refreshes,so the debuggin part could be printed and not vanished by twice refreshing of page as using form   
    if(inputTask.value.trim()==="")  //  use trim as it deletes spaces before & after of any word/text
        { return; }  // E.g: string="   data   ";  trim will make -> string  = "data";  
    
    console.log("Button Clicked.");  // For debugging
    console.log(inputTask.value);
    
    const li = document.createElement("li");
    const span = document.createElement("span");
    const completeBtn = document.createElement("button");  // To make a complete Button to add in completed filter/to indicate that task is done 
    const deleteBtn = document.createElement("button"); 
    
    // li.textContent= inputTask.value;
// Used span rather than original direct li.textCon.. 
    span.textContent = inputTask.value;  // as here through span we can add emoji's type things too
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click",function(){  //After clicking on complete button completed class is assigned to it,THUS so that its styling/work can be done.
        li.classList.toggle("completed"); // toggle -> if class exits then removesit   
    });                                    //  if not then forms it  
    deleteBtn.textContent = "Delete";  
    deleteBtn.addEventListener("click",function(){
        li.remove();   //It del/removes the child(here li) 
    });

    taskList.appendChild(li);   // Adding list & others inside their parent(taskList or say ul)  
    li.appendChild(span); // This addition does not affects the html doc. but only works  
    li.appendChild(completeBtn); // in dynamic nature.
    li.appendChild(deleteBtn);
    inputTask.value = "";  // Due to use of preventDefault(), now page does not reloads so,
                        //  input bar still havewhat we wrote, so in order to del/vanish that text we use this ""

//    completeBtn.classList.add("complete-btn"); // To make class selectors to do styling in complete & delete btns without overlapping other buttons
//    deleteBtn.classList.add("delete-btn");  // same as <button class="delete-btn"> Delete </button>


});

console.log("print hello");  // debugging
