const countrySelectElement = document.getElementById('country-select');
const countryInfoElement = document.querySelector('.country-info');

async function fetchCountryList() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        data.forEach(country => {
            const countryName = country.name.common;
            const option = document.createElement('option');
            option.value = countryName;
            option.textContent = countryName;
            countrySelectElement.appendChild(option);
        });

        countrySelectElement.addEventListener('change', () => {
            const selectedCountryName = countrySelectElement.value;
            const selectedCountry = data.find(country => country.name.common === selectedCountryName);

            if (selectedCountry) {
                const { capital, population, languages } = selectedCountry;

                const countryInfoHTML = `
                    <div class="country-card">
                        <h2>${selectedCountryName}</h2>
                        <p><strong>Capital:</strong> ${capital ? capital[0] : 'N/A'}</p>
                        <p><strong>Population:</strong> ${population ? population.toLocaleString() : 'N/A'}</p>
                        <p><strong>Languages:</strong> ${languages ? Object.values(languages).join(', ') : 'N/A'}</p>
                    </div>
                `;

                countryInfoElement.innerHTML = countryInfoHTML;
            }
        });
    } catch (error) {
        console.error('Error fetching country data:', error);
        countryInfoElement.innerHTML = '<p>Error loading country information.</p>';
    }
}

fetchCountryList();
