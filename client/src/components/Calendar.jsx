import { useState } from 'react';
import HoursEditor from './HoursEditor';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDate = new Date(currentYear, currentMonth);
  const firstDay = firstDate.getDay();

  const dates = [];
  for (let i = 0; i < 42; i++) {
    if (i < firstDay) {
      dates.push({ day: "", month: "prev" });
    } else if (i >= firstDay + daysInMonth) {
      dates.push({ day: "", month: "next"});
    } else {
      dates.push({ day: i - firstDay + 1, month: "current" });
    }
  }

  const toPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentDate(new Date(currentYear - 1, 11));
    } else {
      setCurrentDate(new Date(currentYear, currentMonth - 1));
    }
  };

  const toNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentDate(new Date(currentYear + 1, 0));
    } else {
      setCurrentDate(new Date(currentYear, currentMonth + 1));
    }
  };

  const onTaskClick = (date) => {
    if (date.month === 'prev') {
      toPrevMonth();
    } else if (date.month === 'next') {
      toNextMonth();
    } else {
      setSelectedDate(new Date(currentYear, currentMonth, date.day));
    }
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={toPrevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString("en-US", { month: "long"}) + " " + currentYear}</h2>
        <button onClick={toNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="grid">
        {dates.map((date, index) => (
          <div
            key={index}
            onClick={() => onTaskClick(date)}
            style={{ cursor: "pointer" }}
          >
            {date.day}
          </div>
        ))}
      </div>
      {selectedDate && <HoursEditor date={selectedDate} onClose={() => setSelectedDate(null)} />}
    </div>
  );
}