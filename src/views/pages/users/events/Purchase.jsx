import {useState,useEffect} from "react"
import {get,post} from "axios"
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import {CTable,CTableHead,CTableRow,CTableHeaderCell,CCard,CCardBody,CButton,CFormInput,CFormLabel} from "@coreui/react"
export default function Purchase() {
  const [matic,setMatic]=useState(false)
  const [purchase,setPurchase]=useState(0)
  const [currentprice,setCurrentprice]=useState(false)
  const event=useSelector(state=>state.event.event)
  const price=useSelector(state=>state.price)
  useEffect(async()=>{
    try{
      const {data}=await get("https://http-api.livecoinwatch.com/tools/conversion?from=INR&to=MATIC")
      setMatic(data.conversion)
      console.log(data)
    }catch{
  }
  },[])
  useEffect(()=>{
    if(event.portfolioaddress){
      const getcurrentprice=async()=>{
    try{
      const {data}=await post("/api/users/geteventprice",{id})
      if(data.currentprice)
      setCurrentprice(data.currentprice)
      console.log("price",data)
    }catch{

    }
    }
    getcurrentprice()
    }
  },[event])
    async function Purchase(){
    if(account){
      if(purchase>0)
    try{
      const {data}=await post("/api/users/purchaseevent",{id,purchase,account})
      await ContractProvider(event.portfolioaddress)
      console.log(data,event.portfolioaddress)
      await buyPortfolioBuyer(data.sign,data.amount)
      console.log(data,event.portfolioaddress)
    }catch(e){
      console.log(e)

    }else{
      toast.error("Amount must be greater then 0")
    }
    }else{
      toast.error("Connect metamask fast.")

    }
      
  }
  return (
    <>
        <CTable align='middle'>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">Current Price in INR {currentprice}</CTableHeaderCell>
      <CTableHeaderCell scope="col">You Own {0}</CTableHeaderCell>
      {matic&&currentprice&&<CTableHeaderCell scope="col">Current Price in MATIC {matic*currentprice} </CTableHeaderCell>}
    </CTableRow>
  </CTableHead>
  </CTable>
  {event.portfolioaddress&&currentprice&&<CCardBody className="text-center">
  <CCard style={{ width: '18rem' }} className="d-inline-block">
  <CCardBody>
    {/* <CCardTitle>Card title</CCardTitle> */}
    <CFormLabel htmlFor="basic-url">Amount you purchase (TOKEN)</CFormLabel>
  <CFormInput id='token' type="number" aria-describedby="basic-addon3" value={purchase} disabled />
  <CFormLabel htmlFor="basic-url">Amount you pay (INR)</CFormLabel>
  <CFormInput id="inr" type='number' aria-describedby="basic-addon3" onChange={(e)=>{setPurchase(e.target.value/currentprice)}
  }/>
  <CButton className="m-2" onClick={Purchase} color="success" type='button' size="lg">Purchase</CButton>
  </CCardBody>
</CCard>
</CCardBody>}
    </>
  )
}
