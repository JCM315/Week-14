document.addEventListener('DOMContentLoaded', (event) => {
    const movieList = document.getElementById('movie-list');

    function createMovieElement(movie) {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const image = document.createElement('img');
        image.src = movie.image;
        movieElement.appendChild(image);

        const details = document.createElement('div');
        details.classList.add('movie-details');

        const title = document.createElement('h2');
        title.textContent = movie.title;
        details.appendChild(title);

        const synopsis = document.createElement('p');
        synopsis.textContent = movie.synopsis;
        details.appendChild(synopsis);

        const rating = document.createElement('span');
        rating.textContent = `Rating: ${movie.rating}`;
        details.appendChild(rating);

        const stars = createStars(movie.rating);
        details.appendChild(stars);

        const reviews = createReviewList(movie.reviews);
        details.appendChild(reviews);

        const form = createReviewForm(movie, movieElement); 
        details.appendChild(form);

        movieElement.appendChild(details);

        return movieElement;
    }


    const movies = [
        {
            title: "Psycho (1960)",
            image: "https://posterspy.com/wp-content/uploads/2016/12/psycho_alexhess_web_wc.jpg",
            synopsis: "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
            rating: 4,
            reviews: [
                {
                    author: "The New Yorker",
                    text: "Psycho, in its dark and sordid extravagance, remains utterly contemporary, in its subject as well as in its production."
                },
                {
                    author: "The New York Times",
                    text: "The consequence in his denouement falls quite flat for us. But the acting is fair. Mr. Perkins and Miss Leigh perform with verve, and Vera Miles, John Gavin, and Martin Balsam do well enough in other roles."
                }
            ]
        },
        {
            title: "The Godfather",
            image: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            rating: 5,
            reviews: [
                {
                    author: "Austin Chronicle",
                    text: "Just about as great as a movie's ever gonna be... As for the storytellng, The Godfather is an intricately constructed gem that simultaneously kicks ass."
                },
                {
                    author: "Chicago Sun-Times",
                    text: "The wedding sequence... is a virtuoso stretch of filmmaking: Coppola brings his large cast onstage so artfully that we are drawn at once into the Godfather's world."
                }
            ]
        },
        {
            title: "The Dark Knight",
            image: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            rating: 5,
            reviews: [
                {
                    author: "Time ",
                    text: "Beyond dark. It's as black -- and teeming and toxic -- as the mind of the Joker. Batman Begins the 2005 film that launched Nolan's series, was a mere five-finger exercise. This is the full symphony.."
                },
                {
                    author: "Miami Herald",
                    text: "The Dark Knight is dark, all right: It's a luxurious nightmare disguised in a superhero costume, and it's proof that popcorn entertainments don't have to talk down to their audiences in order to satisfy them. The bar for comic-book film adaptations has been permanently raised."
                }

            ]
        },
        {
            title: "The Godfather Part II",
            image: "https://image.tmdb.org/t/p/original/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
            synopsis: "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
            rating: 5,
            reviews: [
                {
                    author: "Empire",
                    text: "And with supporting roles from the likes of Diane Keaton, Robert Duvall and Lee Strasberg, to say nothing of Roger Corman and Harry Dean Stanton in bit parts, this is nothing short of magisterial."
                },
                {
                    author: "Total Film",
                    text: "The plotting is elliptical and the sweep intoxicates, but the contrast between De Niro’s meditative Vito and Pacino’s soul-starved eyes brings piercing focus to Coppola’s resonating study of corrupting power."
                }
            ]
        }
    ];

    for (const movie of movies) {
        const movieElement = createMovieElement(movie);
        movieList.appendChild(movieElement);
    }

    function createReviewList(reviews) {
        const reviewsElement = document.createElement('div');
        reviewsElement.classList.add('reviews');

        for (const review of reviews) {
            const reviewElement = document.createElement('p');
            reviewElement.textContent = `${review.author}: ${review.text}`;
            reviewsElement.appendChild(reviewElement);
        }

        return reviewsElement;
    }

    function createReviewForm(movie, movieElement) { 
        const form = document.createElement('form');
        form.classList.add('review-form');
    
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Name:';
        form.appendChild(nameLabel);
    
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        form.appendChild(nameInput);

        const ratingLabel = document.createElement('label');
        ratingLabel.textContent = 'Rating:';
        form.appendChild(ratingLabel);

    
        const ratingInput = document.createElement('input');
        ratingInput.type = 'number';
        ratingInput.name = 'rating';
        ratingInput.min = '1';
        ratingInput.max = '5';
        ratingInput.placeholder = 'Enter star rating (1-5)';
        form.appendChild(ratingInput);

        const reviewLabel = document.createElement('label');
        reviewLabel.textContent = 'Review:';
        form.appendChild(reviewLabel);
    
        const reviewInput = document.createElement('input');
        reviewInput.type = 'text';
        reviewInput.name = 'review';
        reviewInput.placeholder = 'Write a review...';
        form.appendChild(reviewInput);
    
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);
    
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = nameInput.value;
            const rating = parseInt(ratingInput.value); 
            const review = reviewInput.value;
            movie.reviews.push({ author: name, rating: rating, text: review }); 
            const reviewElement = document.createElement('p');
            reviewElement.textContent = `${name} (${rating} stars): ${review}`; 
            const reviewsContainer = movieElement.querySelector('.reviews');
            reviewsContainer.appendChild(reviewElement);
            nameInput.value = ''; 
            ratingInput.value = ''; 
            reviewInput.value = ''; 
        });
    
        return form;
    }
    
    function createStars(rating) {
        const starsElement = document.createElement('div');
        starsElement.classList.add('stars');

        for (let i = 0; i < rating; i++) {
            const star = document.createElement('span');
            star.textContent = '★';
            starsElement.appendChild(star);
        }

        for (let i = 0; i < (5 - rating); i++) {
            const star = document.createElement('span');
            star.textContent = '☆';
            starsElement.appendChild(star);
        }

        return starsElement;
    }
});
