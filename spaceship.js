const API_STARSHIPS_LIST = 'https://swapi.tech/api/starships/';

async function loadStarships() {
    try {
        document.getElementById('loading').style.display = 'block';

        const response = await fetch(API_STARSHIPS_LIST);
        const data = await response.json();
        
        const starshipsDetails = [];

        for (let starship of data.results) {
            const starshipDetails = await fetch(starship.url);
            const starshipData = await starshipDetails.json();
            
            starshipsDetails.push(starshipData.result.properties);
        }

        renderStarshipsTable(starshipsDetails);

        document.getElementById('loading').style.display = 'none';

    } catch (error) {
        console.error('Error loading starships:', error);
    }
}

function renderStarshipsTable(starships) {
    const tableBody = document.getElementById('starships-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    starships.forEach(starship => {
        const row = tableBody.insertRow();
        
        row.innerHTML = `
            <td>${starship.name}</td>
            <td>${starship.cargo_capacity}</td>
            <td>${starship.consumables}</td>
            <td>${starship.cost_in_credits}</td>
            <td>${starship.crew}</td>
            <td>${starship.length}</td>
            <td>${starship.max_atmosphering_speed}</td>
            <td>${starship.passengers}</td>
        `;
    });
}

if (window.location.pathname.includes('spaceships.html')) {
    loadStarships();
}