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

function createLargeCard(country) {
    country = country[0];
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

// getAllCountries();

let conData = [{"name":{"common":"United States","official":"United States of America","nativeName":{"eng":{"official":"United States of America","common":"United States"}}},"tld":[".us"],"cca2":"US","ccn3":"840","cca3":"USA","cioc":"USA","independent":true,"status":"officially-assigned","unMember":true,"currencies":{"USD":{"name":"United States dollar","symbol":"$"}},"idd":{"root":"+1","suffixes":["201","202","203","205","206","207","208","209","210","212","213","214","215","216","217","218","219","220","224","225","227","228","229","231","234","239","240","248","251","252","253","254","256","260","262","267","269","270","272","274","276","281","283","301","302","303","304","305","307","308","309","310","312","313","314","315","316","317","318","319","320","321","323","325","327","330","331","334","336","337","339","346","347","351","352","360","361","364","380","385","386","401","402","404","405","406","407","408","409","410","412","413","414","415","417","419","423","424","425","430","432","434","435","440","442","443","447","458","463","464","469","470","475","478","479","480","484","501","502","503","504","505","507","508","509","510","512","513","515","516","517","518","520","530","531","534","539","540","541","551","559","561","562","563","564","567","570","571","573","574","575","580","585","586","601","602","603","605","606","607","608","609","610","612","614","615","616","617","618","619","620","623","626","628","629","630","631","636","641","646","650","651","657","660","661","662","667","669","678","681","682","701","702","703","704","706","707","708","712","713","714","715","716","717","718","719","720","724","725","727","730","731","732","734","737","740","743","747","754","757","760","762","763","765","769","770","772","773","774","775","779","781","785","786","801","802","803","804","805","806","808","810","812","813","814","815","816","817","818","828","830","831","832","843","845","847","848","850","854","856","857","858","859","860","862","863","864","865","870","872","878","901","903","904","906","907","908","909","910","912","913","914","915","916","917","918","919","920","925","928","929","930","931","934","936","937","938","940","941","947","949","951","952","954","956","959","970","971","972","973","975","978","979","980","984","985","989"]},"capital":["Washington, D.C."],"altSpellings":["US","USA","United States of America"],"region":"Americas","subregion":"North America","languages":{"eng":"English"},"translations":{"ara":{"official":"الولايات المتحدة الامريكية","common":"الولايات المتحدة"},"ces":{"official":"Spojené státy americké","common":"Spojené státy"},"cym":{"official":"United States of America","common":"United States"},"deu":{"official":"Vereinigte Staaten von Amerika","common":"Vereinigte Staaten"},"est":{"official":"Ameerika Ühendriigid","common":"Ameerika Ühendriigid"},"fin":{"official":"Amerikan yhdysvallat","common":"Yhdysvallat"},"fra":{"official":"Les états-unis d'Amérique","common":"États-Unis"},"hrv":{"official":"Sjedinjene Države Amerike","common":"Sjedinjene Američke Države"},"hun":{"official":"Amerikai Egyesült Államok","common":"Amerikai Egyesült Államok"},"ita":{"official":"Stati Uniti d'America","common":"Stati Uniti d'America"},"jpn":{"official":"アメリカ合衆国","common":"アメリカ合衆国"},"kor":{"official":"아메리카 합중국","common":"미국"},"nld":{"official":"Verenigde Staten van Amerika","common":"Verenigde Staten"},"per":{"official":"ایالات متحده آمریکا","common":"ایالات متحده آمریکا"},"pol":{"official":"Stany Zjednoczone Ameryki","common":"Stany Zjednoczone"},"por":{"official":"Estados Unidos da América","common":"Estados Unidos"},"rus":{"official":"Соединенные Штаты Америки","common":"Соединённые Штаты Америки"},"slk":{"official":"Spojené štáty Americké","common":"Spojené štáty americké"},"spa":{"official":"Estados Unidos de América","common":"Estados Unidos"},"swe":{"official":"Amerikas förenta stater","common":"USA"},"urd":{"official":"ریاستہائے متحدہ امریکا","common":"ریاستہائے متحدہ"},"zho":{"official":"美利坚合众国","common":"美国"}},"latlng":[38.0,-97.0],"landlocked":false,"borders":["CAN","MEX"],"area":9372610.0,"demonyms":{"eng":{"f":"American","m":"American"},"fra":{"f":"Américaine","m":"Américain"}},"flag":"\uD83C\uDDFA\uD83C\uDDF8","maps":{"googleMaps":"https://goo.gl/maps/e8M246zY4BSjkjAv6","openStreetMaps":"https://www.openstreetmap.org/relation/148838#map=2/20.6/-85.8"},"population":329484123,"gini":{"2018":41.4},"fifa":"USA","car":{"signs":["USA"],"side":"right"},"timezones":["UTC-12:00","UTC-11:00","UTC-10:00","UTC-09:00","UTC-08:00","UTC-07:00","UTC-06:00","UTC-05:00","UTC-04:00","UTC+10:00","UTC+12:00"],"continents":["North America"],"flags":{"png":"https://flagcdn.com/w320/us.png","svg":"https://flagcdn.com/us.svg"},"coatOfArms":{"png":"https://mainfacts.com/media/images/coats_of_arms/us.png","svg":"https://mainfacts.com/media/images/coats_of_arms/us.svg"},"startOfWeek":"sunday","capitalInfo":{"latlng":[38.89,-77.05]},"postalCode":{"format":"#####-####","regex":"^\\d{5}(-\\d{4})?$"}},{"name":{"common":"Tanzania","official":"United Republic of Tanzania","nativeName":{"eng":{"official":"United Republic of Tanzania","common":"Tanzania"},"swa":{"official":"Jamhuri ya Muungano wa Tanzania","common":"Tanzania"}}},"tld":[".tz"],"cca2":"TZ","ccn3":"834","cca3":"TZA","cioc":"TAN","independent":true,"status":"officially-assigned","unMember":true,"currencies":{"TZS":{"name":"Tanzanian shilling","symbol":"Sh"}},"idd":{"root":"+2","suffixes":["55"]},"capital":["Dodoma"],"altSpellings":["TZ","Tanzania, United Republic of","United Republic of Tanzania","Jamhuri ya Muungano wa Tanzania"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English","swa":"Swahili"},"translations":{"ara":{"official":"جمهورية تنزانيا الاتحادية","common":"تنزانيا"},"ces":{"official":"Sjednocená tanzanská republika","common":"Tanzanie"},"cym":{"official":"United Republic of Tanzania","common":"Tanzania"},"deu":{"official":"Vereinigte Republik Tansania","common":"Tansania"},"est":{"official":"Tansaania Ühendvabariik","common":"Tansaania"},"fin":{"official":"Tansanian yhdistynyt tasavalta","common":"Tansania"},"fra":{"official":"République -Unie de Tanzanie","common":"Tanzanie"},"hrv":{"official":"Ujedinjena Republika Tanzanija","common":"Tanzanija"},"hun":{"official":"Tádzsik Köztársaság","common":"Tádzsikisztán"},"ita":{"official":"Repubblica Unita di Tanzania","common":"Tanzania"},"jpn":{"official":"タンザニア連合共和国","common":"タンザニア"},"kor":{"official":"탄자니아 연합 공화국","common":"탄자니아"},"nld":{"official":"Verenigde Republiek Tanzania","common":"Tanzania"},"per":{"official":"جمهوری متحد تانزانیا","common":"تانزانیا"},"pol":{"official":"Zjednoczona Republika Tanzanii","common":"Tanzania"},"por":{"official":"República Unida da Tanzânia","common":"Tanzânia"},"rus":{"official":"Объединенная Республика Танзания","common":"Танзания"},"slk":{"official":"Tanzánijská zjednotená republika","common":"Tanzánia"},"spa":{"official":"República Unida de Tanzania","common":"Tanzania"},"swe":{"official":"Förenade republiken Tanzania","common":"Tanzania"},"urd":{"official":"متحدہ جمہوریہ تنزانیہ","common":"تنزانیہ"},"zho":{"official":"坦桑尼亚联合共和国","common":"坦桑尼亚"}},"latlng":[-6.0,35.0],"landlocked":false,"borders":["BDI","COD","KEN","MWI","MOZ","RWA","UGA","ZMB"],"area":945087.0,"demonyms":{"eng":{"f":"Tanzanian","m":"Tanzanian"},"fra":{"f":"Tanzanienne","m":"Tanzanien"}},"flag":"\uD83C\uDDF9\uD83C\uDDFF","maps":{"googleMaps":"https://goo.gl/maps/NWYMqZYXte4zGZ2Q8","openStreetMaps":"https://www.openstreetmap.org/relation/195270"},"population":59734213,"gini":{"2017":40.5},"fifa":"TAN","car":{"signs":["EAT"],"side":"left"},"timezones":["UTC+03:00"],"continents":["Africa"],"flags":{"png":"https://flagcdn.com/w320/tz.png","svg":"https://flagcdn.com/tz.svg"},"coatOfArms":{"png":"https://mainfacts.com/media/images/coats_of_arms/tz.png","svg":"https://mainfacts.com/media/images/coats_of_arms/tz.svg"},"startOfWeek":"monday","capitalInfo":{"latlng":[-6.16,35.75]}},{"name":{"common":"Mexico","official":"United Mexican States","nativeName":{"spa":{"official":"Estados Unidos Mexicanos","common":"México"}}},"tld":[".mx"],"cca2":"MX","ccn3":"484","cca3":"MEX","cioc":"MEX","independent":true,"status":"officially-assigned","unMember":true,"currencies":{"MXN":{"name":"Mexican peso","symbol":"$"}},"idd":{"root":"+5","suffixes":["2"]},"capital":["Mexico City"],"altSpellings":["MX","Mexicanos","United Mexican States","Estados Unidos Mexicanos"],"region":"Americas","subregion":"North America","languages":{"spa":"Spanish"},"translations":{"ara":{"official":"الولايات المتحدة المكسيكية","common":"المسكيك"},"ces":{"official":"Spojené státy mexické","common":"Mexiko"},"cym":{"official":"United Mexican States","common":"Mexico"},"deu":{"official":"Vereinigte Mexikanische Staaten","common":"Mexiko"},"est":{"official":"Mehhiko Ühendriigid","common":"Mehhiko"},"fin":{"official":"Meksikon yhdysvallat","common":"Meksiko"},"fra":{"official":"États-Unis du Mexique","common":"Mexique"},"hrv":{"official":"Sjedinjene Meksičke Države","common":"Meksiko"},"hun":{"official":"Mexikói Egyesült Államok","common":"Mexikó"},"ita":{"official":"Stati Uniti del Messico","common":"Messico"},"jpn":{"official":"メキシコ合衆国","common":"メキシコ"},"kor":{"official":"멕시코 합중국","common":"멕시코"},"nld":{"official":"Verenigde Mexicaanse Staten","common":"Mexico"},"per":{"official":"ایالات متحد مکزیک","common":"مکزیک"},"pol":{"official":"Meksykańskie Stany Zjednoczone","common":"Meksyk"},"por":{"official":"Estados Unidos Mexicanos","common":"México"},"rus":{"official":"Мексиканские Соединённые Штаты","common":"Мексика"},"slk":{"official":"Spojené štášy mexické","common":"Mexiko"},"spa":{"official":"Estados Unidos Mexicanos","common":"México"},"swe":{"official":"Mexikos förenta stater","common":"Mexiko"},"urd":{"official":"ریاستہائے متحدہ میکسیکو","common":"میکسیکو"},"zho":{"official":"墨西哥合众国","common":"墨西哥"}},"latlng":[23.0,-102.0],"landlocked":false,"borders":["BLZ","GTM","USA"],"area":1964375.0,"demonyms":{"eng":{"f":"Mexican","m":"Mexican"},"fra":{"f":"Mexicaine","m":"Mexicain"}},"flag":"\uD83C\uDDF2\uD83C\uDDFD","maps":{"googleMaps":"https://goo.gl/maps/s5g7imNPMDEePxzbA","openStreetMaps":"https://www.openstreetmap.org/relation/114686"},"population":128932753,"gini":{"2018":45.4},"fifa":"MEX","car":{"signs":["MEX"],"side":"right"},"timezones":["UTC-08:00","UTC-07:00","UTC-06:00"],"continents":["North America"],"flags":{"png":"https://flagcdn.com/w320/mx.png","svg":"https://flagcdn.com/mx.svg"},"coatOfArms":{"png":"https://mainfacts.com/media/images/coats_of_arms/mx.png","svg":"https://mainfacts.com/media/images/coats_of_arms/mx.svg"},"startOfWeek":"monday","capitalInfo":{"latlng":[19.43,-99.13]},"postalCode":{"format":"#####","regex":"^(\\d{5})$"}}];
createLargeCard(conData);