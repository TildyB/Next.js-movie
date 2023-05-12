import { useEffect,useState,useContext } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import MovieCard from '../components/MovieCard';
import styles from './index.module.css'
import { getMovies } from '../utils/getMovies';
import { UserContext, UserProvider } from '../context/UserContext';

import { useToast } from '@chakra-ui/react'
import Header from '../components/Header';

const Dashboard = () => {

    const {isLoggedIn,setIsLoggedIn,userName} = useContext(UserContext)
    
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

    const toast = useToast()
    useEffect(()=>{
        if (isLoggedIn) toast({
            title: 'Login successful',
            description: "Feel free to search and write reviews",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          
    },[isLoggedIn])
    return ( 

        <ChakraProvider>
            <Header {... { isLoggedIn, setIsLoggedIn, setMovieList,userName }} />
            <div className={styles.mainDiv}>
            <div className={styles.container}>
                {movieList.length>0 && movieList.map(movie =>(

                <MovieCard key={movie.id}{...{movie, isLoggedIn}} />
                )
                )}
            </div>
            </div>
        </ChakraProvider>
     );
}
 
export default Dashboard;