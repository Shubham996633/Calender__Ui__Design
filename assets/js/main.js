// Check Leap Year

isLeapYear = (year) =>{
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !==0 || year % 100 ===0
                && year % 400 === 0)
}

getFebDays = (year) =>{
    return isLeapYear(year) ? 29 :28
}

let calender = document.querySelector('.calender')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let month_picker = document.querySelector('#month__selector')

month_picker.onclick = () =>{
    month_list.classList.add('show')
}


genrateCalender= (month,year) =>{
    let calender_days=document.querySelector('.calender__days')
    calender_days.innerHTML = ''

    let calender_header_year=document.querySelector('#year')
    let days_of_month = [31, getFebDays(year),31,30,31,30,31,31,30,31,30,31]


    let currDate= new Date()
    month_picker.innerHTML=month_names[month]
    calender_header_year.innerHTML=year

    let first_day = new Date(month,year,1)

    for(let i=0;i<=days_of_month[month] + first_day.getDay() - 1;i++){
        let day =document.createElement('div')
        if(i>=first_day.getDay()){
            day.classList.add('calender__day__hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                              <span></span>
                              <span></span>
                              <span></span>`
            if (i - first_day.getDate() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth() ){
                day.classList.add('curr__date')
            }
        }
        calender_days.appendChild(day)
        
    }
}

let month_list =calender.querySelector('.calender__month__list')
month_names.forEach((e,index) =>{
    let month =document.createElement('div')
    month.innerHTML=`<div>${e}</div>`
    month.onclick = () =>{
        month_list.classList.remove('show')
        curr_month.value=index
        genrateCalender(curr_month.value,curr_year.value)
    }
    month_list.appendChild(month)

})

document.querySelector('#prev__year').onclick = () =>{
    --curr_year.value
    genrateCalender(curr_month.value,curr_year.value)
}

document.querySelector('#next__year').onclick = () =>{
    ++curr_year.value
    genrateCalender(curr_month.value,curr_year.value)
}


let currDate = new Date()
let curr_month = {value: currDate.getMonth()}
let curr_year = {value : currDate.getFullYear()}
genrateCalender(curr_month.value,curr_year.value)





/*==================== DARK/LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})