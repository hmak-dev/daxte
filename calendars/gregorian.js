const { div, mod } = require('../assets');

module.exports = {
    /**
     * Returns the number of days in a month
     * @param year: number
     * @param month: number
     * @param isLeap: boolean
     * @returns {number}
     */
    daysInMonth(year, month, isLeap) {
        return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    },

    /**
     * Checks to see if a year is leap or not
     * @param year
     * @returns {boolean}
     */
    isLeapYear(year) {
        return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    },

    /**
     * Calculate the julian day number of a gregorian date
     * @param year: number
     * @param month: number
     * @param day: number
     * @returns {number}
     */
    toJulian(year, month, day) {
        return div((year + div(month - 8, 6) + 100100) * 1461, 4) +
                div(153 * mod(month + 9, 12) + 2, 5) + day - 34840408 -
                div(div(year + 100100 + div(month - 8, 6), 100) * 3, 4) + 752;
    },

    /**
     * Convert a julian day number to a gregorian date object
     * @param julianDayNumber: number
     * @returns {{year: number, month: number day: number, isLeapYear: boolean, daysInMonth: number}}
     */
    toGregorian(julianDayNumber) {
        let j;
        let i;
        let day;
        let month;
        let year;

        j = 4 * julianDayNumber + 139361631;
        j = j + div(div(4 * julianDayNumber + 183187720, 146097) * 3, 4) * 4 - 3908;
        i = div(mod(j, 1461), 4) * 5 + 308;

        day = div(mod(i, 153), 5) + 1;
        month = mod(div(i, 153), 12) + 1;
        year = div(j, 1461) - 100100 + div(8 - month, 6);

        const isLeapYear = this.isLeapYear(year);
        const daysInMonth = this.daysInMonth(year, month, isLeapYear);

        return {
            year,
            month,
            day,
            isLeapYear,
            daysInMonth,
        };
    },
};
