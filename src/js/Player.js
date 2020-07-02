import React from 'react';
import NavBar from "./NavBar"

import { MDBBtn, MDBCard, MDBCardBody,MDBIcon, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


function Player(props) {
    const music = props.music;
    const isSaved = props.isSaved;
    console.log(isSaved);
  return (  
        <div>
            <h1>Player</h1>   

            <MDBCol>
              <MDBCard >
                <MDBCardImage className="img-fluid" src={props.location.music.album.cover} waves />
                <MDBCardBody>
                  <MDBCardTitle>Card title</MDBCardTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </MDBCardText>
                  <MDBBtn href="#">MDBBtn</MDBBtn>
                  <MDBIcon icon="step-backward" />
                  <MDBIcon far icon="play-circle" />
                  <MDBIcon icon="step-forward" />
                  
                  
                </MDBCardBody>
              </MDBCard>
            </MDBCol>   
        </div>           
  );
  
  }
export default Player;