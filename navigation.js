searchBar.addEventListener('search', () => {
    location.hash = `#search=${searchBar.value.trim()}`;
})

window.addEventListener('DOMContentLoaded', navigation);
window.addEventListener('hashchange', navigation);
headerTitle.addEventListener('click', () => {
    history.pushState(null, null, ' ');
    homePage();
})

function navigation() {
    if(location.hash.startsWith('#anime=')) {
        animeDetailPage();
    } else if(location.hash.startsWith('#search=')) {
        searchAnimePage();
    } else {
        homePage();
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function homePage() {
    trendingContainer.classList.remove('inactive');
    topAnimeContainer.classList.remove('inactive');
    upcomingContainer.classList.remove('inactive');
    animeDetailContainer.classList.add('inactive');
    animeImagesContainer.classList.add('inactive');
    animeRecommendedContainer.classList.add('inactive');
    searchAnimeContainer.classList.add('inactive');



    getTrendingAnimes();
    getTopAnime();
    getUpcomingAnimes();
}

function animeDetailPage() {
    trendingContainer.classList.add('inactive');
    topAnimeContainer.classList.add('inactive');
    upcomingContainer.classList.add('inactive');
    animeDetailContainer.classList.remove('inactive');
    animeImagesContainer.classList.remove('inactive');
    animeRecommendedContainer.classList.remove('inactive');
    searchAnimeContainer.classList.add('inactive');

    const [_, id] = location.hash.split('=');
    getAnimeDetail(id);
}

function searchAnimePage() {
    trendingContainer.classList.add('inactive');
    topAnimeContainer.classList.add('inactive');
    upcomingContainer.classList.add('inactive');
    animeDetailContainer.classList.add('inactive');
    animeImagesContainer.classList.add('inactive');
    animeRecommendedContainer.classList.add('inactive');
    searchAnimeContainer.classList.remove('inactive');

    const [_, query] = location.hash.split('=');

    getAnimeSearch(decodeURI(query));
}