import {getPaginationNumbers, setPage, activePage} from './pagination.js'

export async function deletePost(event, id) {
    event.currentTarget.disabled = true;    
    await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
    });
    document.querySelector(`.id_${id}`).remove();
    getPaginationNumbers();
    setPage(activePage);
}
