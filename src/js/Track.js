import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MDBFormInline, MDBBtn } from "mdbreact";
import { MDBMedia, MDBCol, MDBIcon } from 'mdbreact';
function Track(props){
    const music = props.music;
    const isSaved = props.isSaved;
    console.log(isSaved);
    
    return (
            <MDBCol md="6">
            <MDBMedia>
            <MDBMedia left className="mr-3" href="#">
            <MDBMedia object src={music.album.cover} alt="" />
            </MDBMedia>
            <MDBMedia body>
            <MDBMedia heading>
            {music.title}
            {isSaved == false? 
            <MDBIcon far icon="heart"   style={{
                'color': 'blue',
                'float': 'right',
                'marginRight':'9%',
                'cursor':'pointer'
            }} /> 
            :<MDBIcon icon="heart" style={{
                'color': 'blue',
                'float': 'right',
                'cursor':'pointer',
                'marginRight':'9%'
            }} />
            }
            </MDBMedia>
            
            {music.artist.name}/{music.album.title} <br/>  
            <audio src={music.preview} className="w-100" controls></audio><br />
            </MDBMedia>
            <Link to= {{
				pathname: "/player",
				music: music
			}}>
    		 <MDBBtn type="button">  Click Me!</MDBBtn>
 			</Link>
           </MDBMedia>
            </MDBCol>
        
        );
}
    

export default Track;