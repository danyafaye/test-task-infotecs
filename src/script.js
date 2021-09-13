const aboutInfo = document.querySelector('.table_about')
const name = document.querySelector('.table_first_name')

//ответ на запрос json массива
fetch('./src/data.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        fillTable(data)
    })

//функция для заполнения таблицы нужными данными
let fillTable = (data) => {
    const aboutInfoLength = aboutInfo.clientWidth
    for (let i = 0; i < data.length; i++) {
        let myTr = document.createElement('tr')
        myTr.innerHTML = `<td class="table_first_name _col">${data[i].name.firstName}</td>
            <td class="table_last_name _col">${data[i].name.lastName}</td>
            <td class="table_about _col">${data[i].about.slice(0, (aboutInfoLength / 4)) + '...'}</td>
            <td class="table_eye_color _col">${data[i].eyeColor}</td>`
        let myTb = document.getElementById('bodyOfTable')
        myTb.appendChild(myTr)
    }
}

name.addEventListener('click', () => {
})