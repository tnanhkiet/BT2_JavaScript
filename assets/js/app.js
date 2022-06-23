const $ = document.querySelector.bind(document)
const formData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []


window.onload = function getFullYears() {
    let years = $("#form__left-years")
    let currentYear = (new Date()).getFullYear()
    for (let i = 1990; i <= currentYear; i++) {
        let option = document.createElement("option")
        option.innerHTML = i
        option.value = i
        years.appendChild(option)
    }
}

function start() {
    renderForm(formData)
    getFullYearsRight(formData)
    filerByYear()
    filerByGender()
    filerSort()
    handleCreateForm()
}

start()

function filerByYear() {
    let e = $("#form__right-years")
    e.onclick = () => {
        let years = e.options[e.selectedIndex].value
        let filerYear = formData.filter((item) => item && item.years == years)
        renderForm(filerYear)
    }
}

function filerByGender() {
    let e = $("#form__right-gender")
    e.onclick = () => {
        let gender = e.options[e.selectedIndex].value
        if (gender === "Gender") {
            renderForm(formData)
        }
        else {
            let filerGender = formData.filter((item) => item && item.gender == gender)
            renderForm(filerGender)
        }
    }
}

function filerSort() {
    let sort = $("#form__right-sort")
    sort.onclick = () => {
        let selectSort = sort.options[sort.selectedIndex].value
        let e = $("#form__right-select-tag")
        let selectTag = e.options[e.selectedIndex].value
        if (selectSort === 'Tăng') {
            if (selectTag === 'Họ & tên') {
                let increase = formData.sort()
                console.log(selectTag)
                renderForm(increase)
            } if (selectTag === 'Năm sinh') {
                let increase = formData.sort()
                console.log(selectTag)

                renderForm(increase)
            } if (selectTag === 'Giới tính') {
                let increase = formData.sort()
                renderForm(increase)
            } if (selectTag === 'Thời gian tạo') {
                let increase = formData.sort()
                renderForm(increase)
            }
            console.log("tăng")
        } else {
            if (selectTag === 'Họ & tên') {
                let increase = formData.reverse()
                renderForm(increase)
            } if (selectTag === 'Năm sinh') {
                let increase = formData.reverse()
                renderForm(increase)
            } if (selectTag === 'Giới tính') {
                let increase = formData.reverse()
                renderForm(increase)
            } if (selectTag === 'Thời gian tạo') {
                let increase = formData.reverse()
                renderForm(increase)
            }
            console.log("giảm")
        }
    } 
}

function getFullYearsRight(years) {
    let e = years.map((year, index) => {
        return `
        <option value="${year.years}">${year.years}</option>
        `
    })
    let uniqueSet = new Set(e)
    let backToArray = [...uniqueSet];
    let getYears = backToArray.sort()
    $("#form__right-years").innerHTML = getYears.join('')

}

function renderForm(tasks) {
    let htmls = tasks.map((task, index) => {
        return `
            <tr class="table-row-${index}">
                <td>${index+1}</td>
                <td>${task.fullname}</td>
                <td>${task.years}</td>
                <td>${task.gender}</td>
                <td>${task.today}</td>
                <td><button onclick="handleDeleteForm(${index})" class="form__right-table-del"><i class="fa-solid fa-trash-can"></i></button></td>
            </tr> 
        `
    })
    $("#form__right-table").innerHTML = htmls.join('')
}

function handleDeleteForm(id) {
        if (confirm('Bạn có thực sự muốn xóa?')) {
            formData.splice(id, 1)
            localStorage.setItem("data", JSON.stringify(formData))
            renderForm(formData)
            getFullYearsRight(formData)
        }
}

function handleCreateForm() {
    let btnAdd = $(".form__left-btn")
    btnAdd.onclick = () => {
        let fullname = $("input[name='fullname']").value
        let e = $("#form__left-years")
        let years = e.options[e.selectedIndex].value
        let gender = $("input[name='gender']:checked").value
        let date = new Date()
        let dd = date.getDate()
        let mm = date.getMonth() + 1
        let yyyy = date.getFullYear()
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        let withPmAm = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
        let today = withPmAm + ' ' + dd + '/' + mm + '/' + yyyy

        formData.push({
            fullname: fullname,
            years: years,
            gender: gender,
            today: today
        })
        localStorage.setItem("data", JSON.stringify(formData))
        renderForm(formData)
        getFullYearsRight(formData)
    }
}