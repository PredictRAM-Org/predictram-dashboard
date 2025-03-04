import Gross_Value from '../../../components/EconomicActivity/Gross_Value_Tab'
import Consumer_Price_Index from '../../../components/EconomicActivity/Consumer_Price_Index_Tab';
import IOIP from '../../../components/EconomicActivity/Index_of_Industrial_Production_Tab';
import CPI from '../../../components/EconomicActivity/CPI';
import GVA from '../../../components/EconomicActivity/GVA';
import IOIPmain from '../../../components/EconomicActivity/IOIPmain';
import { useEffect,useState } from 'react';
import '../../../assets/css/EconomicActivity.css'
function App() {
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },8000)
  },[])
  return (
    <div>
      
      <div className="App">
      <h1 className='headertext'>Economic Activity</h1>
      <div className='flexerapp'>
      <Consumer_Price_Index/>
      <Gross_Value/>
      <IOIP/>
      </div>
      <div className='mainflexerapp'> 
      <CPI/>
      <GVA/>
      <IOIPmain/>
      </div>
      
    
    </div>
      
    
    </div>
    
    
  );
}

export default App;
