const inputTask = document.getElementById("input-task");  // To store data of object having id input-task 
const taskList = document.getElementById("task-list");
const addButton = document.getElementById("add-btn");

const allButton = document.getElementById("all-btn");
const activeButton = document.getElementById("active-btn");
const completedButton = document.getElementById("completed-btn");
let currentFilter = "all";

let tasks = [];    // Making array to store tasks at a place that user types in form
console.log(inputTask); // only for styding purpose
console.log(taskList);
console.log(addButton);

function renderTasks(){  // Func. to show rendering
    console.log("Rendering tasks....");
    let filteredTasks;
    if(currentFilter==="all"){   // To show all tasks
        filteredTasks = tasks;
    }

// filter() : It creates a new aray containing only the ele thats satisfy a cond.n
// filter() doesn't know your cond.n beforehand. You give it a callback func.n, Means a func.n inside a func.n,
//  & filter() supplies each array ele to that func. as the 'task' parameter
// This task parametr can be changed as its just a name like x, item etc.
    else if(currentFilter==="active"){   // To show all active tasks, means which are not comleted yet                                      
        filteredTasks = tasks.filter(function(task){
            return task.completed===false;
        });
    }
    else{
        filteredTasks = tasks.filter(function(task){  // To show all completed tasks
            return task.completed===true;
        });
    }
    console.log(filteredTasks);  // debugging
// Implementing the rendering output in UI(frontend/Page) :     
    taskList.innerHTML="";  // In HTML docu. make everything inside the taskList(our ul) empty  
// Making whole list,buttons after the rendering is done as this is more effective way,
//  as now we are completing rendering + UI Task Filter updation both at same time   

    filteredTasks.forEach(function(task){  // Run this code once for every ele in tasks array(i.e. our whole inupt tasks)
        const li = document.createElement("li");  // To make list tag(object in js) dynamically to work on it 
        if(task.completed){  // To get the original css of completed here too as we are deleting the original whole data of li during rendering
            li.classList.add("completed");
        }
        const span = document.createElement("span");
        const completeBtn = document.createElement("button");  // To make a complete Button to add in completed filter/to indicate that task is done 
        const deleteBtn = document.createElement("button"); 
    
        // li.textContent= inputTask.value;
// Used span rather than original direct li.textCon.. 
//    span.textContent = inputTask.value;  // as here through span we can add emoji's type things too
    span.textContent = task.text;  // Now we are rendering task

    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click",function(){  //After clicking on complete button completed class is assigned to it,THUS so that its styling/work can be done.  
        task.completed = !task.completed;  // To change isCompleted/NotCompleted when we tap on complete button
        li.classList.toggle("completed",task.completed); // toggle -> if class exits then removes it & vice-versa   
        renderTasks();     // To change the data accordingly that fits under complete filter  
    });                                  
    
    deleteBtn.textContent = "Delete";  
    // deleteBtn.addEventListener("click",function(){
    //     li.remove();   //It del/removes the child(here li) 
    // });

    taskList.appendChild(li);   // Adding list & others inside their parent(taskList or say ul)  
    li.appendChild(span); // This addition does not affects the html doc. but only works  
    li.appendChild(completeBtn); // in dynamic nature.
    li.appendChild(deleteBtn);    
    });
}

addButton.addEventListener("click",function(event){
    event.preventDefault();   // Now form/page does not refreshes,so the debuggin part could be printed and not vanished by twice refreshing of page as using form   
    if(inputTask.value.trim()==="")  //  use trim as it deletes spaces before & after of any word/text
        { return; }  // E.g: string="   data   ";  trim will make -> string  = "data";  
        
    const task = {    // Initializing the value type of task object
        text: inputTask.value,
        completed: false
    };

    tasks.push(task);   // Adding Task(user filled by form) through task object(above) in task array

    console.log("Button Clicked.");  // For debugging
    console.log(inputTask.value);

    const li = document.createElement("li");  // To make list tag(object in js) dynamically to work on it 
    const span = document.createElement("span");
    const completeBtn = document.createElement("button");  // To make a complete Button to add in completed filter/to indicate that task is done 
    const deleteBtn = document.createElement("button"); 
    
    // li.textContent= inputTask.value;
// Used span rather than original direct li.textCon.. 
    span.textContent = inputTask.value;  // as here through span we can add emoji's type things too
    
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click",function(){  //After clicking on complete button completed class is assigned to it,THUS so that its styling/work can be done.  
        task.completed = !task.completed;  // To change isCompleted/NotCompleted when we tap on complete button
        li.classList.toggle("completed",task.completed); // toggle -> if class exits then removesit   
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

allButton.addEventListener("click", function(){
    currentFilter = "all";
    renderTasks();
});
activeButton.addEventListener("click", function(){
    currentFilter = "active";
    renderTasks();
});
completedButton.addEventListener("click", function(){
    currentFilter = "completed";
    renderTasks();
});

console.log("print hello");  // debugging
