import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'

function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])


  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        const url = new URL (`https://itunes.apple.com/search?term=${search}`)
        const response = await fetch(url)
        const data = await response.json()
        console.log('data', data)
        if (data.results.length > 0) {
          setData(data.results)
        } else {
          setMessage('Not Found')
          setData([])
        }
      }
    }

    fetchData()
  }, [search])
  return(
      <div>
        {message}
        <Router>
          <Routes>
            <Route path='/' element={
              <>
              <SearchBar handleSearch = {handleSearch}  />
              <Gallery data = {data} />
              </>
            }/>
            <Route path='/album/:id' element={<AlbumView/>} />
            <Route path='/artist/:id' element={<ArtistView/>}/>
          </Routes>
        </Router>
            
            
            
      </div>
   );
}


export default App;