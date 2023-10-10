import {useEffect, useState} from 'react';

import MovieCard from './MovieCard';
//importing search icon
import SearchIcon from './search.svg';
//importing styles
import './App.css';

//57dbe635 - apikey

const API_URL = 'http://www.omdbapi.com?apikey=57dbe635';

//main app component
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        searchMovies('batman');
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json(); //data object

        setMovies(data.Search);
    };

    //UI of the app component
    return (
        <div className="app">
            <h1>YourTheater</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}                            
                </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>    
            )}
        </div>
    );
};

export default App;