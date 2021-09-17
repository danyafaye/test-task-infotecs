const aboutInfo = document.querySelector('.table_about')
const tableTh = document.querySelectorAll('th')
const tableBody = document.querySelector('tbody')
const table = document.querySelector('table')
const form = document.querySelector('.form_wrapper')
const input = document.querySelectorAll('input')
const textArea = document.querySelector('textarea')
const editButton = document.querySelector('.div_bttn_edit')
const closeButton = document.querySelector('.div_bttn_close')

//функция для заполнения таблицы нужными данными
//about/4 для вывода примерно двух строк
let fillTable = (data) => {
    const aboutInfoLength = aboutInfo.clientWidth
    for (let i = 0; i < data.length; i++) {
        let myTr = document.createElement('tr')
        myTr.className = 'table_rows'
        myTr.innerHTML = `<td class="table_first_name _col">${data[i].name.firstName}</td>
            <td class="table_last_name _col">${data[i].name.lastName}</td>
            <td class="table_about _col">${data[i].about.slice(0, (aboutInfoLength / 4)) + '...'}</td>
            <td class="table_eye_color _col">${data[i].eyeColor}</td>`
        let myTb = document.querySelector('tbody')
        myTb.appendChild(myTr)
    }
}

//наложение события на заголовки с сортировкой отдельной колонки
let sortTable = () => {
    tableTh.forEach((th,n)=>{
        th.addEventListener('click', () => {
            checkIfSelectedTh(n)
            if(!th.dataset.index || th.dataset.index === '-1'){
                th.setAttribute('data-index', 1)
            } else if (th.dataset.index === '1'){
                th.setAttribute('data-index', -1)
            }
            let data = th.dataset.index
            th.classList.add('selected')
            sortRows(n, data)
        })
    })}

//функция для сортировки таблицы index - колонка, которую требуется отсортировать
let sortRows = (index, data) => {
    let sortedRows = Array.from(tableBody.rows)
        .sort((rowA, rowB) => rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? data : -data);

    tableBody.append(...sortedRows);
}

//функция, которая проверяет класс selected у заголовков таблицы и которая убирает его у невыбранных заголовков
let checkIfSelectedTh = (index) => {
    tableTh.forEach((th, n)=>{
        if(th.classList.contains('selected') && n!==index){
            th.classList.toggle('selected');
            th.removeAttribute('data-index')
        }
    })
}

let editTable = () => {
    table.addEventListener('click', (table)=>{
        const row = table.target.closest('.table_rows')
        form.style.cssText = `display: block;  top: ${row.offsetTop}px; left: ${row.offsetWidth + 20}px;`;
        input[0].value = row.cells[0].innerHTML
        input[1].value = row.cells[1].innerHTML
        textArea.value = row.cells[2].innerHTML.slice(0, row.cells[2].innerHTML.length - 3);
        input[2].value = row.cells[3].innerHTML
    })
    editButton.addEventListener('click', () => {

    })
}

//ответ на запрос json массива
fetch('./src/data.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        fillTable(data)
        sortTable()
        editTable()
    })