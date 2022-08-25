export async function getComments(id) {
    const url = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    const comments = await url.json();
    return comments
}
export function createCommentsBlock(commentsList, modal) {
    const commentsBlock = document.createElement('ul');
    commentsBlock.classList.add('modal__comments', 'comments');

    commentsList.forEach(elem => {
        const commentItem = document.createElement('li');
        commentItem.classList.add('comment')
    
        const email = document.createElement('h1');
        email.classList.add('comment__email');
        email.innerHTML = elem.email;
        
        const message = document.createElement('p');
        message.classList.add('comment__message');
        message.innerHTML = elem.body;

        commentItem.appendChild(email);
        commentItem.appendChild(message);

        commentsBlock.appendChild(commentItem);
    })
    modal.appendChild(commentsBlock);
}