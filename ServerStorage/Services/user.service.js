// {
//     "id": 1,
//     "firstName": "",
//     "age": 20
// }

const users = [{
    "id": 1,
    "firstName": "",
    "age": 20
}]

function getUser(id) {
    return users.find(user => user.id === parseInt(id))
}

function postUser(user) {
    users.push(user)
}

export { getUser, postUser }