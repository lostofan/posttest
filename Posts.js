import {deletePost} from './deletePost.js'
import {showModal} from './modal.js'

export async function getPosts(id = "") {
    let url = await fetch(`https://jsonplaceholder.typicode.com/posts${id}`);
    let posts = await url.json();
    return posts
}

export function createPost ({title, body, id}) {
    const postItem = document.createElement('li');
    postItem.classList.add('post', `id_${id}`);

    const topic = document.createElement('h1');
    topic.classList.add('post__topic');
    topic.innerHTML = id + ". " + title;

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

    document.getElementById('posts').appendChild(postItem);
}