const newTaskForm = document.getElementById('new-task-form');
const taskList = document.getElementById('task-list');

let tasks = [];

const handleDeleteClick = (targetTask) => {
  const filtered = tasks.filter((task) => {
   return task != targetTask;
  });
  tasks = filtered;
  updateListView();
 }


const handleCheckboxChange = (targetTask) => {
  targetTask.isDone = !targetTask.isDone;
  updateListView();
}

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
  updateListView();
}

newTaskForm.addEventListener('submit', handleSubmit);
