let countries = []
let darkMode = localStorage.getItem('darkMode') || false
let listVisible = false
let currentRegion = ''
let currentRegionCountries = []
let currentCountry = ''
let inputValue = ''
let wordQuery = ''
let searchedCountry = []
let detailPageActive = false

const container = document.querySelector('.countries__ctn')
const body = document.querySelector('body')
const switchCtn = document.querySelector('#switch__ctn')
const filterCtn = document.querySelector('.filter')
const list = document.querySelector('.list')
const filterHeaderText = document.querySelector('.filter__header--text')
const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const mainCtn = document.querySelector('.mainCtn')
const mainEle = document.querySelector('main')


let updateTheme = () => {
    if (darkMode === 'true') {
        body.classList.add('dark')

        switchCtn.innerHTML = /*html*/`
        <i class="bi bi-brightness-high-fill"></i>
        <p class="font-semibold">Light mode</p>
        `;
    }
}
updateTheme()


fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())  // convert to json
    .then(json => {
        countries = json.sort(sortAlphabetically)
        container.innerHTML = ''
        countries.forEach(country => {
            country.bordersMain = countries.map(count => {
                const { borders } = count
                if (country == count) {
                    return borders
                }
                if (country == count && borders == undefined) {
                    return 'none'
                }
            }).filter(count => count !== undefined).flat()
        })
        countries.map(country => {
            const { name, flags, region, capital, population } = country
            container.innerHTML += /*html*/ `
            <div onclick="renderDetailPage(this.id)" id="${name.common}" class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">
            <div class="card__upper w-full h-[11rem] overflow-hidden">
              <img class="w-full h-full objecct-fit rounded-t-md" src=${flags.png} alt="" loading="lazy">
            </div>
            <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">
              <p class="card__header font-bold pb-3">${name.common}</p>
                <div class="container">
                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${typeof(capital) == 'object' ? capital[0] : capital}</span></div>
                </div>

            </div>
          </div>
            `
        })

    })    //print data to console
    .catch(err => console.log('Request Failed', err));


