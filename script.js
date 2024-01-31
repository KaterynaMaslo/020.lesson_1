// API

const API = 'https://65ba9ccab4d53c06655350d9.mockapi.io'

const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

async function controller(action, method = METHOD.GET, body) {
	const headers = {
		'Content-type': 'application/json; charset=UTF-8',
	};

	const request = {
		method,
		headers,
	};

	if (body) request.body = JSON.stringify(body);

	const response = await fetch(`${API}/${action}`, request);
	const data = await response.json();

	return data;
}

// ADD EXIST UNIVERSES

const comicsOptions = document.querySelector('#comics');

async function renderUniverses() {
    const universes = await controller('/universes');
    comicsOptions.innerHTML = '';

    universes.forEach(element => {
        const option = document.createElement('option');
        option.innerHTML = element.name;
        comicsOptions.appendChild(option);
  })
}

// RENDER HERO

function renderHero(hero) {
}

// ADD HERO

const addButton = document.querySelector('#addHero'); 

async function fetchHeroes() {
    const heroes = await controller('/heroes');
    return heroes;
}

async function fetchHero(heroId) {
    const hero = await controller(`/heroes/${heroId}`);
    return hero;
}

async function findHero() {
    const name = document.querySelector("#nameHero").value;

    const heroes = await fetchHeroes();
    const foundHero = heroes.find((heroToFind) => heroToFind.name.toLowerCase() === name.trim().toLowerCase());

    if(foundHero?.id){
        console.log('hero exist');
        return;
    }
}

addButton.addEventListener('click', findHero);

renderUniverses();