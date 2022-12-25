# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![](./images/Rest%20Counries%20API%20and%2017%20more%20pages%20-%20Personal%20-%20Microsoft_%20Edge%202022-12-25%2015-17-05%20(1).mp4)
![](./images/Web%20capture_25-12-2022_152459_localhost.jpeg)


### Links

- Solution URL: [Frontend mentore solution URL](https://www.frontendmentor.io/solutions/rest-countries-api-with-color-theme-switcher-3Oj4i5vS_N)
- Live Site URL: [Click to visit live site](https://rest-countries-api-vic.vercel.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Gulp
- SCSS / SASS
- [Tailwind CSS](https://tailwindcss.com) - For styles


### What I learned
Learnt alot more about event handling and js array methods

Like this script to get borders of a selected counrtry and generate HTML buttons based on those borders countries, if there is no border , then return 'None'
```js
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
```



### Continued development

I need to start learning react to have more control over the DOM


### Useful resources

- [Stack Overflow](https://www.stackoverflow.com) - This helped me alot


## Author

- Website - [Nnadi Victory](https://github.com/Nnadivictory25)
- Frontend Mentor - [@NnadiVictory25](https://www.frontendmentor.io/profile/Nnadivictory25)
- Twitter - [@nnvictory001](https://www.twitter.com/nnvictory001)


## Acknowledgments

I want to thank those I took some inspirations from :)
