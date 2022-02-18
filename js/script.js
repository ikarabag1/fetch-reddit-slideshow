// http://www.reddit.com/search.json?q=cats+nsfw:no&limit=100

// APP STATE

// ms speed of rthe interval
const TIMER_SPEED = 1000
// interval for the slideshow
let slideeshowInterval
// current image index
let imageIndex = -1
// an array ofimages of display
let images = []
titleHeader = document.querySelector('#title-header')

// DOM ELEMENTS
// everthyng we need to hide
let titleHeader
let descriptionP
let searchForm
let searchInout
let stopButton
let slideshowContainer

// FUNCTIONS
// invokes on form submit and fetches reddit
function fetchReddit(e) {
    e.preventDefault()
    if (!searchInput.value) return searchInput.placeholder = 'type something in!'
    const searchUrl = 'http://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no&limit=100'
    fetch(searchUrl)
        .then(response => response.json())
        .then(redditJson => {
            images = redditJson.data.children.map(child => {
                    return {
                        url: child.data.url,
                        sub: child.data.subreddit,
                        author: child.data.author
                    }
                })
                .filter(child => child.url(-4) === '.jpg' || child.url.slice(-4) === '.png')

            // start the sldieshow

            // hide everything on screen
            titleHeader.style.display = 'none'
            descriptionP.style.display = 'none'
            searchForm.style.display = 'none'
            // show the slideshow div and stop button
            stopButton.display = 'inline'
            // show slideshowContainer
            slideshowContainer.display = 'block'
            // start the interval for the slideshow
            slideeshowInterval = setInterval(changeSlide, TIMER_SPEED)
        })
        .catch(console.log)
}
// function for CHANGEsLIDE with imageindex i
function changeSlide() {
    // increment the current index
    imageIndex++
    //  if the current idnex is too large -- reset to the begining
    if (imageIndex >= images.length) imageIndex = 0 //loop forever

    // to clear the container
    while (slideshowContainer.firstChild) {
        slideshowContainer.removeChild(slideshowContainer.firstChild)
    }

    // create some elements and append them to the sldieshow div
    const image = document.createElement('img')
    image.src = images[imageIndex].url
    image.alt = 'image fetched from reddit'
    image.width = window.innerWidth
    image.height = window.innerHeight
    const author = document.createElement('h4')
    author.innerText = images[imageIndex].author
    const sub = document.createElement('p')
    sub.innerText = images[imageIndex].sub
    // append new else on the sldieshow el
    slideshowContainer.appendchild(image, author, sub)
}

function stopSlideshow() {
    // hide slideshow
    stopButton.style.display = 'none'
    slideshowContainer.style.display = 'none'
    // reset app state
    clearInterval(slideeshowInterval)
    images = []
    imageIndex = -1
    // show original landing page
    titleHeader.style.display = 'inline'
    descriptionP.style.display = 'inline'
    searchForm.style.display = 'block'
}

// DOM CONTENT LOAD INITIALIZER
document.addEventListener('DOMContentLoaded', () => {
    titleHeader = document.querySelector('#title-header')
    descriptionP = document.querySelector('#description-p')
    searchForm = document.querySelector('#search-form')
    searchInput = document.querySelector('#search-input')
    stopButton = document.querySelector('#stop-button')
    slideshowContainer = document.querySelector('#slideshow-container')
    // console.log(titleHeader, descriptionP. searchForm, searchInput, stopButton, sldieshowContainer)
    // eventlisteners for submits
    searchForm.addEventListener('submit', fetchReddit)
    // listen clicks on the stop button
    stopButton.addEventListener('click', stopSlideshow)
    // show the slideshow div and stop button
    stopButton.style.display = 'none'
    slideshowContainer.style.display = 'block'
})