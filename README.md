# Daxte

Using this class you will be able to convert dates between 3 different calendars

- Gregorian
- Jalali
- Hijri

These are 3 available calendar contexts in this project. Now let's move into the code itself.

The base logic is to use date conversion methods to convert a given date to *Julian Day Number*, so it can be converted to the desired calendar later.

## Constructors
### Default Constructor
This is the default constructor that doesn't take any arguments and will get current date as its date. 
**Note:** The default calendar will be 'gregorian' in this constructor.

```javascript
const daxte = new Daxte();
```

---

### Date Object Constructor
This constructor will take a Date object as its only parameter and uses it for conversion. 
**Note:** The calendar will be 'gregorian' in this constructor.

```javascript
const date = new Date(2020, 10, 7);

const daxte = new Daxte(date);
```

---

### Date Constructor
In this constructor you can pass date in order of **Year**, **Month**, **Day** to use it for conversion.
**Note:** You need to specify the calendar of the specified date, otherwise it uses 'gregorian' as default.

```javascript
let daxte = new Daxte(1998, 1, 18);
```
```javascript
let daxte = new Daxte(1376, 10, 28, 'jalali');
```

---

## Methods
#### toJulian()
This method will return the julian day number of the instance

#### toGregorian()
#### toJalali()
#### toHijri()
These three methods are same as **to** method. They are named for an easier and meaningful usage.

```javascript
{
    year: 2020,
    month: 10,
    day: 7,
    isLeapYear: true,
    lastDayInMonth: 31
}
```

#### to(calendar)
This method will return the date in the specified calendar
