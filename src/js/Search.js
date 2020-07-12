import React from 'react';
import {useState} from 'react';
import fetchJsonp from 'fetch-jsonp';
import { MDBCol, MDBIcon} from "mdbreact";
import Track from './Track';
import NavBar from './NavBar'


function Search(props) {
    const [title, setTitle] = useState('');
    const [musics, setMusics] = useState([]);
    
    function changeTitle(title) {
    setTitle(title.target.value);
    console.log(title.target.value);
    }
        
	function onSearch(event) {
		
		event.preventDefault(); 
		
		const encodedTitle = encodeURIComponent(title);
		
		fetchJsonp(
		`https://api.deezer.com/search?q=${encodedTitle}&output=jsonp&limit=5`
		)
		.then(res => res.json())
		.then(data => data.data)
		.then(musics => {
			setMusics(musics);
			console.log(musics);
		});
		
	}
	
	


	return (
		<div>
			<NavBar/>  
			
			<div>
            <MDBCol md="6">
                <div className="input-group md-form form-sm form-1 pl-0">

                    <input className="form-control my-0 py-1" type="text" onChange={changeTitle} placeholder="Search" aria-label="Search" />
                    <div className="input-group-prepend">
                    <span className="input-group-text purple lighten-3" id="basic-text1" style={{
                                "cursor": "pointer"
                            }} >
                        <MDBIcon className="text-black" icon="search" onClick={onSearch} />
                    </span>
                    </div>
                </div>
            </MDBCol>

            </div>
			<div className="card-group search-results">
				{musics && musics.map(music => (
					<Track {...props} key={music.id} 
						music={music} 
						//isSaved= {false}
						artist= {music.artist.name}
						imageUrl= {music.album.cover}
						prev_path={false}
					/>
				))}

			</div>
		</div>	
	);

}

export default Search;