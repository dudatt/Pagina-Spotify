const time = document.getElementById('greeting');
const currentHour = new Date().getHours();

if (currentHour >= 5 && currentHour < 12) {
    time.textContent = "Good Morning!";
} else if (currentHour >= 12 && currentHour < 18) {
    time.textContent = "Good Afternoon!";
} else {
    time.textContent = "Good Evening!";
}

const resultArtists = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const searchInput = document.getElementById('search-input');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add('hidden');
    const artistName = document.getElementById('artist-name');
    const artistImg = document.getElementById('artist-img');

    result.forEach((element) => {
        artistName.innerText = element.name;
        artistImg.src = element.urlImg;
    });
    
    resultArtists.classList.remove('hidden');
} 

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultArtists.classList.add("hidden");
        resultPlaylist.classList.remove("hidden");
        return;
    }
    requestApi(searchTerm);
});