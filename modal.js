import { getComments, createCommentsBlock } from "./Comments.js";
import { getPosts } from "./Posts.js";

export async function showModal(id) {
    const commentsList = await getComments(id);
    const currentPost = await getPosts(`/${id}`)
    createModal(commentsList, currentPost);
}

function createModal(commentsList, {title, body}) {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper');

    const closeButton = document.createElement('button');
    closeButton.classList.add('closeBtn');
    closeButton.innerHTML = '&times';
    closeButton.onclick = (event) => {closeModal(event)};

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const topic = document.createElement('h1');
    topic.classList.add('modal__topic');
    topic.innerHTML = title;

    const post = document.createElement('p');
    post.classList.add('modal__post');
    post.innerHTML = body;
    
    modal.appendChild(closeButton);
    modal.appendChild(topic);
    modal.appendChild(post);

    createCommentsBlock(commentsList, modal);

    modalWrapper.appendChild(modal);
    document.querySelector('.app__wrapper').appendChild(modalWrapper);
}

function closeModal() {
    document.querySelector('.modal__wrapper').remove();
}