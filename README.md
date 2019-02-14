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
In all of these constructors you specify an initial context for your date object in the last parameters like this:
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