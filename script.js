const languageBtn = document.querySelector('.header__language-current');
const dropDown = document.querySelector('.header__language-dropdown');
const languageItems = document.querySelectorAll('.header__language-link');
const searchInput = document.querySelector('.header__search-input');
const moviesCard = document.querySelector('.movies__card');
const searchBtn = document.querySelector('.header__search-btn');

// language

languageBtn.addEventListener('click', e => {
    e.stopPropagation();
    dropDown.classList.toggle('active');
});

document.addEventListener('click', () => {
    dropDown.classList.remove('active');
});

languageItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();

        const selectedImg = item.querySelector('img').src;
        const selectedAlt = item.querySelector('img').alt;
        const selectedText = item.textContent.trim();

        languageBtn.innerHTML = `<img class="header__language-img" src="${selectedImg}" alt="${selectedAlt}"> ${selectedText}`;
        dropDown.classList.remove('active');
    });
});

// search

searchInput.addEventListener('input', () => {
    let value = searchInput.value;
    if (value.length > 0) {
        searchInput.value = value.charAt(0).toUpperCase() + value.slice(1);
    }
})

searchBtn.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
        loadMovies(searchInput.value.trim());
    }
});

searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        loadMovies(searchInput.value.trim());
    }
});

// movie

const loadMovies = async searchTerm => {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&apikey=6d2f40bd`;
    const res = await fetch(URL);
    const data = await res.json();
    if (data.Response == 'True') {
        displayMovieList(data.Search);
    } else {
        alert('No results found!');
    }
}

const displayMovieList = movies => {
    moviesCard.innerHTML = '';

    movies.forEach(movieData => {
        const movie = document.createElement('div');
        movie.classList.add('movies__card-body');

        movie.innerHTML = `
        <img src="${movieData.Poster}" alt="${movieData.Title}" class="movies__card-img">
        <div class="movies__card-content">
            <span class="movies__card-type">${movieData.Type}</span>
            <p class="movies__card-year">${movieData.Year}</p>
            <h3 class="movies__card-title">${movieData.Title}</h3>
            <p class="movies__card-rating">
                <img class="movies__card-imdb" src="../img/IMDB_Logo_2016.svg.png" alt="IMDB">N/A
            </p>
            <div class="movies__card-genres">
                <span class="movies__card-genre">N/A</span>
            </div>
        </div>
        `
        moviesCard.appendChild(movie);
    });
    moviesCard.scrollIntoView({ behavior: 'smooth' });
};