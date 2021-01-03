const form = document.querySelector('.form-task');
const input = document.querySelector('.input-task');
const lists = document.querySelector('.lists');
const ul = document.querySelector('ul');
const btnClearTasks = document.querySelector('.clear-tasks');
const filterTasksName = document.querySelector('.filter-task-name');
// const tasklistsName = document.querySelectorAll('ul li');
let tasks = [];
let li;
let searchedLi;
let searchedUl;

// add tasks whixh was there in advance
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        li = document.createElement('li');
        let span = document.createElement('span');
        let i = document.createElement('i');
        i.className = `fa fa-times`
        span.innerText = task;
        li.appendChild(span);
        li.appendChild(i);
        ul.appendChild(li);
    });

}

// add tasks we enter
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputVal = input.value.trim();
    if (inputVal !== '') {
        tasks.push(inputVal);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    input.value = '';

    tasks = JSON.parse(localStorage.getItem('tasks'));
    ul.innerHTML = '';
    tasks.forEach(task => {
        li = document.createElement('li');
        let span = document.createElement('span');
        let i = document.createElement('i');
        i.className = `fa fa-times`
        span.innerText = task;
        li.appendChild(span);
        li.appendChild(i);
        ul.appendChild(li);
    });
})

console.log(tasks);

// clear aa tasks whith btn
btnClearTasks.addEventListener('click', function() {
    ul.innerHTML = '';
    localStorage.removeItem('tasks');
    tasks = [];
})

//search task part
filterTasksName.addEventListener('keyup', function() {
    const inputValFilter = filterTasksName.value.trim();

    const searchedTaskName = tasks.filter(task => task === inputValFilter);
    if (searchedTaskName.length) {
        ul.innerHTML = '';
        searchedTaskName.forEach((taskName) => {
            li = document.createElement('li');
            let span = document.createElement('span');
            let i = document.createElement('i');
            i.className = `fa fa-times`
            span.innerText = taskName;
            li.appendChild(span);
            li.appendChild(i);
            ul.appendChild(li)
        })

    } else if (inputValFilter === '') {
        if (localStorage.getItem('tasks')) {
            ul.innerHTML = '';
            tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.forEach(task => {
                li = document.createElement('li');
                let span = document.createElement('span');
                let i = document.createElement('i');
                i.className = `fa fa-times`
                span.innerText = task;
                li.appendChild(span);
                li.appendChild(i);
                ul.appendChild(li);
            });

        }

    } else {
        ul.innerHTML = `<span>There is no match item</span>`

    }



})

//delet each task
ul.addEventListener('click', function(e) {
    // console.log(e.target)
    if (e.target.classList.contains('fa')) {
        // console.log(e.target.parentElement.innerText)
        const deletedtaskIndex = tasks.findIndex(task => task === e.target.parentElement.innerText);
        // console.log(deletedtaskIndex);
        const removedTask = tasks.splice(deletedtaskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        e.target.parentElement.remove();

    }
})