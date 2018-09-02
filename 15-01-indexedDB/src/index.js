const input = document.getElementById('new-task');
const btnAdd = document.getElementById('add-btn');
const tasksBoard = document.getElementsByClassName('tasks')[0];

/**
 * Render single task to the list
 * @param msg{string} - task text
 * @param id{number} - task id
 */
function renderTask(msg, id, isResolved) {
    const taskCard = document.createElement('div');
    taskCard.classList = 'tasks__item';
    taskCard.id = id;

    if (isResolved) {
        taskCard.classList.add('resolved');
    } else {
        taskCard.classList.remove('resolved');
    }

    const taskCheckBox = document.createElement('input');
    taskCheckBox.classList = 'tasks__item__checkbox';
    taskCheckBox.setAttribute('type', 'checkbox');
    taskCheckBox.checked = isResolved;

    const taskMessage = document.createElement('p');
    taskMessage.classList = 'tasks__item__text';
    taskMessage.textContent = msg;

    const taskDelBtn = document.createElement('div');
    taskDelBtn.classList = 'tasks__item__btn-del';
    taskDelBtn.innerText = '×';

    taskCard.appendChild(taskCheckBox);
    taskCard.appendChild(taskMessage);
    taskCard.appendChild(taskDelBtn);
    tasksBoard.appendChild(taskCard);
}

btnAdd.addEventListener('click', () => {
   const msg = input.value;
   addTask(msg);
   input.value = '';
});

/**
 * Add event listener to tasks. Events delegated.
 */
function addEvListeners() {
    const tasks = document.getElementsByClassName('tasks')[0];

    tasks.addEventListener('click', (e) => {
        const taskID = e.target.parentNode.id;

        switch (e.target.className) {
            case 'tasks__item__checkbox':
                myWorker.updateTask(taskID, e.target.checked);
            break;
            case 'tasks__item__btn-del':
                myWorker.deleteTask(taskID);
                break;
            default:
                console.log('outside');
        }
    });
}

/**
 * Initialize tasks after page reload
 */
function init() {
    myWorker.getTasks();
};

init();