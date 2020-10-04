module.exports = class XDate {
    static convert(dateStr, to = 'persian', from = "gregorian", join = true) {
        let date = '', time = '';
        [date, time] = dateStr.split(' ');

        let xd = new XDate(...date.split('-').map(p => parseInt(p) || 0), from);
        xd = xd.toContext(to);
        date = `${xd.year}/${xd.month}/${xd.day}`;

        if (!join)
            return [[xd.year, xd.month, xd.day], time]

        return [date, time];
    }

    // General Constructor
    constructor(a, b, c, d) {
        // Set default context
        this.context = "gregorian";

        // If no parameters were given or only a context was passed
        if (a === undefined || typeof a === "string") {
            var ctx = this.context;

            // If the second parameter was a string
            if (a !== undefined && typeof a === "string") {
                ctx = a;

                // Check if the context is a valid context
                if (!["gregorian","persian","hijri"].includes(this.context)) {
                    throw `Invalid context '${this.context}'`;
                }
            }

            // Create a new date
            a = new Date;

            // Get new date data as the input data
            this.day = a.getDate();
            this.month = a.getMonth() + 1;
            this.year = a.getFullYear();

            // Generate julian day number
            this.generateJulianDayNumber();

            // Convert to context
            this.convertContext(ctx);

            // If only a date was give
        } else if (a instanceof Date && c === undefined && d === undefined) {
            // If the second parameter was a string
            if (b !== undefined && typeof b === "string") {
                // Use that as the context
                this.context = b;

                // Check if the context is a valid context
                if (!["gregorian","persian","hijri"].includes(this.context)) {
                    throw `Invalid context '${this.context}'`;
                }
            }

            // Get date parameters
            this.day = a.getDate();
            this.month = a.getMonth() + 1;
            this.year = a.getFullYear();

            // Generate julian day number
            this.generateJulianDayNumber();

            // Convert to context
            this.toContext();

            // If a number was given
        } else if (typeof a === "number" && c === undefined && d === undefined) {
            // If the second parameter was a string
            if (b !== undefined && typeof b === "string") {
                // Use that as the context
                this.context = b;

                // Check if the context is a valid context
                if (!["gregorian","persian","hijri"].includes(this.context)) {
                    throw `Invalid context '${this.context}'`;
                }
            }

            // Use the first number paramter as julian day number
            this.jdn = a;

            // Convert the jdn to the current context and get date parameters
            var date = this.toContext();
            this.year = date.year;
            this.month = date.month;
            this.day = date.day;

            // If all parameters were given
        } else if (a !== undefined && b !== undefined && c !== undefined && d !== undefined) {
            // Check if the last parameter is a valid context
            if (!["gregorian","persian","hijri"].includes(d)) {
                throw `Invalid context '${d}'`;
            }

            // Set the parameters to date paramters
            this.year = a;
            this.month = b;
            this.day = c;
            this.context = d;

            // Generate julian day number
            this.generateJulianDayNumber();

            // Otherwise it is an invalid parameter case
        } else {
            throw `Invalid parameters`;
        }
    }


    // Create a clone of this class
    clone() {
        return new XDate(this.jdn, this.context);
    }


    // Generates a new julian day number from the current date parameters
    generateJulianDayNumber() {
        if (this.context === "gregorian") {
            this.jdn = this.g2d(this.year, this.month, this.day);
        } else if (this.context === "persian") {
            this.jdn = this.p2d(this.year, this.month, this.day);
        } else if (this.context === "hijri") {
            this.jdn = this.h2d(this.year, this.month, this.day);
        }
    }

    // This will return the day of week based on julian day number
    dayOfWeek(fix = 1) {
        return Math.floor(this.mod(this.jdn + fix, 7));
    }


    // Converts the context to a new context
    convertContext(context, createClone = false) {
        // Check to ensure a context is given
        if (context === undefined) throw "Invalid Context";

        // Get date paramters in a new context
        var date = this.toContext(context);

        // If should create a clone
        if (createClone) {
            // Create a new XDate with new date parameters
            return new XDate(date.year, date.month, date.day, context);
        } else {
            // Update date parameters
            this.year = date.year;
            this.month = date.month;
            this.day = date.day;
            this.context = context;

            return this;
        }
    }
    // Get date parameters in a new context
    toContext(context) {
        // If no context was given, use current context
        if (context === undefined) context = this.context;

        if (context === "gregorian") {
            return this.d2g(this.jdn);
        } else if (context === "persian") {
            return this.d2p(this.jdn);
        } else if (context === "hijri") {
            return this.d2h(this.jdn);
        }
    }


    // Offset by day
    offsetDays(days, createClone = false) {
        // If should create a clone
        if (createClone) {
            // Create a new XDate with adding days to julian day number
            return new XDate(this.jdn + days, this.context);
        } else {
            // Add days to the julian day number
            this.jdn += days;

            // Recreate the date parameters in this context
            var date = this.toContext();
            this.year = date.year;
            this.month = date.month;
            this.day = date.day;

            return this;
        }
    }
    // Offset by month
    offsetMonths(months, createClone = false) {
        // Get current year and month
        var year = this.year, month = this.month;

        // if months is not 0
        if (months != 0) {
            // If months amount is greater than a year
            if (months >= 12 || months <= -12) {
                // Add years amount of this months to the years parameters
                year += (months < 0 ? Math.ceil : Math.floor)(months / 12);

                // Add remaining months to the month
                month += months % 12;
            } else {
                // Add months to the months of this year
                month += months;
            }

            // If the month is less than 1 or greater than 12, fix the year
            if (month < 1) {
                month = 12 - month;
                year--;
            } else if (month > 12) {
                month = month - 12;
                year++;
            }
        }

        // If should create a clone
        if (createClone) {
            // Create a new XDate with new date parameters
            return new XDate(year, month, this.day, this.context);
        } else {
            // Update date parameters
            this.year = year;
            this.month = month;

            // Generate julian day number
            this.generateJulianDayNumber();

            return this;
        }
    }
    // Offset by year
    offsetYears(years, createClone = false) {
        // Add years to the year parameter
        var year = this.year + years;

        // If should create clone
        if (createClone) {
            // Create a new XDate with new date parameters
            return new XDate(year, this.month, this.day, this.context);
        } else {
            // Update date parameters
            this.year = year;

            // Generate julian day number
            this.generateJulianDayNumber();

            return this;
        }
    }


    // These 3 Methods are similar to "toContext" method, but with their context name [Less generic]
    toPersian() {
        return this.d2p(this.jdn);
    }
    toGregorian() {
        return this.d2g(this.jdn);
    }
    toHijri() {
        return this.d2h(this.jdn);
    }

    // This will return the julian day number
    toJulian() {
        return this.jdn;
    }
}
