const cards = document.querySelector(".cards");
const userSearch = document.querySelector("#search-country");
const userSelectedRegion = document.querySelector("#region");
const header = document.querySelector("h1");
const body = document.querySelector("body");
const themeChangeBtn = document.querySelector(".theme");
const searchOpctions = document.querySelector(".form-inputs");


themeChangeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
});

function eventListenerToCards() {
    cards.childNodes.forEach(item => {
        item.addEventListener("click", (e) => {
            fetch(`https://restcountries.com/v3.1/name/${e.target.innerText}?fullText=true`)
            .then(res => res.json())
            .then(data => {
                createLargeCard(data[0]);
                searchOpctions.classList.add("hidden");
            });
        });
    });
}


function createCard(country) {
    const div = document.createElement("div");
    div.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        <div class="card-details">
            <h2>${country.name.common}</h2>
            <p><span class="title">Population: </span>${country.population}</p>
            <p><span class="title">Region: </span>${country.region}</p>
            <p><span class="title">Capital: </span>${country.capital}</p>
        </div>
    `;
    div.classList.add("card");
    cards.append(div);
}


function createLargeCard(country) {
    const div = document.createElement("div");
    div.classList.add("country-info-card");
    div.innerHTML = `
    <div class="country-info__flag">
    <button class="backBtn" onclick="window.history.back()"><i class="fa-regular fa-circle-left"></i>Back</button>
    <img src="${country.flags.svg}" alt="${country.name.common} flag png">
    </div>
    <div class="country-info__details">
        <h2>${country.name.official}</h2>
        <div class="country-details-row">
            <div class="country-details-col">
                <p><span class="country-span-title">Native Name: </span>${country.name.common}</p>
                <p><span class="country-span-title">Population: </span>${country.population}</p>
                <p><span class="country-span-title">Region: </span>${country.region}</p>
                <p><span class="country-span-title">Sub Regin: </span>${country.subregion}</p>
                <p><span class="country-span-title">Capital: </span>${country.capital}</p>
            </div>
            <div class="country-details-col col-2">
                <p><span class="country-span-title">Top Level Domain: </span>${country.tld}</p>
                <p><span class="country-span-title">Currencies: </span>${country.currencies[Object.keys(country.currencies)[0]].name}</p>
                <p><span class="country-span-title">Languages: </span>${Object.values(country.languages)}</p>
            </div>
        </div>
    </div>
    `;

    const countryBorder = document.createElement("div");
    countryBorder.classList.add("country-border");
    countryBorder.innerHTML = `<p class="country-span-title">Border Countrys: </p>`;

    const countryBorderBtns = document.createElement("div");
    countryBorderBtns.classList.add("country-border__buttons");
    
    for (let border in country.borders) {
        let border_i = country.borders[border]
        console.log(border_i);
        fetch(`https://restcountries.com/v2/alpha/${border_i}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.name);
            countryBorderBtns.innerHTML += `<button>${data.name}</button>`;
            countryBorder.append(countryBorderBtns);

            div.innerHTML += countryBorder;

            cards.innerHTML = null;
            cards.append(div);
            console.log(countryBorder);
            console.log(countryBorderBtns);
        });
    }
}


function getAllCountries() {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(countries => {
        for (let country of countries) {
            createCard(country);
        }
        eventListenerToCards();
        searchOpctions.classList.remove("hidden");
    });
}


userSearch.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        cards.innerHTML = null;
        fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
        .then(res => res.json())
        .then(data => {
            for (let country of data) {
                createCard(country)
            }
            eventListenerToCards();
        });
        e.target.value = null;
    }
});


userSelectedRegion.addEventListener("change", (e) => {
    const region = e.target.value;
    if (region !== "") {
        cards.innerHTML = null;
        fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => {
            for (let country of data) {
                createCard(country);
            }
            eventListenerToCards();
        });
    }
})


header.addEventListener("click", () => {
    cards.innerHTML = null;
    getAllCountries()
});

getAllCountries();
