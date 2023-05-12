import React from 'react'
import styles from './MovieCard.module.css'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button
} from '@chakra-ui/react'
import MovieDrawer from './MovieDrawer'


function MovieCard({ movie, isLoggedIn }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  return (
    <>
    
      <div className={styles.card} onClick={onOpen}>
        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="" />
        <div>{Math.round(movie.vote_average * 10) / 10}</div>
        <h4>{movie.title}</h4>
        <p>Released: {movie.release_date}</p>
      </div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'xl'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" variant="solid"/>
          <MovieDrawer {...{onClose, movie, isLoggedIn}}/>
            
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MovieCard