const newTaskForm = document.getElementById('new-task-form');
const taskList = document.getElementById('task-list');

let tasks = [];

const clearListView = () => {
  const children = [...taskList.children];
  children.forEach((child) => {
    taskList.removeChild(child);
  })
}

const updateListView = () => {
  console.log('updateListView', tasks);
  clearListView();

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.title;

    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = 'Delete';
    buttonDelete.onclick = () => {
      handleDeleteClick(task);
    }
    listItem.appendChild(buttonDelete);

    const checkboxIsDone = document.createElement('input');
    checkboxIsDone.setAttribute('type', 'checkbox');
    checkboxIsDone.checked = task.isDone;
    checkboxIsDone.onchange = () => {
      handleCheckboxChange(task);
    }
    listItem.appendChild(checkboxIsDone);

    taskList.appendChild(listItem);
  })
}

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('tasks');

   if(savedData === null) {
     return;
   }

   const parsedData = JSON.parse(savedData);
   tasks = parsedData;

   updateListView();
}

loadFromLocalStorage();

const saveToLocalStorage = () => {
  const parsedData = JSON.stringify(tasks);
  localStorage.setItem('tasks', parsedData)
}

const handleDeleteClick = (targetTask) => {
  const filtered = tasks.filter((task) => {
   return task != targetTask;
  });
  tasks = filtered;

  saveToLocalStorage();
  updateListView();
 }

const handleCheckboxChange = (targetTask) => {
  targetTask.isDone = !targetTask.isDone;

  saveToLocalStorage();
  updateListView();
}

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(newTaskForm);
  const fromEntries = Object.fromEntries(formData);

  const newTask = {
    id: tasks.length,
    title: fromEntries.title,
    description: fromEntries.description,
    isDone: false
  }

  tasks.push(newTask);
  saveToLocalStorage();

  updateListView();
}

newTaskForm.addEventListener('submit', handleSubmit);
