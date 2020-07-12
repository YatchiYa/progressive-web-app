import React from 'react';
import '../index.css'
import NavBar from './NavBar'



function Home(props) {
 


  return (
    <div className="background_img">
    <NavBar/>  
    <h3> <strong>Welcole to Deezer app</strong> </h3>
      <img src={require('../deezer.png')} alt="deeze img" className="img_bk" />
    </div>
    
    );
}

export default Home;