import {getPosts, createPost, lastID} from '../js/Posts.js'
import {getPaginationNumbers, setPage } from '../js/pagination.js'


async function loadPosts() {
    const posts = await getPosts();
    posts.map(elem => createPost(elem));
    getPaginationNumbers();
    setPage();
    lastID.current = document.querySelectorAll('.post').length;
}

loadPosts();