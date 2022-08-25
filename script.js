import {getPosts, createPost} from './Posts.js'
import {getPaginationNumbers, setPage } from './pagination.js'

async function loadPosts() {
    const posts = await getPosts();
    posts.map(elem => createPost(elem));
    getPaginationNumbers();
    setPage();
}

loadPosts();