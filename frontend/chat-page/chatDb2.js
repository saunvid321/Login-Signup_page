const request = indexedDB.open("chats",1);
let db, tx, store;

request.onupgradeneeded = (e)=>{
    db = request.result;
    store = db.createObjectStore("messages",{keyPath: "user"});
}

request.onsuccess = (e)=>{
    db = request.result;
}

request.onerror = (e)=>{
    console.log(e);
}

//insert a message to the indexedDB according to a particular user
function addToIndexedDB(user, message) {
    tx = db.transaction("messages", "readwrite");
    store = tx.objectStore("messages");
  
    const request = store.get(user); 

    request.onsuccess = (event) => {
        let chatMessage = event.target.result;
  
        if (chatMessage) {
            let m = chatMessage.message; 
            m.push(message);
            
        } else {
            chatMessage = { user: user, message: [message] }; 
        }

        store.put(chatMessage); // Store the updated chat message array back into IndexedDB
    };

    request.onerror = (event) => {
        console.error("Error retrieving chat message array:", event.target.error);
    };

    tx.oncomplete = () => {
        console.log("Chat message array updated successfully.");
    };
}

//retrieve the message array of a particular user and return it
function getMessageArray(user, callback){
    tx = db.transaction("messages", "readwrite");
    store = tx.objectStore("messages");
    const request = store.get(user); 

    request.onsuccess = (event) => {
        let chatMessage = event.target.result;
        let m = chatMessage.message;
        callback(m);
    };

    request.onerror = (event) => {
        console.error("Error retrieving chat message array:", event.target.error);
    };

    tx.oncomplete = () => {
        console.log("Chat message array updated successfully.");  
    };
}

//retrieve all the users present in the indexedDB
function getAllUsers(callback){
    tx = db.transaction("messages", "readwrite");
    store = tx.objectStore("messages");
    let users = [];
    const request = store.openCursor();
    request.onsuccess = function(event){
        const cursor = event.target.result;
        if(cursor){
            //console.log(cursor.value.user);
            users.push(cursor.value.user);
            cursor.continue();    
        }else{
            callback(users);
        }
    }

    request.onerror = function(event){
        console.log(event);
    }
}