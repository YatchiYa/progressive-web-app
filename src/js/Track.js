import React from 'react';
import { MDBMedia, MDBCol, MDBIcon, MDBRow } from 'mdbreact';


class Track extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        music: props.music,
        isSaved: '',
        imageUrl: props.imageUrl,
        artist: props.artist,
        favoriteSongs: [],
        prev_path: props.pathname
      }
      console.log("test");
      console.log(props.music);
    }
    componentWillMount(){
        this.getFavoriteMusic()
    }
    getFavoriteMusic(){
        const db = window.db;
        var newdata = [];

        db.open().catch(function (e) {
            console.error('Could not open local database: ', e);
        });
        db.transaction('r', db.musics, async function () {
        newdata = await db.musics.toArray();
        }).catch(function (e) {
            console.error(e);
        });
        setTimeout(() => {

            this.setState({
                favoriteSongs : newdata
            })
            this.isFavorite(newdata);
        }, 500)
    }

    isFavorite(songs) {
        this.state.favoriteSongs.forEach(song => {
            if(song.id === this.state.music.id){
                this.setState({
                    isSaved : true
                  })
            }
        });
    }

     removeTrackFromFavorite(song){
        const db = window.db;
        db.open()
            .catch(e => console.error('Could not open local db:', e));
        db.transaction('rw', db.musics, () => {
            db.musics.delete(song.id);
        }).catch(e => console.error(e));
        caches.open('musics')
        .then(cache => {
            cache.delete(this.state.imageUrl);
        })
        .catch(e => console.error('Could not save GIF image to cache:', e));
    }
     addTrackToFavorite(song) {   
        const db = window.db;
        db.open()
            .catch(e => console.error('Could not open local db:', e));
        db.transaction('rw', db.musics, () => {
            console.log("trans");
            db.musics.add({
                id: song.id,
                title: song.title,
                imageUrl: song.album.cover,
                artist: song.artist.name,
                duration: song.duration,
                album: song.album,
                preview: song.preview
            });
        }).catch(e => console.error(e));
        caches.open('musics')
        .then(cache => {
            console.log(this.state.imageUrl);
            cache.add(this.state.imageUrl);
        })
        .catch(e => console.error('Could not save GIF image to cache:', e));
    }
    updateList(event){    
        if (this.props.prev_path)
            this.setState({
                music: ''
            })
    }

    render(){
        return (
      
            <MDBCol md="6">
                {this.state.music &&
            <MDBMedia>
            <MDBMedia left className="mr-3" href="#">
                <MDBMedia object src={this.state.imageUrl} alt="" />
            </MDBMedia>
            <MDBMedia body>
                <MDBMedia heading>
                    <MDBRow>
                        <MDBCol md="12">
                            {this.state.music.title}
                        </MDBCol>
                        <MDBCol md="12">
                                <MDBIcon icon="play-circle"  style={{
                                        'color': 'blue',
                                        'float': 'right',
                                        'cursor':'pointer',
                                        'marginRight':'9%',
                                        "zIndex": "5"
                                    }} onClick={() => 
                                        this.props.history.push({
                                            pathname: '/player',
                                            music: this.state.music,
                                            artist: this.state.artist,
                                            props: {...this.props}
                                            })}/>
                                
                                {this.state.isSaved === false? 
                            
                                <MDBIcon far icon="heart" style={{
                                    'color': 'blue',
                                    'float': 'right',
                                    'marginRight':'9%',
                                    'cursor':'pointer'
                                }} 
                                onClick={() => {
                                
                                    this.setState({isSaved: true})
                                    this.addTrackToFavorite(this.state.music)
                                    

                                }}/> 
                                :<MDBIcon icon="heart" style={{
                                    'color': 'blue',
                                    'float': 'right',
                                    'cursor':'pointer',
                                    'marginRight':'9%'
                                }}
                                onClick={() => {
                                    this.setState({isSaved: false})
                                    this.removeTrackFromFavorite(this.state.music)
                                    this.updateList()
                                }} />
                                }
                        </MDBCol>
                    </MDBRow>
                </MDBMedia>
                <MDBCol>
                    {this.state.artist}<br/>  
                    <label className="ttx"><strong>Duration : </strong>{((this.state.music.duration) - (this.state.music.duration % 60)) / 60}:{this.state.music.duration % 60}</label>
                </MDBCol>
                
            </MDBMedia>
           </MDBMedia>
                }
            </MDBCol>
        
        );

    }
}

export default Track;