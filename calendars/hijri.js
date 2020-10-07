const epoch = 1948439.5;

module.exports = class HijriCalendar {
    /**
     * Returns the number of days in a month
     * @param year: number
     * @param month: number
     * @param isLeap: boolean
     * @returns {number}
     */
    static daysInMonth(year, month, isLeap) {
        return [1,3,5,7,9,11].includes(month) || (month === 12 && isLeap) ? 30 : 29;
    }

    /**
     * Checks to see if a year is leap or not
     * @param year
     * @returns {boolean}
     */
    static isLeapYear(year) {
        return [2,5,7,10,13,16,18,21,24,26,29].includes(year % 30);
    }

    /**
     * Calculate the julian day number of a hijri date
     * @param year: number
     * @param month: number
     * @param day: number
     * @returns {number}
     */
    static toJulian(year, month, day) {
        return (day + Math.ceil(29.5 * (month - 1)) + (year - 1) * 354 + Math.trunc((3 + (11 * year)) / 30) + epoch) - 1;
    }

    /**
     * Convert a julian day number to a hijri date object
     * @param julianDayNumber: number
     * @returns {{year: number, month: number day: number, isLeapYear: boolean, daysInMonth: number}}
     */
    static toHijri(julianDayNumber) {
        const jdn = Math.trunc(julianDayNumber) + 0.5;

        const year = Math.trunc(((30 * (jdn - epoch)) + 10646) / 10631);
        const month = Math.min(12, Math.ceil((jdn - (29 + HijriCalendar.toJulian(year, 1, 1))) / 29.5) + 1);
        const day = Number(jdn - HijriCalendar.toJulian(year, month, 1)) + 1;

        const isLeapYear = HijriCalendar.isLeapYear(year);
        const daysInMonth = HijriCalendar.daysInMonth(year, month, isLeapYear);

        return {
            year,
            month,
            day,
            isLeapYear,
            daysInMonth
        };
    }
};