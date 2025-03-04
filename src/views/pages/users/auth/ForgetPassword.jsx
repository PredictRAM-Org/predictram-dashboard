import {
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardTitle,
    CInputGroup,
    CRow
} from '@coreui/react'
import {useHistory} from "react-router-dom"
import {useState} from "react"
import {post} from "axios"
import {toast} from "react-toastify"
export default function ForgetPassword() {
    const history = useHistory()
    const [state,setState]=useState({
        email:"",
        password:"",
        confirmpassword:"",
        otp:""
    })
    const changeHandeler=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    async function sendotp(e){
        try{
            const {data}=await post("/api/users/sendEmailOtp",{email:state.email});
            toast.success(data)
        }catch(error){
            toast.error(error.response&&error.response.data)
        }
        
    }
    async function forgetpassword(e){
        e.preventDefault();
        try{
            if(state.password!=state.confirmpassword)
            return toast.error("password and confirm password must be same")
            const {data}=await post("/api/users/forgetpassword",{
                email:state.email,
                password:state.password,
                otp:state.otp
            })
            history.push("/login")
            toast.success(data)
        }catch(error){
            toast.error(error.response&&error.response.data)
        }
    }
  return <CCard>
        <CCardHeader>
            <CCardTitle>
                Forget Password
            </CCardTitle>
        </CCardHeader>
        <CCardBody>
        <CForm onSubmit={forgetpassword} className="row g-3" >
                <CCol xs={12} md={6}>
                <CFormLabel htmlFor="inputEmail">Email Address</CFormLabel>
                <CInputGroup className="mb-3">
                <CFormInput onChange={changeHandeler} required id="inputEmail" name="email" type='email' placeholder="Enter Email Address" aria-describedby="button-addon1" />
                <CButton onClick={sendotp} type="button" color="primary" variant="outline" id="button-addon1">Send OTP</CButton>
                </CInputGroup>
                </CCol>
                <CCol xs={12} md={6}>
                <CFormLabel htmlFor="inputPassword"> Password</CFormLabel>
                <CFormInput required id="inputPassword" type='password' onChange={changeHandeler} name='password' placeholder="Password" /> </CCol>
                <CCol xs={12} md={6}>
                <CFormLabel htmlFor="inputConfirmPassword">Confirm Password</CFormLabel>
                <CFormInput type='password' required id="inputConfirmPassword" onChange={changeHandeler} name="confirmpassword" placeholder=" Confirm Password" /> </CCol>
                
                <CCol xs={12} md={6}>
                <CFormLabel htmlFor="inputOtp">OTP</CFormLabel>
                <CFormInput onChange={changeHandeler} id="inputOtp" name="otp" required placeholder="Enter OTP"/>
                </CCol>
             <CRow className="m-2">
                 <CCol xs={12} className="text-center">
                <CButton type="submit">Reset Password</CButton>
            </CCol>
             </CRow>
        </CForm>
        </CCardBody>
        </CCard>
}
