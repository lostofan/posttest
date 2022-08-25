import { getPaginationNumbers, setPage } from "./pagination.js";


const searchForm = document.getElementById('search');
searchForm.addEventListener('input', (event) => searchStr(event))

function searchStr(event) {
    let str = event.target.value;
    const pagination = document.querySelector('.nav__numbers');
    pagination.hidden = true;
    if (str === '') {
        pagination.hidden = false;
        return getPaginationNumbers(), setPage();
    }
    showSearchResult(str);
}
function showSearchResult(str) {
    let postBlock = document.querySelectorAll('.post')
    let topic = document.querySelectorAll('.post__topic');
    let text = document.querySelectorAll('.post__text');

    for (let i = 0; i < postBlock.length; i++) { 
        let isTopicFound = topic[i].innerHTML.match(str);
        let isTextFound = text[i].innerHTML.match(str);

        postBlock[i].classList.add('hidden');

        if (isTopicFound !== null || isTextFound !== null) {
            postBlock[i].classList.remove('hidden');
        }
    }
}