console.log('%c HI', 'color: firebrick')
const dogImageContainer = document.querySelector('#dog-image-container')
const dogBreedsList = document.querySelector('#dog-breeds')
const breedDropdown = document.querySelector('#breed-dropdown')
let breeds = []

fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json() )
    .then(data => {
        data.message.map(url => {
            dogImageContainer.insertAdjacentHTML('beforeend', `<img src="${url}">`)
        });
})

fetch("https://dog.ceo/api/breeds/list/all") 
    .then(response => response.json() )
    .then(data => {
        breeds = data.message
        for (const breed in data.message) {
            dogBreedsList.insertAdjacentHTML('beforeend', `<li>${breed}</li>`)
        }
});

dogBreedsList.addEventListener('select', function(event) {
    event.target.setAttribute("style", "color: blue")
});

breedDropdown.addEventListener("change", function(event) {
    dogBreedsList.innerHTML = ""
    let filteredBreeds = []
    let filteredBreedsHTML = "";
    for (const breed in breeds) {
        if (breed[0] === breedDropdown.value) {
            filteredBreeds.push(breed)
        }
    }
    
    filteredBreeds.forEach(breed => {
        filteredBreedsHTML += `<li>${breed}</li>`
    });

    dogBreedsList.innerHTML = filteredBreedsHTML
});