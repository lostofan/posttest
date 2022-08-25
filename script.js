async function getPosts() {
    let url = await fetch("https://jsonplaceholder.typicode.com/posts");
    let posts = await url.json();
    return posts
}
function createPost ({title, body, id}) {
    const postItem = document.createElement('li');
    postItem.classList.add('post', `id_${id}`);

    const article = document.createElement('h1');
    article.classList.add('post__article');
    article.innerHTML = id + ". " + title;

    const post = document.createElement('p');
    post.classList.add('post__text');
    post.innerHTML = body;

    const button = document.createElement('button');
    button.classList.add('post__closeBtn');
    button.innerHTML = '&times';
    button.addEventListener('click', (event) => deletePost(event, id));

    postItem.appendChild(article);
    postItem.appendChild(post);
    postItem.appendChild(button);

    document.getElementById('posts').appendChild(postItem);
}

async function loadPosts() {
    const posts = await getPosts();
    posts.map(elem => createPost(elem));
}

async function deletePost(event, id) {
    event.currentTarget.disabled = true;    
    await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
    });
    document.querySelector(`.id_${id}`).remove();
    getPaginationNumbers();
    setPage(activePage);
}
