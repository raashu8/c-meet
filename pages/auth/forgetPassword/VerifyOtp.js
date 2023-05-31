import { Button, Grid, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { router } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { forgotpasApi, verifyOtpApi } from "@/redux/action/authAction";
import { authSelector } from "@/redux/slice/authSlice";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { UilAngleLeft } from "@iconscout/react-unicons";
import { MuiOtpInput } from 'mui-one-time-password-input'

function VerifyOtp() {
  const dispatch = useDispatch();
  const { forgotOtpInfo, verifyotp } = useSelector(authSelector);
  const [otp, setOtp] = React.useState('')
  const [uname, setUname] = useState("");
  const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
    }),
    onSubmit: (res) => {  

      const reqbody = {
        username: res?.email,
      };
      setUname(res?.email);
      dispatch(forgotpasApi(reqbody));
      // formik.resetForm();
    },
  });

  const handleVerify = (rescode) => {
    const req = {
      otp: otp,
      username: uname,
    };
    dispatch(verifyOtpApi(req?.otp, req.username));
  };

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const resendOTP = () => {
    const reqbody = {
      username: uname,
    };
    dispatch(forgotpasApi(reqbody));
  }

  // const handleotp=(e)=>{
  //   setOtpp(e.target.value)
  // }

  return (
    <div style={{ margin: "0px !important", padding: "0px !important" }}>
      <Grid container>
        <Grid item xl={7} lg={7} md={5} sm={12} xs={12}>
          <div className="container-login">
            <div>
              <IconButton
                onClick={() => {
                  router.push("/auth/login");
                }}
                className="bck-ico"
              >
                <UilAngleLeft />
              </IconButton>
              <div >
                <h1 style={{ color: "#012970", fontWeight: "600" }}>
                  Verify OTP
                </h1>
                <p style={{ marginTop: "10px", marginBottom: "32px" }}>
                  Verify your Email address!{" "}
                </p>
                {/* <div style={{ textAlign: "center" }}>
                  <img
                    style={{ width: "50%" }}
                    src="../assets/img/forget.png"
                    className="img-fluid"
                    alt=""
                  />
                </div> */}
              </div>

              <label style={{ fontWeight: "bold" }} className="label-text-2">
                Email{" "}
              </label>

              <div>
                <TextField
                  id="outlined-basic"
                  name="email"
                  className="input-col"
                  fullWidth
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  helperText={formik.touched.email ? formik.errors.email : null}
                  placeholder={"Your email address"}
                  type="email"
                  error={formik.touched.email ? formik.errors.email : null}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={formik.handleSubmit}
                  className="sign-in-bttn1"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#012970",
                    borderRadius: "10px",
                    mt: 2,
                  }}
                >
                  Get Otp
                  <NavigateNextIcon />
                </Button>
              </div>

              <label
                style={{ fontWeight: "bold", marginTop: "20px" }}
                className="label-text-2"
              >
                Enter OTP{" "}
              </label>
              <div>
                {/* <TextField
                  className="input-col"
                  fullWidth
                  id="outlined-number"
                  type="text"
                  label="Enter code"
                  disabled={verifyotp}
                  name="otp" 
                /> */}
                <MuiOtpInput value={otp} onChange={handleChange} length={6} />

                <p style={{ padding: "1rem 0rem" }}>Did not received OTP? <span style={{ color: "#012970", fontWeight: "bold", cursor: "pointer" }} onClick={resendOTP} >Resend OTP</span> </p>
              </div>
              <div style={{ textAlign: "center" }}>

                <Button
                  className="sign-in-bttn1"
                  variant="contained"
                  size="large"
                  onClick={handleVerify}
                  sx={{
                    backgroundColor: "#012970",
                    borderRadius: "10px",
                    mt: 2,
                  }}
                >
                  Verify
                  <NavigateNextIcon sx={{}} />
                </Button>
              </div>
            </div>
            <div
              style={{
                alignItems: "right",
                marginTop: "20px",
                textAlign: "right",
              }}
            ></div>
          </div>
        </Grid>
        <Grid item xl={5} lg={5} md={7} sm={12} xs={12}>
          <img
            src="../../assets/Images/colan-login.png"
            className="login-bg-img"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default VerifyOtp;
