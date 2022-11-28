const api = axios.create({
    baseURL: 'https://api.jikan.moe/v4/',
    headers: {
        'Content-type': 'application/json',
    },
});

function createAnimeList(animes, container, stars= true) {
    container.innerHTML = '';

    animes.forEach(anime => {
        const animeContainer = document.createElement('div');
        animeContainer.classList.add('animePoster');
        
        const animeImg = document.createElement('img');
        animeImg.setAttribute('alt', anime.title);
        animeImg.setAttribute('src', anime.images.jpg.large_image_url);
        animeImg.classList.add('animeImg')
        animeContainer.addEventListener('click', () => {
            location.hash = `#anime=${anime.mal_id}`;
        });

        if(stars){
            const score = document.createElement('div');
            score.classList.add('score');
            score.innerHTML=`⭐${anime.score}`;
            animeContainer.appendChild(score);
        }

        animeContainer.appendChild(animeImg);
        container.appendChild(animeContainer);
    });
}

function createTopAnimeList(animes, container) {
    container.innerHTML = '';

    animes.forEach( anime => {
        const animeContainer = document.createElement('div');
        animeContainer.classList.add('animePosterSmall');
        
        const animeImg = document.createElement('img');
        animeImg.setAttribute('alt', anime.title);
        animeImg.setAttribute('src', anime.images.jpg.large_image_url);
        animeImg.classList.add('animeImg');
        animeContainer.addEventListener('click', () => {
            location.hash = `#anime=${anime.mal_id}`;
        });

        const score = document.createElement('div');
        score.classList.add('score');
        score.innerHTML=`⭐${anime.score}`;

        animeContainer.appendChild(animeImg);
        animeContainer.appendChild(score);
        container.appendChild(animeContainer);
    });
};

function createGenresList(anime, container) {
    container.innerHTML = '';
    const genresTitle = document.createElement('h3');
    genresTitle.innerText = "Generos:";

    const genresList = document.createElement('div');
    genresList.classList.add('anime-genres-list');
    anime.genres.forEach( genre => {
        const genreElement = document.createElement('div');
        genreElement.classList.add('animeGenre');
        genreElement.innerText = genre.name;
        genresList.appendChild(genreElement);
    })
    container.appendChild(genresTitle);
    container.appendChild(genresList);
}

function createThemesList(anime, container) {
    container.innerHTML = '';
    const themesTitle = document.createElement('h3');
    themesTitle.innerText = "Temas:";

    const themesList = document.createElement('div');
    themesList.classList.add('anime-genres-list');
    anime.themes.forEach( theme => {
        const themeElement = document.createElement('div');
        themeElement.classList.add('animeGenre');
        themeElement.innerText = theme.name;
        themesList.appendChild(themeElement);
    })
    container.appendChild(themesTitle);
    container.appendChild(themesList);
}

async function createImagesList(id, container) {
    animeImagesList.innerHTML = '';
    const { data } = await api(`anime/${id}/pictures`);
    const images = data.data;

    images.forEach( image => {
        const animeContainer = document.createElement('div');
        animeContainer.classList.add('animePoster');
        
        const animeImg = document.createElement('img');
        animeImg.setAttribute('src', image.jpg.large_image_url);
        animeImg.classList.add('animeImg')

        animeContainer.appendChild(animeImg);
        container.appendChild(animeContainer);
    })
}

async function createRecommendedList(id, container) {
    container.innerHTML='';
    const { data } = await api(`anime/${id}/recommendations`);
    const recommendations = data.data;

    recommendations.forEach(anime => {
        const animeContainer = document.createElement('div');
        animeContainer.classList.add('animePoster');
        
        const animeImg = document.createElement('img');
        animeImg.setAttribute('alt', anime.title);
        animeImg.setAttribute('src', anime.entry.images.jpg.large_image_url);
        animeImg.classList.add('animeImg')
        animeContainer.addEventListener('click', () => {
            location.hash = `#anime=${anime.entry.mal_id}`;
        });

        animeContainer.appendChild(animeImg);
        container.appendChild(animeContainer);
    });
}

async function getTrendingAnimes() {
    const { data } = await api('seasons/now');
    const animes = data.data;

    createAnimeList(animes, trendingAnimeList);
}


async function getTopAnime() {
    const { data } = await api('top/anime');
    const animes = data.data;

    createTopAnimeList(animes, topAnimeList);
}

async function getUpcomingAnimes() {
    const { data } = await api('seasons/upcoming');
    const animes = data.data;

    createAnimeList(animes, upcomingAnimeList, false);
}

async function getAnimeDetail(id) {
    animeImgContainer.innerHTML = '';
    const { data } = await api(`anime/${id}`);
    const anime = data.data;

    const animeImg = document.createElement('img');
    animeImg.setAttribute('src', anime.images.jpg.large_image_url);
    animeImg.classList.add('animeImg');
    
    animeInfoContainer.innerHTML='';
    const animeTitle = document.createElement('h2');
    animeTitle.innerText=anime.title;
    const animeOriginalTitle = document.createElement('h4');
    const animeScore = document.createElement('div');
    animeScore.classList.add('animeScore');
    animeScore.innerText = `⭐${anime.score}`;
    animeOriginalTitle.innerText=anime.title_japanese;
    const animeDescription = document.createElement('p');
    animeDescription.innerText = anime.synopsis;
    const animeGenres = document.createElement('article');
    animeGenres.classList.add('anime-genres');
    const animeThemes = document.createElement('article');
    animeThemes.classList.add('anime-themes');

    createGenresList(anime, animeGenres);
    createThemesList(anime, animeThemes);
    createImagesList(id, animeImagesList);
    createRecommendedList(id, animeRecommendedList);


    animeImgContainer.appendChild(animeImg);
    animeInfoContainer.appendChild(animeTitle);
    animeInfoContainer.appendChild(animeOriginalTitle);
    animeInfoContainer.appendChild(animeScore);
    animeInfoContainer.appendChild(animeDescription);
    animeInfoContainer.appendChild(animeGenres);
    animeInfoContainer.appendChild(animeThemes);
}

async function getAnimeSearch(query) {
    searchAnimeList.innerHTML='';
    const { data } = await api("anime", {
        params: {
            'q': query,
            'sfw':true,
        }
    })

    const animes = data.data;

    createTopAnimeList(animes, searchAnimeList);
}