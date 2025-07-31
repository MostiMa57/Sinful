const todoArr = ['nenen', 'comlai'];


renderTodoList();
function renderTodoList() {
    let todoArrList = '';

    for (i = 0; i < todoArr.length; i++){
        const todor = todoArr[i];
        const html = `<p>${todor}</p>`;
        todoArrList += html;
    }

    document.querySelector('.js-todo-list')
        .innerHTML = todoArrList;
}


function todoList() {
    const inputElement = document.querySelector('.js-list-input');
    const name = inputElement.value;

    todoArr.push(name);
    console.log(todoArr);
    
    inputElement.value = '';
    renderTodoList();
}

// let i = 0;

// while (i <= 5) {
//     console.log(i);
//     i++;
// }



