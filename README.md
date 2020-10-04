# XDate

Using this class you will be able to convert dates between 3 different calendars

- gregorian
- persian
- hijri

These are 3 available calendar contexts in this project. Now let's move into the code itself.

## Constructors
There are multiple constructors as you see below:

This is the default constructor that doesn't take any arguments and will get current date as its initial date

```javascript
let xd = new XDate();
```

There is another constructor that will take a Date object as its only parameter and uses it as initial date

```javascript
let d = new Date(2019, 10, 23);

let xd = new XDate(d);
```

In this constructor you can pass date components in order of **Year**, **Month**, **Day** and this will be the initial date

```javascript
let xd = new XDate(1998, 2, 15);
```

This one is a bit more complex and requires a basic understanding of **Julian Calendar**. This constructor will take a number for *Julian Day Number* and converts it to the corresponding date

```javascript
let xd = new XDate(2458528);
```

###### Note:
In all of these constructors you specify an initial context for your date object in the last parameters like this. Notice that the default context is **gregorian** if you don't specify the context.

```javascript
let xd = new XDate("persian");
```
```javascript
let d = new Date(2019, 10, 23);
let xd = new XDate(d, "gregorian");
```
```javascript
let xd = new XDate(1440, 3, 18, "hijri");
```
```javascript
let xd = new XDate(2458528, "persian");
```

---

## Methods
### clone()
This method will create a clone of your XDate object into another separate one

### generateJulianDayNumber()
This method will generate a julian day number based on context and date components in this instance

### dayOfWeek(fix = 1)
This method will return the week day of the current date. The fix parameter is used for offseting the output

---

### convertContext(context, createClone = false)
This will convert date components into the given context
If you set createClone parameter to **true** this will return a new instance and the current instance will remain unchanged

### toContext(context)
This method will return new date components in the given context, and the output will be like:

```javascript
{
    year: 2018,
    month: 6,
    day: 9,
    weekDay: 4,
    lastDayInMonth: 30
}
```

---

### offsetDays(days, createClone = false)
This method will offset the current date by days. The day parameter can be a negative or positive day count

### offsetMonths(months, createClone = false)
This method will offset the current date by months. The months parameter can be a negative or positive month count

### offsetYears(years, createClone = false)
This method will offset the current date by years. The years parameter can be a negative or positive year count

###### Note:
The **createClone** parameter in these three methods will act just like **convertContext** method

---

### toGregorian()
### toPersian()
### toHijri()
These three methods are same as **toContext** method but they are named for an easier and meaningful usage

### toJulian()
This method will return the julian day number of the instance date

---

## Helper Methods
### persianCal(jy)
This method is for creating a persian calendar to check for leap years and other exceptions

### p2d(py, pm, pd)
This method will get a persian date in 3 parameters and retrns its Julian Day Number

### d2p(jdn)
This method will get a Julian Day Number and returns the corresponding persian date

---

### g2d(gy, gm, gd)
This method will get a gregorian date in 3 parameters and retrns its Julian Day Number

### d2g(jdn)
This method will get a Julian Day Number and returns the corresponding gregorian date

----

### h2d(hy, hm, hd)
This method will get a hijri date in 3 parameters and retrns its Julian Day Number

### d2h(jdn)
This method will get a Julian Day Number and returns the corresponding hijri date