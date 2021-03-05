window.onload = function () {

    const characterList = document.getElementById('characters');
    const nextBtn = document.getElementById('nextButton');
    const prevBtn = document.getElementById('prevButton');
    const nextLink = document.getElementById('nextLink');
    const prevLink = document.getElementById('prevLink');
    const searchBtn = document.getElementById('searchButton');
    const searchBar = document.getElementById('searchBar');

    const searchUrl = 'https://swapi.dev/api/people/?search=';

    searchBtn.addEventListener("click", event => {

        event.preventDefault();
        let searchText = searchBar.value;
        const search =  searchUrl + searchText;
        getPage(search, updatePage);

    });


    function getPage(url, callback) {
        characterList.innerHTML = '';
        fetch(url)
            .then(response => response.json())
            .then(callback);

    }

    function updatePage(data) {
        let i = 0;
        let starShips = [];
        data.results.forEach(character => {
            /*
            character.starships.forEach(starshipUrl => {

                fetch(starshipUrl)
                    .then(response => response.json())
                    .then(function (data) {

                    });
                    */
            
            characterList.innerHTML += `<li id="character-${i}" class="characters">
            ${character.name}</li><div id="info-${i}" style="display:none" class="show">
            <p>Gender: ${character.gender}</br>
            Birth Year: ${character.birth_year}</br>
            Eye Color: ${character.eye_color}</br>
            Hair Color: ${character.hair_color}</br>
            </p>
            </div>`

            i++
        });

        let hasNext = data.next !== null;
        let hasPrevious = data.previous !== null;

        prevButton.disabled = !hasPrevious;
        nextButton.disabled = !hasNext;


        prevLink.href = hasPrevious ? data.previous : '#';
        nextLink.href = hasNext ? data.next : '#';

    }

    function handlePagination(event) {
        event.preventDefault();
        getPage(this.href, updatePage);
    }

    document.getElementById('nextLink').addEventListener("click", handlePagination);
    document.getElementById('prevLink').addEventListener("click", handlePagination);

    document.getElementById('characters').addEventListener("click", function (event) {

        let elementId = event.target.nextSibling.id;
        let index = elementId.substring(5, 6);

        let info = document.getElementById(`info-${index}`);
        if (info.style.display === "none") {
            info.style.display = "block";

        } else {
            info.style.display = "none";
        }

    });

    getPage(`https://swapi.dev/api/people`, updatePage);

}




