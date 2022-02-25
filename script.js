const cards = document.querySelector(".cards");
const userSearch = document.querySelector("#search-country");
const userSelectedRegion = document.querySelector("#region");
const header = document.querySelector("h1");
const body = document.querySelector("body");
const themeChangeBtn = document.querySelector(".theme");
const searchOpctions = document.querySelector(".form-inputs");


// theme changing button 
themeChangeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
});


// event listener to card when img or h2 clicked then to trigger 
function eventListenerToCards() {
    cards.childNodes.forEach(item => {
        item.addEventListener("click", (e) => {
            if (e.target.tagName === "IMG" || e.target.tagName === "H2") {
                let fullname = e.target.innerText || e.target.nextElementSibling.firstElementChild.innerText;
                fetch(`https://restcountries.com/v3.1/name/${fullname}?fullText=true`)
                .then(res => res.json())
                .then(data => {
                    cards.innerHTML = null;
                    createLargeCard(data[0]);
                    searchOpctions.classList.add("hidden");
                });
            }
        });
    });
}

// create card element
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


// create deatils country card (largecard)  
function createLargeCard(country) {
    console.log(country);
    const mainDiv = document.createElement("div");
    const countryInfoDiv = document.createElement("div");
    const countryBorderDiv = document.createElement("div");
    const countryBorderButtonsDiv = document.createElement("div");
    mainDiv.classList.add("country-info-card");
    countryInfoDiv.classList.add("country-info__details");
    countryBorderDiv.classList.add("country-border");
    countryBorderButtonsDiv.classList.add("country-border__buttons");
    mainDiv.innerHTML = `
    <div class="country-info__flag">
        <button class="backBtn"><i class="fa-regular fa-circle-left"></i>Back</button>
        <img src="${country.flags.svg}" alt="picture of ${country.name.common} flag">
    </div>
    `;
    countryInfoDiv.innerHTML = `
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
                <p><span class="country-span-title">Top Level Domain: </span>${country.tld[0]}</p>
                <p><span class="country-span-title">Currencies: </span>${country.currencies[Object.keys(country.currencies)[0]]["name"]}</p>
                <p><span class="country-span-title">Languages: </span>${country.languages[Object.keys(country.languages)[0]]}</p>
            </div>
        </div>
    `;

    countryBorderDiv.innerHTML = `<p class="country-span-title">Border Countrys: </p>`;

    if (country.borders) {
        for (let code of country.borders) {
            fetch(`https://restcountries.com/v2/alpha/${code}`)
            .then(res => res.json())
            .then(data => {
                const butEl = document.createElement("button");
                butEl.innerText = data.name;
                butEl.onclick = (e) => {
                    console.log(e.target.innerText);
                    fetch(`https://restcountries.com/v3.1/name/${e.target.innerText}?fullText=true`)
                    .then(res => res.json())
                    .then(data => {
                        cards.innerHTML = null;
                        createLargeCard(data[0]);
                    });
                }
                countryBorderButtonsDiv.append(butEl);
            })
        }
    } else {
        countryBorderButtonsDiv.append("no borders")
    }
    countryBorderDiv.append(countryBorderButtonsDiv);
    mainDiv.append(countryInfoDiv);
    countryInfoDiv.append(countryBorderDiv);
    cards.append(mainDiv);
}


// fetch all countries and append to the cards-div as cards
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


// get user inputs 
userSearch.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        cards.innerHTML = null;
        fetch(`https://restcountries.com/v3.1/name/${e.target.value}?fullText=true`)
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


// get user input for region dropdown
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


// where in the world eventlistener 
header.addEventListener("click", () => {
    cards.innerHTML = null;
    getAllCountries()
});

getAllCountries();
