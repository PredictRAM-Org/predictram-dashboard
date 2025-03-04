import React, { useEffect } from 'react'
import { useState } from 'react';
import '../../assets/css/GVA.css';
import Axios from 'axios';
import GVATABLE from './GVATable';
import {BrowserRouter as Router} from 'react-router-dom';
import {HashLink as Link} from 'react-router-hash-link';
import Horizontalarrow from '../../assets/images/horizontalarrow.png';

function Consumer_Price_Index() {
  
  return (
    <div>
      <h1 style={{color:'#fafafa'}} id="gvasection">-</h1>{/*Dummy H for Scrolling using framer Motion*/}
        <div className='GVAcontainer'>
          <div className='gvaflex'>
            <Link smooth className='link' to="#2020-21">
         <img className='gvahorizontalarrow' src={Horizontalarrow}/>
         </Link>
          <h1 className='GVA GVA1'><b>Gross Value Added By Economic Activity Constant Price (2011-12) </b></h1>
          <Link smooth className='link' to="#1950-51">
         <img className='gvahorizontalarrow2' src={Horizontalarrow}/>
         </Link>
          </div>
        
      <GVATABLE/>

        </div>
       
    </div>
  )
}

export default Consumer_Price_Index