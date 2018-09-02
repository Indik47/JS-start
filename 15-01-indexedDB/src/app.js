'use strict';

let myWorker = null;

/**
 * Puts new task to DB and renders it in the DOM
 * @param msg{string}
 */
const addTask = msg => {
    const id = Date.now();

    myWorker.pushTask(msg, id);
    renderTask(msg, id, false);
};

/**
 * Worker class
 */
class AppWorker {
    constructor() {
        if (!('Worker' in window)) {
            console.log('error, no worker');
        }
        this.worker = new Worker('worker.js');
        this.worker.onmessage = this.onMessage;
    }
    pushTask(data, id) {
        this.worker.postMessage({
            type: 'createTask',
            payload: {
                id: id,
                author: 'me',
                message: data,
                isResolved: false,
            }
        })
    }
    deleteTask (id) {
        this.worker.postMessage({
            type: 'delete',
            payload: {
                id: id
            }
        })
    }
    updateTask (id, isResolved) {
        this.worker.postMessage({
            type: 'update',
            payload: {
                id: id,
                isResolved: isResolved
            }
        })
    }
    getTasks() {
        this.worker.postMessage({
            type: 'readAllTasks'
        })
    }
    onMessage({data}) {
        const task = document.getElementById(`${data.payload.id}`);

        function initPage() {
            data.payload.forEach(item => {
                renderTask(item.message, item.id, item.isResolved);
            });
            addEvListeners();
        }

        switch (data.type){
            case 'allTasksRead':
                initPage();
                break;
            case 'taskDeleted':
                task.parentNode.removeChild(task);
            break;
            case 'taskUpdated':
                task.classList.toggle('resolved');
            break;
        }
    }
}

myWorker = new AppWorker();