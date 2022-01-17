const time = document.querySelector('.time'),
      month = document.querySelector('.month'),
      date = document.querySelector('.date'),
      weekDays = document.querySelector('.week-days'),
      monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekDaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      days = document.querySelector('.days'),
      btnNext = document.querySelector('.btn-next'),
      btnPrev = document.querySelector('.btn-prev');

let now = new Date();

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

let thisMonth = monthsArr[now.getMonth()];

let thisYear = now.getFullYear();

let monthInfo = document.createElement('p');
monthInfo.innerHTML = `${thisMonth} ${thisYear}`;
month.append(monthInfo);

let thisWeekDay = weekDaysArr[now.getDay()];
let thisDate = now.getDate();

let dateInfo = document.createElement('p');
dateInfo.innerHTML = `${thisWeekDay}, ${thisDate} ${thisMonth} ${thisYear}`;
date.append(dateInfo);

for(let i = 0; i < weekDaysArr.length; i++) {
  weekDays.insertAdjacentHTML('beforeend', `<div class="week-day">${weekDaysArr[i].slice(0, 3)}</div>`)
}

let selectedMonth = now.getMonth();

function getLastDayOfMonth(thisYear, selectedMonth) {
  let date = new Date(thisYear, selectedMonth + 1, 0);
  return date.getDate();
}

now.setDate(1);

const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
const firstDayIndex = now.getDay();
const lastDayIndex = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDay();
const nextDays = 7 - lastDayIndex - 1;

for(let x = firstDayIndex; x > 0; x--) {
  days.insertAdjacentHTML('beforeend', `<div class="day day__prev">${prevLastDay - x + 1}</div>`);
}

for(let day = 1; day <= lastDay; day++) {
  if(day == thisDate) {
    days.insertAdjacentHTML('beforeend', `<div class="day day__active">${day}</div>`);
  } else {
    days.insertAdjacentHTML('beforeend', `<div class="day">${day}</div>`);
  }
}

for(let j = 1; j <= nextDays; j++) {
  days.insertAdjacentHTML('beforeend', `<div class="day day__next">${j}</div>`);
}

showTime();
