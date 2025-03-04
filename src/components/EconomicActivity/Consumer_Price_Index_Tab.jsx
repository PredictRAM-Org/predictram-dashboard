import React from 'react'
import '../../assets/css/Consumer.css'
import {HashLink as Link} from 'react-router-hash-link';
function Consumer_Price_Index() {
  return (
    <div>
        <div className='container'>
        <h1 className='cpi cpi1'><b>Consumer Price Index </b></h1>
       <div className='flexer'>
        <h1 className='cpi textcpi' style={{color:'#414542'}}>CPI - Rural, Urban, Combined (All India)</h1>
        <Link smooth className='link' to="#cpisection">
        <img className='consumerarrowimg' src="https://www.pngmart.com/files/3/Up-Arrow-PNG-Transparent-Image.png"/>
        </Link>
        </div> 
        </div>
       
    </div>
  )
}

export default Consumer_Price_Index