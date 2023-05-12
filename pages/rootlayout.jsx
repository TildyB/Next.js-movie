import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getMovies } from '../api/getMovies';


const RootLayout = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
    const [movieList, setMovieList] = useState([]);

    console.log(movieList);

    useEffect(()=>{
        if (!movieList.length) {
            const init = async () =>{
                const data = await getMovies()
                setMovieList(data)
            }
            init()
        }
    }, [movieList])
    return (
        <>
            
            <Outlet context={[isLoggedIn, setIsLoggedIn, movieList, setMovieList]} />
        </>
    );
}

export default RootLayout;