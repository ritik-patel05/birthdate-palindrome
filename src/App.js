import './App.css';
import { useState } from 'react';

function App() {
	const getReverseString = (string) => {
		return string.split('').reverse().join('');
	};

	const isPalindrome = (string) => {
		return string === getReverseString(string);
	};

	const getDateAsString = (date) => {
		let { day, month, year } = date;

		if (day < 10) {
			day = '0' + day;
		} else {
			day = day.toString();
		}

		if (month < 10) {
			month = '0' + month;
		} else {
			month = month.toString();
		}

		if (year < 10) {
			year = '0' + year;
		} else {
			year = year.toString();
		}

		return { day, month, year };
	};

	const getAllDateVariations = (date) => {
		let { day, month, year } = date;
		let ddmmyyyy = day + month + year;
		let mmddyyyy = month + day + year;
		let yyyymmdd = year + month + day;
		let ddmmyy = day + month + year.slice(-2);
		let mmddyy = month + day + year.slice(-2);
		let yyddmm = year.slice(-2) + day + month;

		return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
	};

	const checkAllDatesPalindrome = (date) => {
		let allDateVariationsList = getAllDateVariations(date);
		let palindromeResultList = [];

		for (const value of allDateVariationsList) {
			let result = isPalindrome(value);
			palindromeResultList.push(result);
		}

		return palindromeResultList;
	};

	const isLeapYear = (year) => {
		if (year % 400 === 0) return true;
		if (year % 100 === 0) return false;
		if (year % 4 === 0) return true;

		return false;
	};

	const getNextDate = (date) => {
		let { day, month, year } = date;
		day += 1;

		let daysForMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		if (month === 2) {
			if (isLeapYear(year)) {
				if (day > 29) {
					day = 1;
					month++;
				}
			} else {
				if (day > daysForMonth[month - 1]) {
					day = 1;
					month++;
				}
			}
		} else {
			if (day > daysForMonth[month - 1]) {
				day = 1;
				month++;
			}
		}

		if (month > 12) {
			month = 1;
			year++;
		}

		return {
			day,
			month,
			year,
		};
	};

	const getNextPalindromeDate = (date) => {
		let daysPassed = 0;

		while (1) {
			date = getNextDate(date);
			daysPassed++;

			let dateStr = getDateAsString(date);
			let resultList = checkAllDatesPalindrome(dateStr);

			for (let result of resultList) {
				if (result) return [daysPassed, date];
			}
		}
	};

	// Previous
	const getPrevDate = (date) => {
		let { day, month, year } = date;
		day -= 1;

		let daysForMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		if (day === 0) {
			month--;

			if (month === 0) {
				day = 31;
				month = 12;
				year--;
			} else if (month === 2) {
				if (isLeapYear(year)) {
					day = 29;
				} else {
					day = 28;
				}
			} else {
				day = daysForMonth[month - 1];
			}
		}

		return {
			day,
			month,
			year,
		};
	};

	const getPrevPalindromeDate = (date) => {
		let daysPassed = 0;

		while (1) {
			date = getPrevDate(date);
			daysPassed++;

			let dateStr = getDateAsString(date);
			let resultList = checkAllDatesPalindrome(dateStr);

			for (let result of resultList) {
				if (result) return [daysPassed, date];
			}
		}
	};

	const checkMyBirthday = () => {
		console.log(birthday);

		if (!birthday) {
			setResult('Invalid Birthday!');
			return;
		}

		let dateList = birthday.split('-');
		let [yyyy, mm, dd] = dateList;

		console.log(yyyy, mm, dd);

		let date = {
			day: Number(dd),
			month: Number(mm),
			year: Number(yyyy),
		};

		console.log(date);

		let dateStr = getDateAsString(date);
		let result = checkAllDatesPalindrome(dateStr);
		let isPalindrome = false;
		console.log('heree');
		for (let res of result) {
			if (res) {
				isPalindrome = true;
				break;
			}
		}
		console.log('hereeee too', isPalindrome);

		if (!isPalindrome) {
			console.log('ehyyy');
			const [nextDays, nextDate] = getNextPalindromeDate(date);
			const [prevDays, prevDate] = getPrevPalindromeDate(date);

			if (prevDays < nextDays) {
				setResult(
					`The nearest palindrome date is ${prevDate.day}-${
						prevDate.month
					}-${prevDate.year}. You missed it by ${prevDays} ${
						prevDays === 1 ? 'day' : 'days'
					}.`
				);
			} else {
				setResult(
					`The nearest palindrome date is ${nextDate.day}-${
						nextDate.month
					}-${nextDate.year}. You missed it by ${nextDays} ${
						nextDays === 1 ? 'day' : 'days'
					}.`
				);
			}
		} else {
			setResult('YUUUPPIIIEIEEE!!! Your Birthday is a Palindrome....');
		}
	};

	const [birthday, setBirthday] = useState('');
	const [result, setResult] = useState('');

	return (
		<main>
			<h1>Palindrome Birthday</h1>
			<p>Find next nearest Palindrome Birthday</p>
			<input
				onChange={(event) => setBirthday(event.target.value)}
				type='date'
			/>
			<button onClick={checkMyBirthday}>Check My Birthday</button>
			<div>{result}</div>
		</main>
	);
}

export default App;
