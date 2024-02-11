import data from "./mock.js";

const three = document.querySelector('#tree')

const createLi = (item)=> {
    const li = document.createElement('li')
    li.id = item.id
    li.classList = 'head-item'
    const spanName = document.createElement('span')
    spanName.innerHTML = item.name
    const spanPrice = document.createElement('span')
    if (item.price !== 0) {
        spanPrice.innerHTML = `${item.price}р`
        spanPrice.classList = 'item-price'
    }
    li.append(spanName)
    li.append(spanPrice)

    return li
}
function renderList(obj) {
    const children = obj.services.filter(service => service.sorthead);
    children.sort((a, b) => a.sorthead - b.sorthead);
    children.forEach(item => {
       if (item.head === null) {
           three.append(createLi(item))
       }
   })
}

renderList(data)

function removeUl(parent) {
    const ulElements = parent.querySelectorAll('ul');
    ulElements.forEach((ul) => {
        ul.classList.remove('slideIn')
        ul.classList.add('slideOut')
        setTimeout(()=>{ul.remove()}, 200)
    });

}
function renderItem(id, obj, parent) {
    removeUl(parent)
    const ul = document.createElement('ul');
    const children = obj.services.filter(service => service.head);
    children.sort((a, b) => a.sorthead - b.sorthead);
    children.forEach(item => {
        if (item.head === id) {
            ul.classList.remove('slideOut')
            ul.classList.add('slideIn')
            ul.append(createLi(item))
        }
    });
    parent.append(ul);
}


const headAll = document.querySelectorAll('.head-item');
headAll.forEach(item => item.addEventListener("click", (e)=> {
    const id = parseInt(e.target.parentNode.id);
    const parent =  e.target.parentNode;
    const ul = parent.querySelector('ul');

    if (ul) {
        removeUl(parent);
    } else {
        renderItem(id, data , parent);
    }
}));
