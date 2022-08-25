async function getPosts() {
    let url = await fetch("https://jsonplaceholder.typicode.com/posts");
    let posts = await url.json();
    return posts
}
function createPost ({title, body, id}) {
    const postItem = document.createElement('li');
    postItem.classList.add('post', `id_${id}`);

    const topic = document.createElement('h1');
    topic.classList.add('post__topic');
    topic.innerHTML = id + ". " + title;

    const post = document.createElement('p');
    post.classList.add('post__text');
    post.innerHTML = body;

    const button = document.createElement('button');
    button.classList.add('post__closeBtn');
    button.innerHTML = '&times';
    button.addEventListener('click', (event) => deletePost(event, id));

    postItem.appendChild(topic);
    postItem.appendChild(post);
    postItem.appendChild(button);

    document.getElementById('posts').appendChild(postItem);
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
const navNumbers = document.querySelector('.nav__numbers');
let activePage;

const addNavNumbers = (counter) => {
    const numberItem = document.createElement('button');
    numberItem.className = 'nav__number';
    numberItem.innerHTML = counter;
    numberItem.onclick = () => setPage(counter);
    navNumbers.appendChild(numberItem);
}

function getPaginationNumbers() {
    navNumbers.innerHTML = "";
    const postItems = document.querySelectorAll('.post');
    let postCount = postItems.length
    let pageCount = Math.ceil(postCount / 10);
    for (let i = 1; i <= pageCount; i++) {
        addNavNumbers(i);
    }
}
function setPage(pageNumber = 1) {
    activePage = pageNumber;
    const lowerPage = (pageNumber - 1) * 10;
    const currentPage = (pageNumber) * 10;
    const postItems = document.querySelectorAll('.post');
    postItems.forEach((elem, idx) => {
        elem.classList.add('hidden');
        if (idx >= lowerPage && idx < currentPage) {
            elem.classList.remove('hidden');
        }
    })
    setNumberActive(activePage);
}

function setNumberActive(activePage) {
    const paginationNumbers = document.querySelectorAll('.nav__number');
    for (let i = 0; i < paginationNumbers.length; i++) {
        paginationNumbers[i].classList.remove("nav__number_active");
    }
    paginationNumbers[activePage - 1].classList.add('nav__number_active')
}
async function loadPosts() {
    const posts = await getPosts();
    posts.map(elem => createPost(elem));
    getPaginationNumbers();
    setPage();
}

loadPosts();