const inputTask = document.getElementById("input-task");  // To store data of object having id input-task 
const taskList = document.getElementById("task-list");
const addButton = document.getElementById("add-btn");

const allButton = document.getElementById("all-btn");
const activeButton = document.getElementById("active-btn");
const completedButton = document.getElementById("completed-btn");
let currentFilter = "all";

const clearCompletedButton = document.getElementById("clear-completed-btn");
const taskCount = document.getElementById("task-Count");

let tasks = [];    // Making array to store tasks at a place that user types in form
console.log(inputTask); // only for styding purpose/ debugging
console.log(taskList);
console.log(addButton);

// IMPLEMENTING LOCAL STORAGE FEATURE
function saveTasks(){   // To save all the tasks in localStorage
    // SYNTAX:     localStorage.setItem(key, value);
// We took our tasks as the key and their info as their value
// E.g: DSA(task/key): id,text,completed(values of DSA)

// PROBLEM : In localStorage stores data as strings,
//  THUS changed our js tasks array(here, value) to string by JSON.stringfy(tasks), here tasks will fetch it's value 
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks(){  // To load all saved Tasks in page after refreshing
    const savedTasks = localStorage.getItem("tasks");  // Saving/Storing the saved tasks in a var.
    if(savedTasks){ // if savedTasks(the saved task is not empty, means have some value for it)
        tasks = JSON.parse(savedTasks);  // rewrite/add that task to tasks(array)
        // JSON.parse converts the stored JSON string back into usable js data(its original form)
    }
}

// MAIN WORKING OF TASK FILTER LOGIC, DISPLAYING THEM(TASKS) ON PAGE
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
        
        completeBtn.classList.add("complete-btn");  // Making clasess for applying css on them
        deleteBtn.classList.add("delete-btn");

        // li.textContent= inputTask.value;
// Used span rather than original direct li.textCon.. 
//    span.textContent = inputTask.value;  // as here through span we can add emoji's type things too
    span.textContent = task.text;  // Now we are rendering task

    // completeBtn.textContent = "Complete";
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; // This was correct, but it was plain text only but we wanted with icons too
    completeBtn.setAttribute("aria-label", "Mark Task as Complete");  // Thus used this 

    completeBtn.addEventListener("click",function(){  //After clicking on complete button completed class is assigned to it,THUS so that its styling/work can be done.  
        task.completed = !task.completed;  // To change isCompleted/NotCompleted when we tap on complete button
        li.classList.toggle("completed",task.completed); // toggle -> if class exists then removes it & vice-versa   
        saveTasks();   // To save the changed data/tasks in local storage
        renderTasks();     // To change the data accordingly that fits under complete filter  
    });                                  
    
    // deleteBtn.textContent = "Delete";  
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';  
    deleteBtn.setAttribute("aria-label", "Delete Task");

    // deleteBtn.addEventListener("click",function(){
    //     li.remove();   //It del/removes the child(here li) 
    // });
    deleteBtn.addEventListener("click", function(){
        tasks = tasks.filter(function(item){
            return item.id!==task.id;  // To find the exact task that we marked as delete to not include in task array
        });
        saveTasks();
        renderTasks();   // To rebuild the task array again with now new data(after deleted ele)
    });

//  TASK COUNT IMPLEMENTATION :     
    let count = 0;
    for(let i=0; i<tasks.length; i++)
        {if(tasks[i].completed===false)
            {count++;
            }
        }
    taskCount.textContent = "Task Count : " + count;

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
        
    const task = {    // Initializing the type of value of task object/array
        id: Date.now(),   // Date.now() gives the real time in hour->min->sec with no gap, decimal(.)
        text: inputTask.value,
        completed: false,
    };

    tasks.push(task);   // Adding Task(user filled by form) through task object(above) in task array

    saveTasks();       // To save the tasks in local storage, thus they won't vanish on page refreshing

    console.log("Button Clicked.");  // For debugging
    console.log(inputTask.value);

//     const li = document.createElement("li");  // To make list tag(object in js) dynamically to work on it 
//     const span = document.createElement("span");
//     const completeBtn = document.createElement("button");  // To make a complete Button to add in completed filter/to indicate that task is done 
//     const deleteBtn = document.createElement("button"); 
    
//     // li.textContent= inputTask.value;
// // Used span rather than original direct li.textCon.. 
//     span.textContent = inputTask.value;  // as here through span we can add emoji's type things too
    
//     completeBtn.textContent = "Complete";
//     completeBtn.addEventListener("click",function(){  //After clicking on complete button completed class is assigned to it,THUS so that its styling/work can be done.  
//         task.completed = !task.completed;  // To change isCompleted/NotCompleted when we tap on complete button
//         li.classList.toggle("completed",task.completed); // toggle -> if class exits then removesit   
//     });                                    //  if not then forms it  
    
//     deleteBtn.textContent = "Delete";  
//     deleteBtn.addEventListener("click",function(){
//         li.remove();   //It del/removes the child(here li) 
//     });

//     taskList.appendChild(li);   // Adding list & others inside their parent(taskList or say ul)  
//     li.appendChild(span); // This addition does not affects the html doc. but only works  
//     li.appendChild(completeBtn); // in dynamic nature.
//     li.appendChild(deleteBtn);
    
    inputTask.value = "";  // Due to use of preventDefault(), now page does not reloads so,
                        //  input bar still havewhat we wrote, so in order to del/vanish that text we use this ""

//    completeBtn.classList.add("complete-btn"); // To make class selectors to do styling in complete & delete btns without overlapping other buttons
//    deleteBtn.classList.add("delete-btn");  // same as <button class="delete-btn"> Delete </button>
    renderTasks();

});

function updateActiveFilter(button)
{   allButton.classList.remove("active-filter");
    activeButton.classList.remove("active-filter");
    completedButton.classList.remove("active-filter");
    button.classList.add("active-filter");
}


// TASK FILTERS IMPLEMENTATION : 
allButton.addEventListener("click", function(){
    currentFilter = "all";
    updateActiveFilter(allButton);   // This is used to determine to js/code that this btn is currently selected/opted
    renderTasks();  // To rewrite/align tasks according to task filter    
});
activeButton.addEventListener("click", function(){
    currentFilter = "active";
    updateActiveFilter(activeButton);
    renderTasks();
});
completedButton.addEventListener("click", function(){
    currentFilter = "completed";
    updateActiveFilter(completedButton);
    renderTasks();
});

// CLEAR COMPLETED BUTTON IMPLEMENTATION :    
clearCompletedButton.addEventListener("click", function(){
    tasks = tasks.filter(function(task){   // To delete/remove all completed tasks at once       
        return task.completed === false;
    });
    saveTasks();
    renderTasks();  // To make new task list with new tasks array made above
});

// LOCAL STORAGE IMPLEMENTATION PART :
loadTasks();   // Did it here, as after all the tasks are saved properly for each task changing events/filters
renderTasks();  // To render all the new Loaded Tasks in tasks(array) to screen/page

console.log("print hello");  // debugging
