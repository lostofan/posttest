import { getComments, createCommentsBlock } from "../js/Comments.js";


export async function showModal(id) {
    const title = document.querySelector(`.id_${id} > .post__wrapper > h1`).innerHTML;
    const body = document.querySelector(`.id_${id} > .post__wrapper > p`).innerHTML;

    const commentsList = await getComments(id);
    const currentPost = {title: title, body: body}
    createModal(commentsList, currentPost);
}

function createModal(commentsList, {title, body}) {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper');

    const closeButton = document.createElement('button');
    closeButton.classList.add('closeBtn');
    closeButton.innerHTML = '&times';
    closeButton.onclick = (event) => {closeModal(event)};

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('modal__post')

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const topic = document.createElement('h1');
    topic.classList.add('modal__topic');
    topic.innerHTML = title;

    const message = document.createElement('p');
    message.classList.add('modal__message');
    message.innerHTML = body;

    postWrapper.appendChild(topic);
    postWrapper.appendChild(message);
    
    modal.appendChild(closeButton);
    modal.appendChild(postWrapper);
    createCommentsBlock(commentsList, modal);

    modalWrapper.appendChild(modal);
    document.querySelector('.app__wrapper').appendChild(modalWrapper);
}

function closeModal() {
    document.querySelector('.modal__wrapper').remove();
}