function sortAlphabetically(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.common.toUpperCase();
  const nameB = b.name.common.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

switchCtn.addEventListener("click", () => {
  if (!darkMode || darkMode === "false") {
    body.classList.add("dark");
    darkMode = 'true';
    localStorage.setItem("darkMode", darkMode);
    switchCtn.innerHTML = /*html*/`
        <i class="bi bi-brightness-high-fill"></i>
        <p class="font-semibold">Light mode</p>
        `;
  } else {
    darkMode = 'false';
    localStorage.setItem("darkMode", darkMode);
    body.classList.remove("dark");
    switchCtn.innerHTML = /*html*/`
        <i class="bi bi-moon font-semibold"></i>
        <p class="font-semibold">Dark mode</p>
     `;
  }
});

filterCtn.addEventListener('click', () => {
    list.classList.toggle('hidden')
    filterCtn.classList.toggle('active')
    listVisible = !listVisible


    if (listVisible) {
        let regions = Array.from(list.children)
        
        regions.forEach(region => {
            region.addEventListener('click', (e) => {
                updateUIFromRegion(e.target.innerHTML)
                if (e.target.innerHTML !== 'Reset') {
                    filterHeaderText.textContent = e.target.innerHTML
                }
                list.classList.add('hidden')
                filterCtn.classList.remove('active')
                listVisible = !listVisible
            })
        })
    }
})

let updateUIFromRegion = (region) => {
    if (region !== 'Reset') {
        currentRegion = region
    
        currentRegionCountries = countries.map(country => {
            if (country.region == currentRegion) {
                return country
            }
        }).filter(country => country !== undefined)
        
        container.innerHTML = ''
        currentRegionCountries.map(country => {
            const { name, flags, region, capital, population } = country
            container.innerHTML += /*html*/`
            <div onclick="renderDetailPage(this.id)" id="${name.common}" class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">
            <div class="card__upper w-full h-[11rem] overflow-hidden">
              <img class="w-full h-full objecct-fit rounded-t-md" src=${flags.png} alt="" loading="lazy">
            </div>
            <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">
              <p class="card__header font-bold pb-3">${name.common}</p>
                <div class="container">
                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${typeof(capital) == 'object' ? capital[0] : capital}</span></div>
                </div>
            </div>
          </div>
            `
        })
    } else {
        list.classList.add('hidden')
        if (filterHeaderText.textContent !== 'Filter by region') {
            resetFilterText()
            container.innerHTML = /*html*/`
            <div class="container mx-auto absolute inset-x-0 font-semibold text-xl">
            <p class="self-center text-center mx-auto">Loading countries data...</p>
          </div>
            `
            setTimeout(() => {
                updateUIAll()
            });
        }
    }
}


let updateUIAll = () => {
    list.classList.add('hidden')
    resetFilterText()
    container.innerHTML = ''
    countries.map(country => {
        const { name, flags, region, capital, population } = country
        container.innerHTML += /*html*/`
        <div onclick="renderDetailPage(this.id)" id="${name.common}" class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">
        <div class="card__upper w-full h-[11rem] overflow-hidden">
          <img class="w-full h-full objecct-fit rounded-t-md" src=${flags.png} alt="" loading="lazy">
        </div>
        <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">
          <p class="card__header font-bold pb-3">${name.common}</p>
            <div class="container">
                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${typeof(capital) == 'object' ? capital[0] : capital}</span></div>
            </div>

        </div>
      </div>
        `
    })
}


let resetFilterText = () => {
    filterHeaderText.textContent = 'Filter by region'
}


searchInput.addEventListener('keyup', (e) => {
    inputValue = e.target.value
    if (inputValue.length !== 0) {
        resetFilterText()
        updateUIfromSearch(inputValue)
    } else {
        updateUIAll()
    }

})


let updateUIfromSearch = (word) => {
    wordQuery = word
    
    searchedCountry = countries.map(country => {
        if (country.name.common.toLowerCase().includes(wordQuery.toLowerCase()) ) {
            return country
        }
    }).filter(country => country !== undefined)
    
    container.innerHTML = ''
    searchedCountry.map(country => {
        const { name, flags, region, capital, population } = country
        container.innerHTML += /*html*/`
        <div onclick="renderDetailPage(this.id)" id="${name.common}" class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">
        <div class="card__upper w-full h-[11rem] overflow-hidden">
          <img class="w-full h-full objecct-fit rounded-t-md" src=${flags.png} alt="" loading="lazy">
        </div>
        <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">
          <p class="card__header font-bold pb-3">${name.common}</p>
            <div class="container">
                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${typeof(capital) == 'object' ? capital[0] : capital}</span></div>
            </div>
        </div>
      </div>
        `        
    })

    if (searchedCountry.length === 0) {
        container.innerHTML = /*html*/`
        <div class="container mx-auto absolute inset-x-0 font-semibold text-xl">
        <p class="self-center text-center mx-auto">No countries found :(</p>
      </div>
        `
    }
} 



//! DETAILS PAGE RENDERING

let countryBorders = []
let html = ``
let getBorders = (country = currentCountry) => {
    html = ``
    countryBorders = []
    if (country.bordersMain.length == 0) {
        return 'None'
    } else {
        for (let i = 0; i < country.bordersMain.length; i++) {
            let borderCountry = countries.find(count => count.cca3 == country.bordersMain[i]).name.common
            countryBorders.push(borderCountry)
        }
        countryBorders.forEach(countryName => {
            html +=/*html*/ `<button onclick="renderDetailPage('${countryName}')" class=" gotoBorder bg-white py-2 px-4 rounded-md shadow-md font-medium flex items-center gap-x-3 transition hover:text-zinc-400"><span class="animate__animated animate__slideInDown">${countryName}</span></button>
            `
        })
    }
    return html;
}

let renderDetailPage = (countryName) => {
    mainEle.innerHTML = ``
    detailPageActive = !detailPageActive

    currentCountry = countries.find(country => country.name.common == countryName)

    const { name, bordersMain, flags, region, capital, population, subregion, tld, currencies, languages } = currentCountry
    let nativeNameObjectsArr = []
    let currenciesObjArr = []
    let currenciesArr = []
    let languagesArr = []
    let nativeName = name.nativeName
    for (const property in nativeName) {
        nativeNameObjectsArr.push(nativeName[property])
    }
    for (const property in languages) {
        languagesArr.push(languages[property])
    }
    for (const property in currencies) {
        currenciesObjArr.push(currencies[property])
    }
    currenciesObjArr.forEach(currency => currenciesArr.push(currency.name))
    nativeName = name.nativeName == undefined ? countryName : nativeNameObjectsArr[0].common


    

    mainEle.innerHTML = /*html*/`
        <div class="detailsCtn">
            <article class="backBtnCtn absolute top-28 px-9">
                <button onclick="window.location.reload()" id="backBtn" class="backBtn bg-white py-2 px-10 rounded-md shadow-md font-semibold flex items-center gap-x-3"><i class="bi bi-arrow-left text-lg"></i> Back</button>
            </article>
    
            <section class="countryDataCtn mt-28 lg:mt-36 lg:flex gap-x-28 px-9 pb-6 mx-auto">
                <div class="countryDataCtn__imgCtn w-full md:w-[60%] lg:w-[50%] ">
                    <img class="w-full" src=${flags.png} alt="">
                </div>
    
                <div class="infoCtn flex flex-col gap-y-8 lg:gap-y-10 lg:w-[45%]">
                    <h3 class="infoCtn__headerText text-xl font-bold mt-8">${countryName}</h3>
                    <div class="infoCtn__info1 flex flex-wrap gap-x-[75px] gap-y-8">
                        <div class="ctn flex flex-col gap-y-2">
                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Native name: </p><span>${nativeName}</span></div>
                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Sub region: </p><span>${subregion}</span></div>
                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${capital}</span></div>
                        </div>
        
                        <div class="infoCtn__info2 flex flex-col flex-wrap gap-y-2">
                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Top level domain: </p><span>${!tld ? 'None' : tld[0]}</span></div>
                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Currencies: </p><span>${currenciesArr.join(' , ')}</span></div>
                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Languages: </p><span>${languagesArr.join(' , ')}</span></div>
                        </div>
                    </div>
    
                    <div class="infoCtn__info3 flex flex-wrap gap-4 items-center pb-5">
                        <h3 class="infoCtn__headerText font-semibold text-lg">Border countries: </h3>
                        ${getBorders()}
                    </div>
                </div>
            </section>
        </div>
    `
}