import {deletePost} from '../js/deletePost.js'
import {showModal} from '../js/modal.js'
import {getPaginationNumbers, setPage, activePage } from '../js/pagination.js'

export let lastID = {};

const topicField = document.querySelector('.addpost__topic');
const textField = document.querySelector(   '.addpost__text');
const submitButton = document.querySelector('.addpost__button');


topicField.addEventListener('input', isButtonBlocked);
textField.addEventListener('input', isButtonBlocked);
submitButton.addEventListener('click', addPost);


export async function getPosts(id = "") {
    let url = await fetch(`https://jsonplaceholder.typicode.com/posts${id}`);
    let posts = await url.json();
    return posts
}

async function addPost() {
    lastID.current++;
    await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: topicField.value,
              body: textField.value,
              userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
})
    .then((response) => response.json());

    createPost({title: topicField.value, body: textField.value, id: lastID.current})
    getPaginationNumbers();
    setPage(activePage);

    topicField.value = '';
    textField.value = '';
}


export function createPost ({title, body, id}) {
    const allPosts = document.getElementById('posts');

    const postItem = document.createElement('li');
    postItem.classList.add('post', `id_${id}`);

    const topic = document.createElement('h1');
    topic.classList.add('post__topic');
    topic.innerHTML = title;

    const post = document.createElement('p');
    post.classList.add('post__text');
    post.innerHTML = body;

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('post__wrapper');
    contentWrapper.appendChild(topic);
    contentWrapper.appendChild(post);
    contentWrapper.addEventListener('click', (event) => showModal(id, event));

    const button = document.createElement('button');
    button.classList.add('post__closeBtn', 'closeBtn');
    button.innerHTML = '&times';
    button.addEventListener('click', (event) => deletePost(event, id));

    postItem.appendChild(contentWrapper);
    postItem.appendChild(button);

    allPosts.insertBefore(postItem, allPosts.firstChild);
}

export function isButtonBlocked () {
    if (topicField.value !== "" && textField.value !== "") {
        submitButton.disabled = false;
    } else {submitButton.disabled = true;}
}
