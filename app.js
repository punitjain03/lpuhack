const API_KEY = 'https://api.themoviedb.org/3/movie/550?api_key=21958744bdcd83994642863edf06f583';

const key_aapi = 'api_key=21958744bdcd83994642863edf06f583';

const IMG_URL = 'https://image.tmdb.org/t/p/original'

const b_base_url = 'https://api.themoviedb.org/3'

const BASE_URL ='https://api.themoviedb.org/3/trending/movie/week?api_key=21958744bdcd83994642863edf06f583';

const BASE_TV = 'https://api.themoviedb.org/3/tv/popular?api_key=21958744bdcd83994642863edf06f583'

const searchURL = b_base_url + '/search/movie?' + key_aapi;

const main = document.getElementById('main');

// const form = document.getElementById('form');

const search = document.getElementById('search');

getMovies(BASE_URL);


function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);

        showMovies(data.results);


    })
}


function showMovies(data){

    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path ,vote_average, overview} = movie;
        const movieEL =document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML = `
                 <img src="${IMG_URL+poster_path}" alt="${title}" >
                   <div class="movie-info">
                       <h3>${title}</h3> 
                       <span class="color">${vote_average}</span>
                   </div>
                   <div class="overview">
                   <h3>overview</h3>
              ${overview}
               </div>`

               main.appendChild(movieEL);
    })}

    

    form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const searchTerm = search.value;

        if(searchTerm){
            getMovies(searchURL+'&query='+searchTerm)
        }
    })