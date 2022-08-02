const todo = document.querySelector('.todo');
const todoList = document.querySelector('.todo-list');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
let flag = false;
let flagOpenMemo = false;

// изменение состояния выпадающего меню
todo.addEventListener('click', function(e) {
    let target = e.target || e.srcElement;

    if(target.className == 'dropdown-menu') {
        dropdownMenus.forEach(element => {
            if (element != target) {
                element.querySelector('.select').classList.add('close');
            }
        });
        target.querySelector('.select').classList.toggle('close');
    } else {
        flag == false ? flag = true : flag = false;
        if(flag == true){
            dropdownMenus.forEach(element => {
                    element.querySelector('.select').classList.add('close');
            });
            flag = false;
        }
    }
    // работа элементов выпадающего меню
    // кнопка удалить
    if(target.closest('.option.delete')) {
        target.closest('.todo-item').remove();
    } 

    // кнопка создать поле
    if(target.closest('.option.add')) {
        if(flagOpenMemo == false) {
            target.closest('.todo-item')
            .querySelector('.content').insertAdjacentHTML('beforeend', `
            <div class="add-a-memo">
                <textarea class="memo" name="memo" id="" cols="30" rows="10" placeholder="Type the text"></textarea>
                <div class="btn-add-memo">
                    <button class="btn hide">hide</button>
                    <button class="btn add">add a memo</button>
                </div>
            </div>`);
            flagOpenMemo = true;
        }
    }

    // управление кнопками memo
    // кнопка скрыть
    if(target.className == 'btn hide') {
        target.closest('.add-a-memo').remove();
        flagOpenMemo = false;
    }
    //кнопка добавить
    if(target.className == 'btn add') {
        
    }
});

// получение дат
let days = [
    'Sunday','Monday','Tuesday',
    'Wednesday','Thursday','Friday',
    'Saturday'
];
let month = [
    'January','February','March',
    'April','May','June',
    'July','August','September',
    'October','November', 'December'
]

const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
let date = new Date();

function getDate(action) {
    function setDate(dateTime) {
        title.innerHTML = days[dateTime.getDay()];
        subtitle.innerHTML = `${month[dateTime.getMonth()].slice(0,3)} 
        ${dateTime.getDate()}, ${dateTime.getFullYear()}`;
    }
    switch (action) {
        case 'next':
            date = new Date(date.getTime() + (24 * 60 * 60 * 1000));
            setDate(date);
            break;
        case 'prev':
            date = new Date(date.getTime() - (24 * 60 * 60 * 1000));
            setDate(date);
            break;
        default:
            setDate(date);
            break;
    }
}
getDate();

// переключение даты
const nextDate = document.getElementById('next');
nextDate.addEventListener('click', () => {getDate('next')});

const prevDate = document.getElementById('prev');
prevDate.addEventListener('click', () => {getDate('prev')});

// добавление записи в todo list
const input = document.querySelector('.add-a-task input');

document.addEventListener('keydown', function(event) {
    if (event.code == 'Enter' && input == document.activeElement) {
        if(input.value != '') {
            todoList.insertAdjacentHTML('beforeend',
            `<li class="todo-item">
                <input type="checkbox" name="" id="">
                <div class="content">
                    <p>${input.value}</p>
                    <span></span>
                </div>
                <div class="dropdown-menu">
                    <div class="select close">
                        <div class="option fix">
                            <span class="iconify" data-icon="radix-icons:drawing-pin-filled" style="color: #d6d6d6;" data-width="20" data-height="35"></span>
                            <span>Pin on the top</span>
                        </div>
                        <div class="option add">
                            <span class="iconify" data-icon="akar-icons:paper"></span>
                            <span>Add a memo</span>
                        </div>
                        <div class="option delete">
                            <span class="iconify" data-icon="bxs:trash"></span>
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            </li>`)
            input.value = '';
        }
    }
});

