const hijri = require('./calendars/hijri');
const jalali = require('./calendars/jalali');
const gregorian = require('./calendars/gregorian');

class Daxte {
    jdn = 0;

    /**
     * Create a Daxte instance
     * @param year { Date | string | number }
     * @param month { string | number }
     * @param day { string | number }
     * @param calendar { 'gregorian' | 'jalali' | 'hijri' }
     */
    constructor(year, month, day, calendar = 'gregorian') {
        if (calendar) {
            let y, m, d;

            if (year === undefined) {
                year = new Date;
            }

            if (year instanceof Date) {
                calendar = 'gregorian';

                y = year.getFullYear();
                m = year.getMonth() + 1;
                d = year.getDate();
            } else {
                if (typeof year === 'string' && typeof month === 'string' && typeof day === 'string') {
                    [y, m, d] = [year, month, day].map(parseInt);
                } else if (typeof year === 'number' && typeof month === 'number' && typeof day === 'number') {
                    [y, m, d] = [year, month, day];
                } else {
                    throw new Error('Invalid parameters provided to Daxte')
                }
            }

            if (calendar === 'gregorian') {
                this.jdn = gregorian.toJulian(y, m, d);
            } else if (calendar === 'jalali') {
                this.jdn = jalali.toJulian(y, m, d);
            } else if (calendar === 'hijri') {
                this.jdn = hijri.toJulian(y, m, d);
            } else {
                throw new Error(`'${cal}' calendar is not supported.`);
            }
        } else {
            throw new Error(`Calendar is not specified.`);
        }
    }

    /**
     * Convert the current instance to a calendar
     * @param calendar { 'gregorian' | 'jalali' | 'hijri' }
     * @returns {{year: number, month: number, day: number, isLeapYear: boolean, daysInMonth: number}}
     */
    to(calendar) {
        const cal = typeof calendar === 'string' ? calendar.toLowerCase() : null;

        if (cal) {
            if (cal === "gregorian") {
                return this.toGregorian();
            } else if (cal === "jalali") {
                return this.toJalali();
            } else if (cal === "hijri") {
                return this.toHijri();
            } else {
                throw new Error(`'${cal}' calendar is not supported.`);
            }
        } else {
            throw new Error(`Calendar is not specified.`);
        }

    }

    /**
     * Get the julian day number of the current instance
     * @returns {number}
     */
    toJulian() {
        return this.jdn;
    }

    /**
     * Get this instance in gregorian calendar
     * @returns {{year: number, month: number, day: number, isLeapYear: boolean, daysInMonth: number}}
     */
    toGregorian() {
        return gregorian.toGregorian(this.jdn);
    }

    /**
     * Get this instance in jalali calendar
     * @returns {{year: number, month: number, day: number, isLeapYear: boolean, daysInMonth: number}}
     */
    toJalali() {
        return jalali.toJalali(this.jdn);
    }

    /**
     * Get this instance in hijri calendar
     * @returns {{year: number, month: number, day: number, isLeapYear: boolean, daysInMonth: number}}
     */
    toHijri() {
        return hijri.toHijri(this.jdn);
    }
}

module.exports = Daxte;