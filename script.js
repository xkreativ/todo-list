const todoList = document.querySelector('.todo');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
let flag = false;

todoList.addEventListener('click', function(e) {
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
});