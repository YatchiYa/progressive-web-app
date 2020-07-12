import React from 'react';
import Track from './Track';

class Trending extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      musics: []
    }
  }
  componentDidMount(){
    this.onSearch();
  }
  
  async onSearch() {
  
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = "https://api.deezer.com/radio/7/tracks&limit=40"
      var newdata= [];
        await fetch(proxyUrl + targetUrl)
        .then(blob => blob.json())
        .then(data => {
           newdata =data.data;           
        })
        setTimeout(() => {
          this.setState({
            musics : newdata
          })
    }, 500)		
  }

  render(){
    return(
    <div>
       <h1>Les tendances</h1>  
			
			<div className="card-group search-results">
				{this.state.musics.map(music => (     
          <Track {...this.props}
            key={music.id} 
						music={music} 
            artist= {music.artist.name}
            imageUrl= {music.album.cover}
            prev_path={false}
					/>
				))}

			</div>
		</div>	       
    )
  }
}
  
export default Trending;




