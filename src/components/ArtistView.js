// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'

function ArtistView() {
    const [ artistData, setArtistData ] = useState([])
    const navigate = useNavigate()
    
    const navButtons = () =>{
        return (
            <div>
                <button onClick={() => navigate(-1)}> Back</button>
                |
                <button onClick={() => navigate('/')}> Home</button>
            </div>
        )
    }
    const {id} =useParams()
    useEffect(() =>{
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () =>{
            const resopnce = await fetch (API_URL)
            const data = await resopnce.json()
            const albums = data.results.filter(item => item.collectionType === 'Album')
            setArtistData(albums)

        }
        fetchData()
    },[id])

    const albumDisplay = artistData.map(album =>{
        return(
            <div>
                <Link to={`/album/${album.collectionId}`}>
            <p key={album.collectionId}>{album.collectionName}</p>
            </Link>
        
    </div>
        )
    })

  

    return (
        <div>
            {navButtons()}
            {albumDisplay}
        </div>
    )
}

export default ArtistView