import React, { useState, useEffect } from 'react'
import moment from 'moment'
import buildCalendar from "./buildCal";
import Tasks from './Tasks.js';
import './Calendar.css'

const Calendar = ({ value, onChange }) => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            priority: 5,
            exp: 10,
            sDate: 'test',
            reminder: true,
        },
        {
            id: 2,
            text: 'Homework',
            priority: 4,
            exp: 8,
            sDate: 'test',
            reminder: true,
        },
        {
            id: 3,
            text: 'Cook',
            priority: 3,
            exp: 6,
            sDate: 'test',
            reminder: true,
        }
    ])
    const [startDate, setStartDate] = useState( ()=>
        {return 0}
    )
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value])

    const mon = [];
    const firstMonth = value.clone().startOf("year").month();
    const lastMonth = value.clone().endOf("year").month();
    function getMonthName() {
        for (let i = firstMonth; i <= lastMonth; ++i)
            mon.push(i)
        return mon;
    }
    function currMonthName() {
        return value.format("MMM");
    }
    function currYear() {
        return value.format("YYYY");
    }
    function nextMonth() {
        return value.clone().add(1, "month")
    }
    function prevMonth() {
        return value.clone().subtract(1, "month")
    }
    function setMonthName(arg) {
        return value.clone().month(arg)
    }
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }
    const showDate = (year, month, selectedDate) => {
        const currDate = [startDate];
        var day = moment([year, month, selectedDate]).month(month).format("YYYY-MM-DD")
        currDate.sDate = day.toString()
        setStartDate(currDate);
    }

    function getCurrentDate() {
        return value.format("MMM-DD")
    }

    return (
        <div className="wrapper">

            <div className="calendar">
                    <div className="monthSelect">
                        {getMonthName().map(mons =>
                            <div key={mons} className={value.isSame(value.clone().month(mons), "month") ? "selectedMonth" : ""} onClick={() => onChange(setMonthName(mons))}>
                                {moment().month(mons).format("MMM")}
                            </div>)}
                    </div>
                <div className="Cal2">
                    <div className="Months">
                        <i className="fas fa-angle-left prev" onClick={() => onChange(prevMonth())}></i>
                            <h1>{currMonthName()} {currYear()} </h1>
                        <i className="fas fa-angle-right next" onClick={() => onChange(nextMonth())}></i>
                    </div>
                    <div className="Weeks">
                        <div>SUN {currMonthName()}</div>
                        <div>MON</div>
                        <div>TUE</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                    </div>
                    <div className="DaysContainer">
                        {calendar.map(week => <div key={week.toString()} className="Days">{
                            week.map(day => <div key={day} className={(!(day.clone().month() === value.clone().month())) ? "prevDays" : (((day.year()=== moment().year())&&(day.date()=== moment().date()) && (value.clone().month() === moment().month()))) ? "selected" : "dy"} onClick={() => showDate(day.year(), day.month(), day.date())}>
                                {/* {console.log(day.date(), "same day?" , moment().date(), "Bool: ", value.isSame(day.date(), moment().date()))}
                                {console.log(value.month(), "same month?" , moment().month())} */}
                                <div> {day.clone().format("D").toString()} </div>
                            </div>)
                        }
                        </div>)}
                    </div>
                </div>
            </div>

          <Tasks tasks={tasks} startDate={startDate} onDelete={deleteTask} /> 
        </div>
    )
}
export default Calendar
