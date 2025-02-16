// {
//     "id": 1,
//     "firstName": "",
//     "age": 20
// }

const posts = [{
    "id": 1,
    "firstName": "",
    "age": 20
}]

function getPost(id) {
    return posts.find(post => post.id === parseInt(id))
}

function postPost(post) {
    posts.push(post)
}

export { getPost, postPost }