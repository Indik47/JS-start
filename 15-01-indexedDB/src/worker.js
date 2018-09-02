'use strict';

const connect = new Promise(function (resolve) {
    const request = indexedDB.open("ToDoList", 1);

    request.onerror = function(err){
        console.log(err);
    };
    request.onsuccess = function(){
        resolve(request.result);
    };
    request.onupgradeneeded = function(e){
        e.currentTarget.result.createObjectStore("tasks", { keyPath: "id" });
    };
});

self.onmessage = function({data}){
    function getObjectStore(db, name, access) {
        const transaction = db.transaction("tasks", "readwrite");
        const objectStore = transaction.objectStore("tasks");
        return objectStore;
    }

    switch (data.type) {
        case 'createTask':
            connect.then(db => {
                const objectStore = getObjectStore(db);

                objectStore.add(data.payload);
            });
        break;

        case 'readAllTasks':
            connect.then (db => {
                const objectStore = getObjectStore(db, "tasks", "readwrite");

                const messages = [];

                objectStore.openCursor().onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                        messages.push(cursor.value);
                        cursor.continue();
                    } else {
                        self.postMessage({
                            type: 'allTasksRead',
                            payload: messages
                        })
                    }
                }
            });
        break;

        case 'delete':
            connect.then (db => {
                const objectStore = getObjectStore(db, "tasks", "readwrite");

                const req = objectStore.delete(Number(data.payload.id));
                req.onsuccess = function () {
                    self.postMessage({
                        type: 'taskDeleted',
                        payload:{
                            id: data.payload.id
                        }
                    })
                }
            });
        break;

        case 'update':
            connect.then (db => {
                const objectStore = getObjectStore(db, "tasks", "readwrite");

                objectStore.openCursor().onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                        if (cursor.key === Number(data.payload.id)) {
                            const entry = cursor.value;
                            entry.isResolved = data.payload.isResolved;

                            const update = cursor.update(entry);

                            update.onsuccess = function () {
                                self.postMessage({
                                    type: 'taskUpdated',
                                    payload: {
                                        id: data.payload.id
                                    }
                                });
                            }
                        }
                        cursor.continue();
                    }
                }
            });
        break;

        default:
        console.log('unknown operation');
    }
};
