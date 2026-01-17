import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../store/movieSlice'
import  { useEffect } from 'react'

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    getNowMovies();
  }, []);
};

export default useNowPlayingMovies
