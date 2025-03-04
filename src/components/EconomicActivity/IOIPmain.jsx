import React, { useEffect } from 'react'
import { useState } from 'react';
import '../../assets/css/IOIPmain.css'
import Axios from 'axios';
import IOIPTABLE from './IOIPTABLE';
import IOIPTABLE2 from './IOIPTABLE2';
import {BrowserRouter as Router} from 'react-router-dom';
function Consumer_Price_Index() {
    
  return (
    <div>
      <h1 style={{color:'#fafafa'}} id="ioipsection">-</h1>{/*Dummy H for Scrolling using framer Motion*/}
        <div className='IOIPcontainer'>
        <h1 className='IOIP IOIP1'><b>Index Of Industrial Production</b></h1>
        <h4 style={{marginBottom:40}} className='IOIP IOIP1 base'>(Base 2011-12)</h4>
        <h4 style={{marginBottom:40}} className='IOIP IOIP1 baseunderline'>Annual indices of industrial production as per use-based classification</h4>

      <IOIPTABLE/>
      <br/>
        <h4 style={{marginBottom:40}} className='IOIP IOIP1 baseunderline'>Annual growth rates as per IIP (%) calculated w.r.t. previous year</h4>
        <IOIPTABLE2/>
        </div>
       
    </div>
  )
}

export default Consumer_Price_Index