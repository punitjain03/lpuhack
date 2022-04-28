import React from 'react';
import './index.css';
import Statewise from './Statewise';
import Footer from './Footer';
import Charts from './Charts';


const App = () => {
  return(
    <>
     <Statewise/>
  {/* <Contact/> */}
     <Charts />
     <Footer/>
    </>

  )
}

export default App;