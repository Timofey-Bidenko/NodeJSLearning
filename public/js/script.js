let newTaskInput = null


function addTask(currentUrl) {
    if (!newTaskInput) {
        newTaskInput = document.getElementById("newTaskInput");
    }
    
    if (newTaskInput.value) {
        fetch(`${currentUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newTaskInput.value })
        }
        )
        .then(() => location.reload())
    }
}


let newListInput = null

function createList(linkRootVar) {
    if (!newListInput) {
        newListInput = document.getElementById("newListInput");
    }
    
    if (newListInput.value) {
        const url = `${linkRootVar}${newListInput.value}`
        console.log(url, "Logged")

        fetch(url, { method: 'POST', credentials: 'include' })
        .then(() => location.href=url)
    }
}

function checkTask(currentUrl, taskId) {
    fetch(`${currentUrl}/${taskId}`, { method: 'PUT' })
    .then(() => location.reload())
}

function deleteTask(currentUrl, taskId) {
    fetch(`${currentUrl}/${taskId}`, { method: 'DELETE' })
    .then(() => location.reload())
}