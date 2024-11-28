const API_PLANETS_LIST = 'https://swapi.tech/api/planets/';

async function loadPlanets() {
    try {
        document.getElementById('loading').style.display = 'block';

        const response = await fetch(API_PLANETS_LIST);
        const data = await response.json();
        
        const planetsDetails = [];

        for (let planet of data.results) {
            const planetDetails = await fetch(planet.url);
            const planetData = await planetDetails.json();
            
            planetsDetails.push(planetData.result.properties);
        }

        renderPlanetsTable(planetsDetails);

        document.getElementById('loading').style.display = 'none';

    } catch (error) {
        console.error('Error loading planets:', error);
    }
}

function renderPlanetsTable(planets) {
    const tableBody = document.getElementById('planets-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    planets.forEach(planet => {
        const row = tableBody.insertRow();
        
        row.innerHTML = `
            <td>${planet.name}</td>
            <td>${planet.diameter}</td>
            <td>${planet.rotation_period}</td>
            <td>${planet.orbital_period}</td>
            <td>${planet.gravity}</td>
            <td>${planet.population}</td>
            <td>${planet.climate}</td>
            <td>${planet.terrain}</td>
        `;
    });
}

if (window.location.pathname.includes('planets.html')) {
    loadPlanets();
}