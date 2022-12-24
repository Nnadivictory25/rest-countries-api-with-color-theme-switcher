"use strict";function _typeof(n){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},_typeof(n)}var countries=[],darkMode=localStorage.getItem("darkMode")||!1,listVisible=!1,currentRegion="",currentRegionCountries=[],currentCountry="",inputValue="",wordQuery="",searchedCountry=[],detailPageActive=!1,container=document.querySelector(".countries__ctn"),body=document.querySelector("body"),switchCtn=document.querySelector("#switch__ctn"),filterCtn=document.querySelector(".filter"),list=document.querySelector(".list"),filterHeaderText=document.querySelector(".filter__header--text"),form=document.querySelector("#form"),searchInput=document.querySelector("#search"),mainCtn=document.querySelector(".mainCtn"),mainEle=document.querySelector("main");function sortAlphabetically(n,e){var t=n.name.common.toUpperCase(),a=e.name.common.toUpperCase(),i=0;return t>a?i=1:t<a&&(i=-1),i}fetch("https://restcountries.com/v3.1/all").then((function(n){return n.json()})).then((function(n){countries=n.sort(sortAlphabetically),container.innerHTML="",countries.forEach((function(n){n.bordersMain=countries.map((function(e){var t=e.borders;return n==e?t:n==e&&null==t?"none":void 0})).filter((function(n){return void 0!==n})).flat()})),countries.map((function(n){var e=n.name,t=n.flags,a=n.region,i=n.capital,o=n.population;container.innerHTML+='\n            <div onclick="renderDetailPage(this.id)" id="'.concat(e.common,'" class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">\n            <div class="card__upper w-full h-[11rem] overflow-hidden">\n              <img class="w-full h-full objecct-fit rounded-t-md" src=').concat(t.png,' alt="" loading="lazy">\n            </div>\n            <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">\n              <p class="card__header font-bold pb-3">').concat(e.common,'</p>\n                <div class="container">\n                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>').concat(o.toLocaleString("en-US"),'</span></div>\n                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>').concat(a,'</span></div>\n                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>').concat("object"==_typeof(i)?i[0]:i,"</span></div>\n                </div>\n\n            </div>\n          </div>\n            ")}))})).catch((function(n){return console.log("Request Failed",n)}));var updateThemeState=function(){localStorage.setItem("darkMode",darkMode),darkMode?(body.classList.add("dark"),switchCtn.innerHTML='\n        <i class="bi bi-brightness-high-fill"></i>\n        <p class="font-semibold">Light mode</p>\n        '):(body.classList.remove("dark"),switchCtn.innerHTML='\n        <i class="bi bi-moon font-semibold"></i>\n        <p class="font-semibold">Dark mode</p>\n        ')};switchCtn.addEventListener("click",(function(){darkMode?(darkMode=!darkMode,updateThemeState(),body.classList.remove("dark"),switchCtn.innerHTML='\n        <i class="bi bi-moon font-semibold"></i>\n        <p class="font-semibold">Dark mode</p>\n                '):(body.classList.add("dark"),darkMode=!darkMode,updateThemeState(),switchCtn.innerHTML='\n        <i class="bi bi-brightness-high-fill"></i>\n        <p class="font-semibold">Light mode</p>\n        ')})),filterCtn.addEventListener("click",(function(){(list.classList.toggle("hidden"),filterCtn.classList.toggle("active"),listVisible=!listVisible)&&Array.from(list.children).forEach((function(n){n.addEventListener("click",(function(n){updateUIFromRegion(n.target.innerHTML),"Reset"!==n.target.innerHTML&&(filterHeaderText.textContent=n.target.innerHTML),list.classList.add("hidden"),filterCtn.classList.remove("active"),listVisible=!listVisible}))}))}));var updateUIFromRegion=function(n){"Reset"!==n?(currentRegion=n,currentRegionCountries=countries.map((function(n){if(n.region==currentRegion)return n})).filter((function(n){return void 0!==n})),container.innerHTML="",currentRegionCountries.map((function(n){var e=n.name,t=n.flags,a=n.region,i=n.capital,o=n.population;container.innerHTML+='\n            <div onclick="renderDetailPage(this.id)" id="'.concat(e.common,'" class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">\n            <div class="card__upper w-full h-[11rem] overflow-hidden">\n              <img class="w-full h-full objecct-fit rounded-t-md" src=').concat(t.png,' alt="" loading="lazy">\n            </div>\n            <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">\n              <p class="card__header font-bold pb-3">').concat(e.common,'</p>\n                <div class="container">\n                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>').concat(o.toLocaleString("en-US"),'</span></div>\n                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>').concat(a,'</span></div>\n                    <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>').concat("object"==_typeof(i)?i[0]:i,"</span></div>\n                </div>\n            </div>\n          </div>\n            ")}))):(list.classList.add("hidden"),"Filter by region"!==filterHeaderText.textContent&&(resetFilterText(),container.innerHTML='\n            <div class="container mx-auto absolute inset-x-0 font-semibold text-xl">\n            <p class="self-center text-center mx-auto">Loading countries data...</p>\n          </div>\n            ',setTimeout((function(){updateUIAll()}))))},updateUIAll=function(){list.classList.add("hidden"),resetFilterText(),container.innerHTML="",countries.map((function(n){var e=n.name,t=n.flags,a=n.region,i=n.capital,o=n.population;container.innerHTML+='\n        <div onclick="renderDetailPage(this.id)" id="'.concat(e.common,'" class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">\n        <div class="card__upper w-full h-[11rem] overflow-hidden">\n          <img class="w-full h-full objecct-fit rounded-t-md" src=').concat(t.png,' alt="" loading="lazy">\n        </div>\n        <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">\n          <p class="card__header font-bold pb-3">').concat(e.common,'</p>\n            <div class="container">\n                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>').concat(o.toLocaleString("en-US"),'</span></div>\n                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>').concat(a,'</span></div>\n                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>').concat("object"==_typeof(i)?i[0]:i,"</span></div>\n            </div>\n\n        </div>\n      </div>\n        ")}))},resetFilterText=function(){filterHeaderText.textContent="Filter by region"};searchInput.addEventListener("keyup",(function(n){0!==(inputValue=n.target.value).length?(resetFilterText(),updateUIfromSearch(inputValue)):updateUIAll()}));var updateUIfromSearch=function(n){wordQuery=n,searchedCountry=countries.map((function(n){if(n.name.common.toLowerCase().includes(wordQuery.toLowerCase()))return n})).filter((function(n){return void 0!==n})),container.innerHTML="",searchedCountry.map((function(n){var e=n.name,t=n.flags,a=n.region,i=n.capital,o=n.population;container.innerHTML+='\n        <div onclick="renderDetailPage(this.id)" id="'.concat(e.common,'" class="card shadow-md bg-white cursor-pointer overflow-hidden rounded-md">\n        <div class="card__upper w-full h-[11rem] overflow-hidden">\n          <img class="w-full h-full objecct-fit rounded-t-md" src=').concat(t.png,' alt="" loading="lazy">\n        </div>\n        <div class="card__lower flex flex-col mt-6 px-5 pb-6 h-full">\n          <p class="card__header font-bold pb-3">').concat(e.common,'</p>\n            <div class="container">\n                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>').concat(o.toLocaleString("en-US"),'</span></div>\n                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>').concat(a,'</span></div>\n                <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>').concat("object"==_typeof(i)?i[0]:i,"</span></div>\n            </div>\n        </div>\n      </div>\n        ")})),0===searchedCountry.length&&(container.innerHTML='\n        <div class="container mx-auto absolute inset-x-0 font-semibold text-xl">\n        <p class="self-center text-center mx-auto">No countries found :(</p>\n      </div>\n        ')},countryBorders=[],html="",getBorders=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:currentCountry;if(html="",countryBorders=[],0==n.bordersMain.length)return"None";for(var e=function(e){var t=countries.find((function(t){return t.cca3==n.bordersMain[e]})).name.common;countryBorders.push(t)},t=0;t<n.bordersMain.length;t++)e(t);return countryBorders.forEach((function(n){html+="<button onclick=\"renderDetailPage('".concat(n,'\')" class=" gotoBorder bg-white py-2 px-4 rounded-md shadow-md font-medium flex items-center gap-x-3 transition hover:text-zinc-400"><span class="animate__animated animate__slideInDown">').concat(n,"</span></button>\n            ")})),html},renderDetailPage=function(n){mainEle.innerHTML="",detailPageActive=!detailPageActive;var e=currentCountry=countries.find((function(e){return e.name.common==n})),t=e.name,a=(e.bordersMain,e.flags),i=e.region,o=e.capital,l=e.population,c=e.subregion,s=e.tld,r=e.currencies,d=e.languages,p=[],f=[],u=[],m=[],v=t.nativeName;for(var g in v)p.push(v[g]);for(var x in d)m.push(d[x]);for(var b in r)f.push(r[b]);f.forEach((function(n){return u.push(n.name)})),v=null==t.nativeName?n:p[0].common,mainEle.innerHTML='\n            <div class="detailsCtn">\n            <article class="backBtnCtn absolute top-28 px-9">\n                <button onclick="window.location.reload()" id="backBtn" class="backBtn bg-white py-2 px-10 rounded-md shadow-md font-semibold flex items-center gap-x-3"><i class="bi bi-arrow-left text-lg"></i> Back</button>\n            </article>\n    \n            <section class="countryDataCtn mt-28 lg:mt-36 lg:flex gap-x-28 px-9 pb-6 mx-auto">\n                <div class="countryDataCtn__imgCtn w-full md:w-[60%] lg:w-[50%] ">\n                    <img class="w-full" src='.concat(a.png,' alt="">\n                </div>\n    \n                <div class="infoCtn flex flex-col gap-y-8 lg:gap-y-10 lg:w-[45%]">\n                    <h3 class="infoCtn__headerText text-xl font-bold mt-8">').concat(n,'</h3>\n                    <div class="infoCtn__info1 flex flex-wrap gap-x-[75px] gap-y-8">\n                        <div class="ctn flex flex-col gap-y-2">\n                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Native name: </p><span>').concat(v,'</span></div>\n                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Population: </p><span>').concat(l.toLocaleString("en-US"),'</span></div>\n                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Region: </p><span>').concat(i,'</span></div>\n                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Sub region: </p><span>').concat(c,'</span></div>\n                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Capital: </p><span>').concat(o,'</span></div>\n                        </div>\n        \n                        <div class="infoCtn__info2 flex flex-col flex-wrap gap-y-2">\n                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Top level domain: </p><span>').concat(s?s[0]:"None",'</span></div>\n                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Currencies: </p><span>').concat(u.join(" , "),'</span></div>\n                            <div class="detailCtn flex flex-wrap items-center gap-x-2"><p class="font-semibold">Languages: </p><span>').concat(m.join(" , "),'</span></div>\n                        </div>\n                    </div>\n    \n                    <div class="infoCtn__info3 flex flex-wrap gap-4 items-center pb-5">\n                        <h3 class="infoCtn__headerText font-semibold text-lg">Border countries: </h3>\n                        ').concat(getBorders(),"\n                    </div>\n                </div>\n            </section>\n        </div>\n    ")};
//! DETAILS PAGE RENDERING
updateThemeState();
//# sourceMappingURL=script.js.map