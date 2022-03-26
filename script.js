const newTaskForm = document.getElementById('new-task-form');
const taskList = document.getElementById('task-list');
const newTaskPopUp = document.getElementById('new-task-popup');

let tasks = [];
let showNewTaskPopUp = false;

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
    listItem.classList.add('task-list-item');

    const header = document.createElement('div');
    header.classList.add('tasks-list-header')
    listItem.appendChild(header);

    const checkboxIsDone = document.createElement('input');
    checkboxIsDone.setAttribute('type', 'checkbox');
    checkboxIsDone.checked = task.isDone;
    checkboxIsDone.onchange = () => {
      handleCheckboxChange(task);
    }
    header.appendChild(checkboxIsDone);

    const title = document.createElement('p');
    title.textContent = task.title;
    header.appendChild(title);

    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = 'Excluir';
    buttonDelete.classList.add('button-delete')
    buttonDelete.onclick = () => {
      handleDeleteClick(task);
    }
    listItem.appendChild(buttonDelete);

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

const toggleNewTaskPopUp = () => {
  showNewTaskPopUp = !showNewTaskPopUp;

  if (showNewTaskPopUp) {
    newTaskPopUp.style.display = 'block';
  } else {
    newTaskPopUp.style.display = 'none';
  }
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

  tasks.unshiftw(newTask);
  saveToLocalStorage();
  newTaskForm.reset();
  updateListView();

  toggleNewTaskPopUp();
}

newTaskForm.addEventListener('submit', handleSubmit);



const handleKeyDown = (event) => {
  if (event.keyCode === 27 && showNewTaskPopUp){
    toggleNewTaskPopUp();
  }
}

document.addEventListener('keydown', handleKeyDown);
