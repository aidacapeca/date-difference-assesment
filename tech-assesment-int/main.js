/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. 
 * All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. 
 * If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/

const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

const MonthsDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
};

const isLeapYear = (year) => {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
}

const getDiffMessage = (years, months, days) => {
    //  Reference: '1 year, 3 months, total 458 days'
    let message = '';
    if (years > 0) {
        message = (years === 1) ? `${message}1 year, ` : `${message}${years} years, `;
    }
    if (months > 0) {
        message = (months === 1) ? `${message}1 month, ` : `${message}${months} months, `;
    }
    message = (days === 1) ? `${message} total 1 day` : `${message}total ${days} days`;
    return message;
}

const separateDates = (dates) => {
    const [_initDay, _initMonth, _initYear] = dates[0].split(".").map(Number);
    const [_finalDay, _finalMonth, _finalYear] = dates[1].split(".").map(Number);
    return { _initDay, _initMonth, _initYear, _finalDay, _finalMonth, _finalYear };
}

const getDateDifference = (dates) => {
    const { _initDay, _initMonth, _initYear, _finalDay, _finalMonth, _finalYear } = separateDates(dates);
    
    let yearsDiff = _finalYear - _initYear;
    let monthsDiff = _finalMonth - _initMonth;
    let daysDiff = 0;

    const _initalDaysDiff = _finalDay - _initDay;    
    const _finalDaysExtra = MonthsDays[_finalMonth] - _finalDay


    if (monthsDiff < 0 || (monthsDiff === 0 && _initalDaysDiff < 0)) {
        yearsDiff--;
        if (monthsDiff < 0) {
            monthsDiff += 12;
        }
    }
    if (_initalDaysDiff < 0 && monthsDiff > 0) {
        monthsDiff--;
    }

    for (let currentYear = _initYear; currentYear <= _finalYear; currentYear++) {
        const _firstMonth = (currentYear === _initYear) ? _initMonth : 1;
        const _lastMonth = (currentYear === _finalYear) ? _finalMonth : 12;

        for (let currentMonth = _firstMonth; currentMonth <= _lastMonth; currentMonth++) {
            daysDiff += MonthsDays[currentMonth];

            if (currentMonth === 2 && isLeapYear(currentYear)) {
                daysDiff++;
            }
        }
    }

    daysDiff = daysDiff -_initDay - _finalDaysExtra;
    return {yearsDiff, monthsDiff, daysDiff};

}

// Receive string of dates one after each other
function outputDate(dates) {
   
    if (dates[0] === dates[1]) {
        return getDiffMessage(0, 0, 0)
    }
    const {yearsDiff, monthsDiff, daysDiff} = getDateDifference(dates);
    return getDiffMessage(yearsDiff, monthsDiff, daysDiff);

}