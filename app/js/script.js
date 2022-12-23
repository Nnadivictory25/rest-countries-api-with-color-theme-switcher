let countries = []
let darkMode = false
let listVisible = false
let currentRegion = ''
let currentRegionCountries = []
let inputValue = ''
let wordQuery = ''
let searchedCountry = []

const container = document.querySelector('.countries__ctn')
const body = document.querySelector('body')
const switchCtn = document.querySelector('#switch__ctn')
const filterCtn = document.querySelector('.filter')
const list = document.querySelector('.list')
const filterHeaderText = document.querySelector('.filter__header--text')
const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')

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

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())  // convert to json
    .then(json => {
        countries = json.sort(sortAlphabetically)

        container.innerHTML = ''
        countries.map(country => {
            const { name, flags, region, capital, population } = country
            container.innerHTML += `
            <div class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">
            <div class="card__upper w-full h-[11rem] overflow-hidden">
              <img class="w-full h-full objecct-fit rounded-t-md" src=${flags.png} alt="">
            </div>
            <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">
              <p class="card__header font-bold pb-3">${name.common}</p>
                <div class="container">
                    <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                    <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                    <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${typeof(capital) == 'object' ? capital[0] : capital}</span></div>
                </div>

            </div>
          </div>
            `
        })

    })    //print data to console
    .catch(err => console.log('Request Failed', err));




switchCtn.addEventListener("click", () => {
  if (!darkMode) {
    body.classList.add("dark");
    darkMode = !darkMode;
    switchCtn.innerHTML = `
        <i class="bi bi-brightness-high-fill"></i>
        <p class="font-semibold">Light mode</p>
        `;
  } else {
    darkMode = !darkMode;
    body.classList.remove("dark");
    switchCtn.innerHTML = `
        <i class="bi bi-moon font-semibold"></i>
        <p class="font-semibold">Dark mode</p>
                `;
  }
});

filterCtn.addEventListener('click', () => {
    list.classList.toggle('invisible')
    filterCtn.classList.toggle('active')
    listVisible = !listVisible


    if (listVisible) {
        let regions = Array.from(list.children)
        
        regions.forEach(region => {
            region.addEventListener('click', (e) => {
                updateUIFromRegion(e.target.innerHTML)
                filterHeaderText.textContent = e.target.innerHTML
                list.classList.add('invisible')
                filterCtn.classList.remove('active')
                listVisible = !listVisible
            })
        })
    }
})

let updateUIFromRegion = (region) => {
    currentRegion = region

    currentRegionCountries = countries.map(country => {
        if (country.region == currentRegion) {
            return country
        }
    }).filter(country => country !== undefined)
    
    container.innerHTML = ''
    currentRegionCountries.map(country => {
        const { name, flags, region, capital, population } = country
        container.innerHTML += `
        <div class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">
        <div class="card__upper w-full h-[11rem] overflow-hidden">
          <img class="w-full h-full objecct-fit rounded-t-md" src=${flags.png} alt="">
        </div>
        <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">
          <p class="card__header font-bold pb-3">${name.common}</p>
            <div class="container">
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${typeof(capital) == 'object' ? capital[0] : capital}</span></div>
            </div>
        </div>
      </div>
        `
    })
}


let updateUIAll = () => {
    filterHeaderText.textContent = 'Filter by region'
    container.innerHTML = ''
    countries.map(country => {
        const { name, flags, region, capital, population } = country
        container.innerHTML += `
        <div class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">
        <div class="card__upper w-full h-[11rem] overflow-hidden">
          <img class="w-full h-full objecct-fit rounded-t-md" src=${flags.png} alt="">
        </div>
        <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">
          <p class="card__header font-bold pb-3">${name.common}</p>
            <div class="container">
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${typeof(capital) == 'object' ? capital[0] : capital}</span></div>
            </div>

        </div>
      </div>
        `
    })
}



searchInput.addEventListener('keyup', (e) => {
    inputValue = e.target.value
    if (inputValue.length !== 0) {
        filterHeaderText.textContent = 'Filter by region'
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
        container.innerHTML += `
        <div class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">
        <div class="card__upper w-full h-[11rem] overflow-hidden">
          <img class="w-full h-full objecct-fit rounded-t-md" src=${flags.png} alt="">
        </div>
        <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">
          <p class="card__header font-bold pb-3">${name.common}</p>
            <div class="container">
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Population: </p><span>${population.toLocaleString("en-US")}</span></div>
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Region: </p><span>${region}</span></div>
                <div class="detailCtn flex items-center gap-x-2"><p class="font-semibold">Capital: </p><span>${typeof(capital) == 'object' ? capital[0] : capital}</span></div>
            </div>
        </div>
      </div>
        `        
    })

    if (searchedCountry.length === 0) {
        container.innerHTML = `
        <div class="container mx-auto absolute inset-x-0 font-semibold text-xl">
        <p class="self-center text-center mx-auto">No countries found :(</p>
      </div>
        `
    }
} 