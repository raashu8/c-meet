import { Button, Grid, TextField, IconButton, OutlinedInput, InputAdornment, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { router } from "next/router";
import { UilAngleLeft } from "@iconscout/react-unicons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordApi } from "@/redux/action/authAction";
import { authSelector } from "@/redux/slice/authSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ResetPassword() {
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [TextEntry, setTextEntry] = useState(true);
  const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/

  const { resetPasInfo } = useSelector(authSelector);
  const formik = useFormik({
    initialValues: {
      username: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().email().required("Email is required"),
      newpassword: yup.string()
        .required("New Password is required")
        .matches(passRegExp, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .matches(passRegExp, "Enter strong password")
        .matches(passRegExp, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
      confirmpassword: yup
        .string()
        .email()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password"), null], "Password not match"),

    }),
    
    onSubmit: (reqbody) => {
      const pas = {
        username: reqbody?.username,
        newpassword: reqbody?.newpassword,
        confirmpassword: reqbody?.confirmpassword,
      };
      dispatch(
        resetPasswordApi(pas?.confirmpassword, pas?.newpassword, pas?.username)
      );
    },
  });
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleEntry = () => {
    setTextEntry(!TextEntry);
  };

  return (
    <div style={{ margin: "0px", padding: "0px" }}>
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
                  Reset Password
                </h1>
                <p>Your new password must be different to previously used passwords</p>

                {/* <img
                  style={{ width: "50%" }}
                  src="../assets/img/forget1.png"
                  className="img-fluid"
                  alt=""
                /> */}
              </div>

              <label className="label-text-2">Email </label>
              <TextField
                id="outlined-basic"
                name="username"
                className="input-col"
                fullWidth
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
                helperText={formik.touched.username ? formik.errors.username : null}
                placeholder={"Enter the your email address"}
                type="email"
                sx={{ color: "white", borderColor: "white", marginBottom: "1rem" }}
                error={formik.touched.username ? formik.errors.username : null}
              />
              <label className="label-text-2">Password </label>
              <OutlinedInput
                className="form-ht"
                id="password"
                fullWidth
                height="0.4375em"
                name="newpassword"
                placeholder="Password"
                type={secureTextEntry ? "password" : "text"}
                value={formik.values.newpassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newpassword ? formik.errors.newpassword : null
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
                {formik.touched.newpassword ? formik.errors.newpassword : null}
              </FormHelperText>
              <br />
              <label className="label-text-2">Confirm Password </label>
              <OutlinedInput
                className="form-ht"
                sx={{ marginBottom: "2px" }}
                id="password"
                height="0.4375em"
                fullWidth
                name="confirmpassword"
                placeholder="Confirm Password"
                type={TextEntry ? "password" : "text"}
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmpassword
                    ? formik.errors.confirmpassword
                    : null
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleEntry}
                      edge="end"
                    >
                      {TextEntry ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>
                {formik.touched.confirmpassword
                  ? formik.errors.confirmpassword
                  : null}
              </FormHelperText>

              <div
                style={{
                  textAlign: "center",
                  paddingTop: "25px",
                }}
                className="logbutton"
              >
                <Button
                  onClick={formik.handleSubmit}
                  className="sign-in-bttn1"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#012970",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
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

export default ResetPassword;
