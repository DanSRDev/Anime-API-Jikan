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

async function getTrendingAnimes() {
    const { data } = await api('seasons/now');
    const animes = data.data;
    console.log(animes);

    createAnimeList(animes, trendingAnimeList);
}


async function getTopAnime() {
    const { data } = await api('top/anime');
    const animes = data.data;
    console.log(animes);

    createTopAnimeList(animes, topAnimeList);
}

async function getUpcomingAnimes() {
    const { data } = await api('seasons/upcoming');
    const animes = data.data;
    console.log(animes);

    createAnimeList(animes, upcomingAnimeList, false);
}