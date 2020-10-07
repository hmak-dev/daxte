const { div, mod } = require('../assets');
const { toGregorian: julianToGregorian, toJulian: gregorianToJulian } = require('./gregorian');

/**
 * Extra info about jalali year
 * @param year
 * @returns {{gregYear: number, leap: number, march: number}}
 */
function jalaliCalendar(year) {
    const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    const bl = breaks.length;
    const gregYear = year + 621;

    let leapJ = -14;
    let jp = breaks[0];
    let month;
    let jump;
    let leap;
    let leapG;
    let march;
    let n;
    let i;

    if (year < jp || year >= breaks[bl - 1]) throw new Error('Invalid Persian year ' + year);
    for (i = 1; i < bl; i += 1) {
        month = breaks[i];
        jump = month - jp;
        if (year < month) break;
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = month;
    }
    n = year - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
    leapG = div(gregYear, 4) - div((div(gregYear, 100) + 1) * 3, 4) - 150;
    march = 20 + leapJ - leapG;
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;

    return {
        leap,
        gregYear,
        march
    }
}

module.exports = class JalaliCalendar{
    /**
     * Returns the number of days in a month
     * @param year: number
     * @param month: number
     * @param isLeap: boolean
     * @returns {number}
     */
    static daysInMonth(year, month, isLeap) {
        return [ 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, isLeap ? 30 : 29 ][month - 1];
    }

    /**
     * Checks to see if a year is leap or not
     * @param year
     * @returns {boolean}
     */
    static isLeapYear(year) {
        return jalaliCalendar(year).leap === 1;
    }

    /**
     * Calculate the julian day number of a jalali date
     * @param year: number
     * @param month: number
     * @param day: number
     * @returns {number}
     */
    static toJulian(year, month, day) {
        let r = jalaliCalendar(year);
        return gregorianToJulian(r.gregYear, 3, r.march) + (month - 1) * 31 - div(month, 7) * (month - 7) + day - 1;
    }

    /**
     * Convert a julian day number to a jalali date object
     * @param julianDayNumber: number
     * @returns {{year: number, month: number day: number, isLeapYear: boolean, daysInMonth: number}}
     */
    static toJalali(julianDayNumber) {
        const gregYear = julianToGregorian(julianDayNumber).year;
        let year = gregYear - 621;
        const r = jalaliCalendar(year);
        const jdn1f = gregorianToJulian(gregYear, 3, r.march);

        let k = julianDayNumber - jdn1f;
        let day;
        let month;

        const isLeapYear = r.leap === 1;

        if (k >= 0) {
            if (k <= 185) {
                month = 1 + div(k, 31);
                day = mod(k, 31) + 1;
                return {
                    year,
                    month,
                    day,
                    isLeapYear,
                    daysInMonth: JalaliCalendar.daysInMonth(year, month, isLeapYear),
                };
            } else {
                k -= 186;
            }
        } else {
            year -= 1;
            k += 179;
            if (r.leap === 1) k += 1;
        }
        month = 7 + div(k, 30);
        day = mod(k, 30) + 1;

        return {
            year,
            month,
            day,
            isLeapYear,
            daysInMonth: JalaliCalendar.daysInMonth(year, month, isLeapYear),
        };
    }
};
