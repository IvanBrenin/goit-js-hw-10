import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import {Notify } from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.input.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY))




function getCountry(event) {
    searchQuery = event.target.value.trim()

    if (!searchQuery) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }
    
    const promise = fetchCountries(searchQuery)
    promise
        .then(response => {
            if (response.status === 404) {
                throw new Error('Network response was not ok');
            }
            return response
        })
        .then(countries => {
            if (countries.length > 10) {
                Notify.warning('Too many matches found. Please enter a more specific name.')
                refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = '';
            } else if (countries.length >= 2 && countries.length <= 10) {
                renderCountryList(countries)
                refs.countryInfo.innerHTML = '';
            } else if (countries.length === 1) {
                renderCountryInfo(countries[0]);
                refs.countryList.innerHTML = '';
            }
        }).catch(error => {
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
            Notify.failure('Oops, there is no country with that name')
        })
        
}


const renderCountryList = countries => {
    const markup = countries.map(country => `
        <li>
            <img src="${country.flags.svg}" alt="${country.flags.alt}" width="50" height="30">
            <span>${country.name.official}</span></li>
        `).join('');
        refs.countryList.innerHTML = markup;
};
      
const renderCountryInfo = country => {
        console.log()
        const languages = Object.values(country.languages).map(language => language).join(', ');
        const markup = `
          <div>
            <img src="${country.flags.svg}" alt="${country.flags.alt}" width="150" height="100">
            <h2>${country.name.official}</h2>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${languages}</p>
          </div>
        `;
        refs.countryInfo.innerHTML = markup;
    };