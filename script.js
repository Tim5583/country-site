const cards = document.querySelector(".cards");
const userSearch = document.querySelector("#search-country");
const userSelectedRegion = document.querySelector("#region");
const header = document.querySelector("h1");
const body = document.querySelector("body");
const themeChangeBtn = document.querySelector(".theme");


themeChangeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
});

// function eventListenerToCards() {

// }


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


function getAllCountries() {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(countries => {
        for (let country of countries) {
            createCard(country);
        }
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
            console.log(data)
            for (let country of data) {
                createCard(country);
            }
        });
    }

})


header.addEventListener("click", () => {
    cards.innerHTML = null;
    getAllCountries()
});

// getAllCountries();