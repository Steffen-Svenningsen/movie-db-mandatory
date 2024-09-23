'use strict';

const baseUrl = "https://api.themoviedb.org/3/movie"
const movieSection = document.getElementById("movieSection")

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjk4ZGE4MWJkOGZkNWQ0OGNlM2ZiZThkODdkMTYxNCIsIm5iZiI6MTcyNjQ4MzY1NS4xOTYwNDMsInN1YiI6IjY2ZTgwYjdhZTgyMTFlY2QyMmIwZmJlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t8e9VYjCeVjSfkItkmlv6TSauVi_-ImCSXjgcqvhTjA'
    }
};

// Function to fetch movies based on category
function fetchMovies(category) {
    fetch(`${baseUrl}/${category}?language=en-US&page=1`, options)
        .then(response => response.json())
        // Pass movies to display function
        .then(data => displayMovies(data.results))
        .catch(err => console.error(err));
}

// Function to display movies on the page
function displayMovies(movies) {
    // Clear previous movies
    movieSection.innerHTML = "";

    movies.forEach(movie => {
        // Create a movie card
        const movieCard = document.createElement('article');
        movieCard.classList.add('movie-card');

        // Add the movie
        movieCard.innerHTML = `
            <section class="image-container">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
            </section>
            <section class="movie-content">
                <header>
                    <h2>${movie.title}</h2>
                </header>
                <p>${movie.overview}</p>
                <div class="movie-info">
                    <p class="rating">TMDb rating:<span class="normal-span">${movie.vote_average.toFixed(1)}</span></p>
                    <p class="date">Release date:<span class="normal-span">${movie.release_date}</span></p>
                </div>
            </section>
        `;

        // Append movie card to the section
        movieSection.appendChild(movieCard);
    });
}

// Event listeners for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default anchor behavior
        e.preventDefault();
        // Get category from data attribute
        const category = e.target.getAttribute('data-category');
        // Fetch and display movies for the selected category
        fetchMovies(category);
    });
});

// Fetch movies on load and set default category
fetchMovies('now_playing');