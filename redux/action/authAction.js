import { errorToast, successToast } from "@/components/helper";
import {
  oAuthSignInAction,
  registerAction,
  signInAction,
  forgotCodeAction,
  verifycodeAction,
  resetPassAction,
} from "../slice/authSlice";
import router from "next/router";
import { AuthAPIService } from "../api/APIService";

export function registerApi(params) {
  return async (dispatch) => {
    dispatch(registerAction({ isloading: true, totalElements: 0 }));
    AuthAPIService("POST", `/register`, params).then((e) => {
      const { status, message } = e.data;
      if (status === 200) {
        successToast(message);
        dispatch(
          registerAction({
            isloading: false,
            response: e,
          })
        );
        router.push("/auth/login");
      } else {
        errorToast(message);
        dispatch(registerAction({ isloading: false, totalElements: 0 }));
      }
    });
  };
}

export function loginApi(params) {
  return async (dispatch) => {
    dispatch(signInAction({ isloading: true, totalElements: 0 }));
    AuthAPIService("POST", `/login`, params).then((e) => {
      if (e?.status == "success") {
        const { status, message } = e.data;
        if (status === 200) {
          sessionStorage.setItem("accessToken", e?.data?.response?.accessToken);
          sessionStorage.setItem("UserId", e?.data?.response?.userId);
          successToast(message);
          dispatch(
            signInAction({
              isloading: false,
              response: e,
            })
          );
          router.push("/home/user");
        } else {
          errorToast(e.message);
          dispatch(signInAction({ isloading: false, totalElements: 0 }));
        }
      } else {
        
        errorToast(e?.message);
      }
    });
  };
}

// export function oAuthApi(params) {
//   return async (dispatch) => {
//     dispatch(oAuthSignInAction({ isloading: true, totalElements: 0 }));
//     AuthAPIService("POST", `/oauth/login`, params)
//       .then((e) => {
//         const { status, message } = e.data;
//         if (status === 200) {
//           successToast(message);
//           dispatch(
//             oAuthSignInAction({
//               isloading: false,
//               response: e,
//             })
//           );
//           router.push("/home/user");
//         } else {
//           errorToast(message);
//           dispatch(oAuthSignInAction({ isloading: false, totalElements: 0 }));
//         }
//       })
//       .catch((e) => {
//         errorToast(e.message);
//         dispatch(oAuthSignInAction({ isloading: false, totalElements: 0 }));
//       });
//   };
// }

export function forgotpasApi(uname) {
  return async (dispatch) => {
    dispatch(forgotCodeAction({ isloading: true, totalElements: 0 }));
    AuthAPIService(
      "POST",
      `/send/forgot/password/otp/tomail?username=${uname?.username}`
    )
      .then((e) => {
        const { status, message } = e.data;
        if (status === 200) {
          successToast(message);
          dispatch(
            forgotCodeAction({
              isloading: false,
              response: e,
            })
          );
        } else {
          errorToast(message);
          dispatch(forgotCodeAction({ isloading: false, totalElements: 0 }));
        }
      })
      .catch((e) => {
        errorToast(e.message);
        dispatch(forgotCodeAction({ isloading: false, totalElements: 0 }));
      });
  };
}

export function verifyOtpApi(code, uname) {
  return async (dispatch) => {
    dispatch(verifycodeAction({ isloading: true, totalElements: 0 }));
    AuthAPIService("POST", `/verify/otp?otp=${code}&username=${uname}`)
      .then((e) => {
        if (e?.data?.status === 200) {
          successToast(e?.data?.message);
          dispatch(
            verifycodeAction({
              isloading: false,
              response: e,
            })
          );
          router.push("/auth/forgetPassword/ResetPassword");
        } else {
          errorToast(e?.message);
          dispatch(verifycodeAction({ isloading: false, totalElements: 0 }));
        }
      })
      .catch((e) => {
        errorToast(e?.message);
        dispatch(verifycodeAction({ isloading: false, totalElements: 0 }));
      });
  };
}

export function resetPasswordApi(cpas, npas, uname) {
  return async (dispatch) => {
    dispatch(resetPassAction({ isloading: true, totalElements: 0 }));
    AuthAPIService(
      "POST",
      `/reset/password?confirmpassword=${cpas}&newpassword=${npas}&username=${uname}`
    )
      .then((e) => {
        const { status, message } = e.data;
        if (status === 200) {
          successToast(message);
          dispatch(
            resetPassAction({
              isloading: false,
              response: e,
            })
          );
          router.push("/auth/login");
        } else {
          errorToast(message);
          dispatch(resetPassAction({ isloading: false, totalElements: 0 }));
        }
      })
      .catch((e) => {
        errorToast(e?.response?.data?.message);
        dispatch(resetPassAction({ isloading: false, totalElements: 0 }));
      });
  };
}
