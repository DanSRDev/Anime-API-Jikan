window.addEventListener('DOMContentLoaded', navigation);
window.addEventListener('hashchange', navigation);

function navigation() {
    if(location.hash.startsWith('#anime=')) {
        animeDetailPage();
    } else {
        homePage();
    }
}

function homePage() {
    trendingContainer.classList.remove('inactive');
    topAnimeContainer.classList.remove('inactive');
    upcomingContainer.classList.remove('inactive');

    getTrendingAnimes();
    getTopAnime();
    getUpcomingAnimes();
}

function animeDetailPage() {
    trendingContainer.classList.add('inactive');
    topAnimeContainer.classList.add('inactive');
    upcomingContainer.classList.add('inactive');
}