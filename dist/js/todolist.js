var toDoList = document.querySelector('.todolist__list');
var toDoListBtn = document.querySelector('.todolist__btn');
var toDoListInput = document.querySelector('.todolist__input');
var listData = JSON.parse(localStorage.getItem('localData')) || [];

function updateList(newItem) {
	var listStr = '';
	var listLen = newItem.length;
	for(let i = 0; i < listLen; i++) {
		// listStr += '<li class="todolist__item"><span>' + newItem[i].content + '</span><a class="todolist__del" href="javascript:;" data-index=" ' + i + ' ">DEL</a></li>'
		listStr += `<li class="todolist__item"><span>${newItem[i].content}</span><a class="todolist__del" href="javascript:;" data-index="${i}">x</a></li>`
	}
	toDoList.innerHTML = listStr;
}

function addList(e) {
	e.preventDefault();
	var value = toDoListInput.value;
	if(value === ''){return}
	var listContent = {content: value};
	listData.push(listContent);
	localStorage.setItem('localData', JSON.stringify(listData));
	updateList(listData);
}

function removeList(e) {
	e.preventDefault();
	var index = e.target.dataset.index;
	if(e.target.tagName === 'A'){
	listData.splice(index, 1)
	localStorage.setItem('localData', JSON.stringify(listData));
	updateList(listData);
	}else if(e.target.tagName === 'LI'){
		e.target.classList.toggle('todolist__item--checked')
	}
}


toDoList.addEventListener('click', removeList, false);
toDoListBtn.addEventListener('click', addList, false);
