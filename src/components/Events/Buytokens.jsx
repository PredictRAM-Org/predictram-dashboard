import {CCard,CCardBody,CTable,CTableHead,CTableRow,CTableHeaderCell,CFormInput,CFormLabel,CButton} from "@coreui/react-pro"
import {get,post} from "axios"
import {useEffect,useState} from "react"
import {toast} from "react-toastify"
import {useParams} from "react-router-dom"
import {ContractProvider,getBalanceOfUser} from "../../web3/web3" 
import {useMetaMask} from "metamask-react"
export default function Buytokens({event}) {
    const {account}=useMetaMask()
    const {id}=useParams()
    async function Purchase(){
    toast.loading("Purchasing")
    console.log(event)
    if(account){
      if(purchase>0)
    try{
      const {data}=await post("/api/users/purchaseevent",{id,purchase,account})
      // await ContractProvider(event.polygonportfolioaddress,data.sign)
      await ContractProvider(event.kardiaportfolioaddress,data.sign)
      toast.dismiss()
      toast.success("Transaction Complete")
    }catch(e){
        toast.dismiss()
      toast.error("Transaction failed")
      console.log("CreatePorfolioError", e.message);
    }else{
      toast.dismiss()
      toast.error("Amount must be greater then 0")
    }
    }else{
      toast.dismiss()
      toast.error("Connect metamask fast.")

    }
  }
    const [purchase,setPurchase]=useState(0)
    const [matic,setMatic]=useState(false)
    const [currentprice,setCurrentprice]=useState(false)
    useEffect(()=>{
        async function fetchdata(){
            try{
      let {data}=await get("https://http-api.livecoinwatch.com/tools/conversion?from=INR&to=KAI")
      console.log(data)
      setMatic(data.conversion)
       data=await post("/api/users/geteventprice",{id})
        data=data.data
      if(data.currentprice)
      setCurrentprice(data.currentprice)
    }catch(e){
        console.log(e.message)
    }
        }
        fetchdata();
    },[])
    async function Balance(){
      try{
      toast.success(await getBalanceOfUser(event.kardiaportfolioaddress,account))
      }catch(e){
        toast.error(e.message)
      }
    }
  return (
    <><CTable align='middle'>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">Current Price in INR {currentprice}</CTableHeaderCell>
      <CTableHeaderCell scope="col">You Own {0}</CTableHeaderCell>
      <CTableHeaderCell scope="col">Current Price in KAI {matic*currentprice} </CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  </CTable>
  <CCardBody className="text-center">
  <CCard style={{ width: '18rem' }} className="d-inline-block">
  <CCardBody>

    <CFormLabel htmlFor="basic-url">Amount you get (TOKEN)</CFormLabel>
  <CFormInput id='token' type="number" aria-describedby="basic-addon3" value={purchase} disabled />
  <CFormLabel htmlFor="basic-url">Amount you pay (INR)</CFormLabel>
  <CFormInput id="inr" type='number' aria-describedby="basic-addon3" onChange={(e)=>{setPurchase(e.target.value/currentprice)}
  }/>
  <CButton className="m-2" onClick={Purchase} color="success" type='button' size="lg">Purchase</CButton>
   <CButton className="m-2" onClick={Balance} color="success" type='button' size="lg">Get Balance</CButton>
  </CCardBody>
</CCard>
</CCardBody></>
  )
}
