import React, { useEffect } from 'react'
import { useState } from 'react';
import '../../assets/css/CPI.css';
import Axios from 'axios';
import CPITABLE from './CPITABLE';
import {BrowserRouter as Router} from 'react-router-dom';
import {HashLink as Link} from 'react-router-hash-link';
import Horizontalarrow from '../../assets/images/horizontalarrow.png';
function Consumer_Price_Index() {
  return (
    <div>
      <h1 style={{color:'#fafafa'}} id="cpisection">-</h1>{/*Dummy H for Scrolling using framer Motion*/}
        <div className='CPIcontainer'>
          <div className='outerinitialflex'>
            <Link smooth className='link' to="#combined">
         <img className='horizontalarrow' src={Horizontalarrow}/>
         </Link>
            <div className='innerinitialflex'>
               <h1 className='CPI CPI1'><b>Consumer Price Index </b></h1>
        <h4 style={{marginBottom:40}} className='CPI CPI1 base'>(Base : 2012 = 100)</h4>
            </div>
        <Link smooth className='link' to="#commoditydesc">
         <img className='horizontalarrow2' src={Horizontalarrow}/>
         </Link>
          </div>
          
        
      <CPITABLE/>

        </div>
       
    </div>
  )
}

export default Consumer_Price_Index