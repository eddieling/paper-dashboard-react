const listOfStates = ['Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'];

const listOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const listOfDays = Array.from({ length: 31 }, (v, k) => k + 1);
const listOfYears = (Array.from({ length: 120 }, (v, k) => k + 1901)).reverse();

const countryList = require('country-list');
const listOfCountries = countryList.getNames().sort();
listOfCountries.unshift("Malaysia");

export { listOfStates, listOfMonths, listOfDays, listOfYears, listOfCountries };
