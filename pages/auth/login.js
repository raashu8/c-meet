import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { router } from "next/router";
import { UilAngleLeft } from "@iconscout/react-unicons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginApi, oAuthApi } from "@/redux/action/authAction";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  // const LoginDataLoading = useSelector((state) => state.auth?.signInInfo);

  // const OauthDataLoading = useSelector((state) => state.auth?.oAuthsignInInfo);
  // const { data: session } = useSession();

  // const HandleLogin = () => {
  //   const reqBody = {
  //     email: session?.user?.email,
  //     image: session?.user?.image,
  //     name: session?.user?.name,
  //   };
  //   dispatch(oAuthApi(reqBody));
  // };

  // useEffect(() => {
  //   if (session) {
  //     HandleLogin();
  //   }
  // }, [session]);

  const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          passRegExp,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .matches(passRegExp, "Enter strong password")
        .matches(
          passRegExp,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (res) => {
      const reqBody = {
        username: res.email,
        password: res.password,
      };
      dispatch(loginApi(reqBody));
      sessionStorage.setItem("username", res.email);
    },
  });

  const forgetPassword = () => {
    router.push("/auth/forgetPassword/VerifyOtp");
  };
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  
  return (
    <div style={{ margin: "0px !important", padding: "0px !important" }}>
      <Grid container>
        <Grid item xl={7} lg={7} md={5} sm={12} xs={12}>
          <div className="container-login">
              <IconButton
                onClick={() => {
                  router.push("/home/User");
                }}
                className="bck-ico"
              >
                <UilAngleLeft />
              </IconButton>
            <div>
              <h1>Sign In</h1>
              <p style={{ marginTop: "10px", marginBottom: "32px" }}>
                Enter your email and password to sign in!{" "}
              </p>
              {/* <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<FcGoogle />}
                  onClick={
                    () => signIn("google")
                    // sessionStorage.setItem("googleGmail","google")
                  }
                  className="gogle-icon"
                >
                  {" "}
                  Sign in with google{" "}
                </Button>
              </div> */}
              <h2 className="or-tag" style={{ marginBottom: "45px" }}>
                <span className="or-tag-span" style={{ color: "#555555" }}>
                  or
                </span>
              </h2>
              <label className="label-text-2">Email </label>
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
                placeholder={"Enter the your email address"}
                type="email"
                sx={{
                  color: "white",
                  borderColor: "white",
                  marginBottom: "1rem",
                }}
                error={formik.touched.email ? formik.errors.email : null}
              />

              <label className="label-text-2">Password </label>
              <OutlinedInput
                className="form-ht"
                sx={{ marginBottom: "2px" }}
                id="password"
                fullWidth
                height="0.4375em"
                name="password"
                placeholder="Password"
                type={secureTextEntry ? "password" : "text"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password ? formik.errors.password : null
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleSecureEntry}
                      edge="end"
                    >
                      {secureTextEntry ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>
                {formik.touched.password ? formik.errors.password : null}
              </FormHelperText>
            </div>
            <div
              style={{
                alignItems: "right",
                marginTop: "20px",
                textAlign: "right",
              }}
            >
              <p
                onClick={forgetPassword}
                style={{
                  float: "right",
                  fontWeight: "900",
                  color: "#012970",
                  cursor: "pointer",
                }}
              >
                Forget password?
              </p>
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <button
                className="sign-in-bttn"
                type="button"
                onClick={formik.handleSubmit}
              >
                Sign In
              </button>
            </div>
            <div style={{marginTop:"35px"}}>
              <p>
                Not registered yet?{" "}
                <span
                  style={{ fontWeight: "900", color: "#012970" }}
                  onClick={() => {
                    router.push("/auth/register");
                  }}
                  className="hoveEff"
                >
                  Create an account
                </span>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xl={5} lg={5} md={7} sm={12} xs={12}>
          <img
            src="../assets/Images/colan-login.png"
            className="login-bg-img"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
