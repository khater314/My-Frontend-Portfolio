let ToDoList =
{
    Tasks: [],
    SaveTask: () =>
    {
        
        let taskName = document.getElementById('task-name');
        let priority = document.getElementById('priority');
        let reminderDate = document.getElementById('due-date');
        let description = document.getElementById('description');
        let Task =
        {
            TaskId: ToDoList.GeneratId(),
            TaskName: taskName.value,
            Priority: priority.value,
            ReminderDate: reminderDate.value,
            Description: description.value,
            IsComplete: false,
        }
        ToDoList.Tasks.push(Task);
        console.log(ToDoList.Tasks);
        ToDoList.SaveInStorage();
        ToDoList.ShowTask();
    },
    ShowTask: () =>
    {
        ToDoList.SaveInStorage();
        let SavedArray = ToDoList.GetDataFromStorage();
        let container = document.getElementById('todo-list');
        container.innerHTML = '';
        let newTask = ``
        // console.log("Hello: "+ ToDoList.Tasks)
        SavedArray.forEach(function (task, index) {
            let completedClass = task.IsComplete ? 'completed' : '';
            newTask =
                `
                    <li class="task ${completedClass}" id="task">
                        <div class="task-details">
                            <h4 class="task-name">${task.TaskName}</h4>
                            <p class="task-info">
                                <span class="priority ${task.Priority}">${task.Priority}</span> | 
                                <span class="date"><i class="fas fa-calendar-alt"></i> ${task.ReminderDate}</span>
                            </p>
                            <p class="task-description">${task.Description}</p>
                        </div>
                        <div class="task-actions">
                            <button class="complete-btn" id="checked" onclick="ToDoList.IsCompleted(this, ${task.TaskId})"><i class="fas fa-check-circle"></i></button>
                            <button class="delete-btn" onclick="ToDoList.RemoveTask(this, ${task.TaskId})"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </li>
                `
            container.innerHTML += newTask;
        })
        },

    SaveInStorage: () => {
        localStorage.setItem("Tasks", JSON.stringify(ToDoList.Tasks))
        console.log("saved")
    },
    GetDataFromStorage: () =>
    {
        let SavedArray = localStorage.getItem("Tasks");
        if (SavedArray === null) {return [];}
        ToDoList.Tasks = JSON.parse(SavedArray);
        return ToDoList.Tasks;
    },
    ReamoveFromStorage: () =>
        localStorage.removeItem("Tasks"),

    GeneratId: () =>
    {
        if (ToDoList.Tasks.length === 0)
            return 1;
        else
            return ToDoList.Tasks[ToDoList.Tasks.length - 1].TaskId + 1;
    },
    // RemoveTask: (element, id) =>
    // {
    //     console.log('id: '+id)
    //     console.log("element: " + element)
    //     console.log(ToDoList.Tasks)
    //     ToDoList.Tasks.forEach(function (t /*task*/, i /*index*/) {
    //         if (t.TaskId === id)
    //         {
    //             ToDoList.Tasks.splice(i, 1);
    //             ToDoList.SaveInStorage();
    //             element.parentNode.parentNode.remove();
    //             ToDoList.ShowTask();
    //             return;
    //         }
    //     })
    // },
    RemoveTask: (element, id) => {
        ToDoList.Tasks = ToDoList.Tasks.filter(task => task.TaskId !== id);
        ToDoList.SaveInStorage();
        ToDoList.ShowTask();
    },
    IsCompleted: (element, id) => {
        const index = ToDoList.Tasks.findIndex(task => task.TaskId === id);
        if (index > -1)
        {
            ToDoList.Tasks[index].IsComplete = !ToDoList.Tasks[index].IsComplete;
            ToDoList.SaveInStorage();
            ToDoList.ShowTask();
        }
    },
    // IsCompleted: (element, id) => {
    //     ToDoList.Tasks.forEach(function (t /*task*/, i /*index*/) {
    //         if (t.TaskId === id) {
    //             console.log(111)
    //             let complete = document.getElementById('task');
    //             console.log(complete)
    //             element.parentNode.parentNode.className = "task completed";
    //             element.complete.className = "task completed";
    //             ToDoList.SaveInStorage();
    //             ToDoList.ShowTask();
    //         }
    //     })
    // },
    Initialize: () => {
        ToDoList.GetDataFromStorage();
        ToDoList.ShowTask();
    }
}

const mybtn = document.getElementById("add-task-btn");
mybtn.addEventListener('click', ToDoList.SaveTask);
mybtn.addEventListener('click', ToDoList.ShowTask);
console.log(ToDoList.Tasks);
// console.log(ToDoList.SaveTask.Task);
// ToDoList.SaveInStorage();
// ToDoList.ShowTask();
// ToDoList.ReamoveFromStorage()
window.addEventListener('load', ToDoList.Initialize())

let element = document.getElementById("task-name")
element.focus()

