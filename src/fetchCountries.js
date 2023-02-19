async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages
`);
    const countries = await response.json();
    return countries
}
export { fetchCountries };