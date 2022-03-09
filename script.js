const time = document.querySelector('.time'),
      month = document.querySelector('.month'),
      todaysDate = document.querySelector('.todays-date'),
      weekDays = document.querySelector('.week-days'),
      monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekDaysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      days = document.querySelector('.days'),
      btnNext = document.querySelector('.btn-next'),
      btnPrev = document.querySelector('.btn-prev');

let date = new Date();

let clock = document.createElement('h1');
clock.className = 'clock';
time.append(clock);

let addZero = (n) => n < 10 ? '0' + n : n;

function showTime() {
  let date = new Date(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds(),
      currentTime = addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);

  clock.innerHTML = currentTime;
  setInterval(showTime, 100);
}

let thisMonth = monthsArr[date.getMonth()];
let thisYear = date.getFullYear();

function renderMonthInfo() {
  month.innerHTML = `<p>${monthsArr[date.getMonth()]} ${date.getFullYear()}</p>`
}

let thisWeekDay = weekDaysArr[date.getDay() - 1];
let thisDate = date.getDate();

let dateInfo = document.createElement('p');
dateInfo.innerHTML = `${thisWeekDay}, ${thisDate} ${thisMonth} ${date.getFullYear()}`;
todaysDate.append(dateInfo);

for(let i = 0; i < weekDaysArr.length; i++) {
  weekDays.insertAdjacentHTML('beforeend', `<div class="week-day">${weekDaysArr[i].slice(0, 3)}</div>`)
}

function getLastDayOfMonth(thisYear, selectedMonth) {
  let date = new Date(thisYear, selectedMonth + 1, 0);
  return date.getDate();
}

function renderCalendar () {
  date.setDate(1);

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay() - 1;
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex;
  
  for(let x = firstDayIndex; x > 0; x--) {
    days.innerHTML += `<div class="day day__prev">${prevLastDay - x + 1}</div>`;
  }
  
  for(let i = 1; i <= lastDay; i++) {
    if(i === thisDate && thisMonth === monthsArr[date.getMonth()] && thisYear === date.getFullYear()) {
      days.innerHTML += `<div class="day day__active">${i}</div>`;
    } else {
      days.innerHTML += `<div class="day">${i}</div>`;
    }
  }
  
  for(let j = 1; j <= nextDays; j++) {
    days.innerHTML += `<div class="day day__next">${j}</div>`;
  }
}

btnPrev.addEventListener("click", () => {
  days.innerHTML = "";
  date.setMonth(date.getMonth() - 1);
  renderMonthInfo();
  renderCalendar();
})

btnNext.addEventListener("click", () => {
  days.innerHTML = "";
  date.setMonth(date.getMonth() + 1);
  renderMonthInfo();
  renderCalendar();
})

showTime();
renderCalendar();
renderMonthInfo();
