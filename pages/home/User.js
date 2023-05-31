import { Button, TextField } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { InstantMeetLink, MeetingRoom } from "@/components/modals/instantMeetLink";
import { userSelector } from "@/redux/slice/userSlice";
import { useEffect } from "react";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import DomainIcon from "@mui/icons-material/Domain";
import CameraIcon from "@mui/icons-material/Camera";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import LanguageIcon from "@mui/icons-material/Language";
import GridViewIcon from "@mui/icons-material/GridView";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useSession, signOut, signIn } from "next-auth/react";
import router from "next/router";
import LoaderState from "@/components/Loader";
import { verifyMeetLink, meetingRoomApi } from "@/redux/action/userAction";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const User = () => {
  const getMeetingRoom = useSelector((state) => state.user?.getMeetingRoomInfo);
  // const Loginresponse = useSelector((state) => state.auth?.signInInfo);
  // console.log("loginresponse", Loginresponse)
  // const Oauthresponse = useSelector((state) => state.auth?.oAuthsignInInfo);
  const MeetIdresponse = useSelector((state) => state.user?.verifyMeetLinkInfo);
  const { getScheduleMeet } = useSelector(userSelector);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openmeet, setOpenmeet] = useState(false);
  const [meetlink, setMeetlink] = useState("");

  const [uname, setUname] = useState(getMeetingRoom?.[0]?.meetinglink);
  const [LoginMail, setLoginMail] = useState("");
  const [show, setShow] = useState(false);
  const [JoinLink, setJoinLink] = useState("");
  const [Token, setToken] = useState("")
  const [SignOut, setSignOut] = useState(false)
  // console.log("accessToken", Token)
  // const { data: session } = useSession();

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const loginMail = sessionStorage.getItem("username");
    setLoginMail(loginMail);
  }, []);

  const instantmeet = () => {
    const req = {
      username: LoginMail,
    };
    // if (session) {
    //   setOpenmeet(true);
    //   dispatch(meetingRoomApi(req));
    // } else 

    if (
      Token !== null
      // Loginresponse?.status == "success"
      //  ||  Oauthresponse?.status == "success"
    ) {
      setOpenmeet(true);
      dispatch(meetingRoomApi(req));
    } else {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (getMeetingRoom?.meetinglink) {
      setMeetlink(getMeetingRoom.meetinglink);
    } else {
      setMeetlink("");
    }
  }, [getMeetingRoom]);

  // const signInHandler = () => {
  //   // signIn();
  //   router.push("/auth/login");
  // };

  const signOutHandler = () => {
    signOut();
    setSignOut(true)
    // router.push("/auth/login");
    localStorage.clear();
    sessionStorage.clear();
  };

  const schedulemeet = () => {
    // if (session) {
    //   router.push("/ScheduleMeet");
    // } else

    if (Token !== null
      //  || Oauthresponse.status == "success"
    ) {
      router.push("/schedulePages/scheduleMeet");
    } else {
      router.push("/auth/login");
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length > 0) setShow(true), setJoinLink(e.target.value);
    else setShow(false);
  };

  useEffect(() => {
    if (MeetIdresponse?.status == 200 && MeetIdresponse?.response != "") {
      router.push(MeetIdresponse?.response);
    }
  }, [MeetIdresponse?.status]);

  const joinMeet = async () => {
    let link = `https://meet.colan.in/meetingRoom/${JoinLink}`;
    if (link) {
      await dispatch(verifyMeetLink(link));
    }
  };

  useEffect(() => {
    var accessToken = sessionStorage.getItem("accessToken");
    setToken(accessToken);
  }, [SignOut]);

  const SignIn = () => {
    router.push("/auth/login");
  }


  return (
    <div>
      <header id="header" className="header ">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a className="logo d-flex align-items-center">
            <img src="../assets/img/colan-logo.png" alt="" />
          </a>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#team">
                  Team
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              {/* {session == null &&
                Loginresponse?.status !== "success" &&
                Oauthresponse !== "success" ? (
                <Button className="sign-btn" onClick={() => signInHandler()}>
                  Sign in
                </Button>
              ) : (
                <Button className="sign-btn" onClick={() => signOutHandler()}>
                  Sign Out
                </Button>
              )} */}
              {Token !== null ? <Button className="sign-btn" onClick={() => signOutHandler()}>
                Sign Out
              </Button> : <Button className="sign-btn" onClick={() => SignIn()}>
                Sign In
              </Button>
              }
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      <section id="hero" className="hero d-flex align-items-center sch-met-ht">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">Welcome to Colan Meet</h1>
              <h4 data-aos="fade-up" style={{ margin: "1rem 0rem ",fontSize:"20px",lineHeight:"30px" }}>
                Creating a video meeting,enables you to join virtual meetings
                via audio, video, chat, and screen sharing and more..
              </h4>
              <div data-aos="fade-up" data-aos-delay="600">
                <div style={{ display: "flex", gap: "10px",margin:"10px 0px" }}>
                  <div >
                    <Button
                      id="demo-customized-button"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      variant="contained"
                      size="medium"
                      disableElevation
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{ fontWeight: "bold", background: "#012970" }}
                      className="joinbutton"
                    >
                      <VideocamIcon />
                      Start Meeting
                    </Button>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={instantmeet} disableRipple>
                        <VideocamIcon />
                        Instant Meeting
                      </MenuItem>
                      <MenuItem onClick={schedulemeet} disableRipple>
                        <FileCopyIcon />
                        Schedule Meeting
                      </MenuItem>
                    </StyledMenu>
                  </div>
                  <div>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="Enter Room Id"
                      size="small"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </div>
                  {show && (
                    <div>
                      <Button
                        onClick={(e) => {
                          joinMeet();
                        }}
                        className="jbtn"
                        sx={{ backgroundColor: "#012970", color: "white" }}
                      >
                        Join Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              class="col-lg-6 hero-img"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img src="../assets/img/hero-img.png" class="img-fluid" alt="" />

            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <div class="row gx-0">
            <div
                class="col-lg-6 d-flex align-items-center"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img src="../assets/img/about.jpg" class="img-fluid" alt="" />
              </div>
              <div
                class="col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div class="content">
                  <h3>Who We Are</h3>
                  <h2>Create your video call meetings with everyone.</h2>
                  <p>
                    Colan Meet is one service for secure, high-quality video
                    meetings and calls available for everyone, on any device.
                  </p>
                  <div class="text-center text-lg-start">
                    <a
                      href="#"
                      class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Read More</span>
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        </section>

        <section id="values" class="values">
          <div class="container" data-aos="fade-up">
            <header class="section-header">
              <h2>Our Values</h2>
              <p>THE COLATINES WHO MAKE IT HAPPEN</p>
            </header>

            <div class="row">
              <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div class="box">
                  <img
                    src="../assets/img/values-1.png"
                    class="img-fluid"
                    alt=""
                  />
                  <h3>Innovation & Technology</h3>
                  <p>
                    Exploring new ways to bring innovation to our solutions. We
                    never failed to upskill our expertise in niche technologies.
                  </p>
                </div>
              </div>

              <div
                class="col-lg-4 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div class="box">
                  <img
                    src="../assets/img/values-2.png"
                    class="img-fluid"
                    alt=""
                  />
                  <h3>Reliable Support & Integrity</h3>
                  <p>
                    We are known for our fast & reliable project management. We
                    stand by our obligation to ensure that our solutions are
                    ethical and moral.
                  </p>
                </div>
              </div>

              <div
                class="col-lg-4 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div class="box">
                  <img
                    src="../assets/img/values-3.png"
                    class="img-fluid"
                    alt=""
                  />
                  <h3>Quality Assurance & Scalability</h3>
                  <p>
                    All our products and services are tested for 100% quality
                    before delivery. Our highly scalable team meets the needs of
                    our growing customer base.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="counts" class="counts">
          <div class="container" data-aos="fade-up">
            <div class="row gy-4">
              <div class="col-lg-3 col-md-6">
                <div class="count-box">
                  <i class="bi bi-emoji-smile"></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="232"
                      data-purecounter-duration="1"
                      class="purecounter"
                    ></span>
                    <MedicalInformationIcon
                      sx={{
                        color: "#012970",
                        fontSize: "3rem",
                      }}
                    />
                    <p>Health Care</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div class="count-box">
                  <i
                    class="bi bi-journal-richtext"
                    style={{ color: "#ee6c20" }}
                  ></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="521"
                      data-purecounter-duration="1"
                      class="purecounter"
                    ></span>
                    <DomainIcon
                      sx={{
                        color: "#012970",
                        fontSize: "3rem",
                      }}
                    />
                    <p>Real Estates</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div class="count-box">
                  <i class="bi bi-headset" style={{ color: "#15be56" }}></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="1463"
                      data-purecounter-duration="1"
                      class="purecounter"
                    ></span>
                    <CameraIcon
                      sx={{
                        color: "#012970",
                        fontSize: "3rem",
                      }}
                    />
                    <p>Ecommerce</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div class="count-box">
                  <i class="bi bi-people" style={{ color: "#bb0852" }}></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="15"
                      data-purecounter-duration="1"
                      class="purecounter"
                    ></span>
                    <AttachMoneyIcon
                      sx={{
                        color: "#012970",
                        fontSize: "3rem",
                        paddingLeft: "10px",
                      }}
                    />
                    <p>Finance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" class="services">
          <div class="container" data-aos="fade-up">
            <header class="section-header">
              <h2>Services</h2>
              <p>SOFTWARE DEVELOPMENT SERVICES</p>
            </header>

            <div class="row gy-4">
              <div
                class="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div class="service-box blue">
                  <i class="ri-discuss-line icon">
                    <PhoneIphoneIcon />
                  </i>

                  <h3>Mobile App Development</h3>
                  <p>
                    Managed Mobile App Development devoted to discovering &
                    building your desired objectives
                  </p>
                  <a href="#" class="read-more">
                    <span>Read More</span> <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div
                class="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div class="service-box orange">
                  <i class="ri-discuss-line icon">
                    <WebAssetIcon />
                  </i>

                  <h3>Web App Development</h3>
                  <p>
                    Get awe-inspiring business-ready web applications & features
                    into production on-time.
                  </p>
                  <a href="#" class="read-more">
                    <span>Read More</span> <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div
                class="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div class="service-box green">
                  <i class="ri-discuss-line icon">
                    <LanguageIcon />
                  </i>

                  <h3>Digital Marketing</h3>
                  <p>
                    Cutting-edge blockchain solutions to amply your business
                    with quality and excellence
                  </p>
                  <a href="#" class="read-more">
                    <span>Read More</span> <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div
                class="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div class="service-box red">
                  <i class="ri-discuss-line icon">
                    <PsychologyIcon />
                  </i>

                  <h3>Data Science</h3>
                  <p>
                    Non et temporibus minus omnis sed dolor esse consequatur.
                    Cupiditate sed error ea fuga sit provident adipisci neque.
                  </p>
                  <a href="#" class="read-more">
                    <span>Read More</span> <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div
                class="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div class="service-box purple">
                  <i class="ri-discuss-line icon">
                    <GridViewIcon />
                  </i>
                  <h3>BlockChain</h3>
                  <p>
                    Dedicated to providing ROI-focused online marketing solution
                    to increase your sales.
                  </p>
                  <a href="#" class="read-more">
                    <span>Read More</span> <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div
                class="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div class="service-box pink">
                  <i class="ri-discuss-line icon">
                    <AccountTreeIcon />
                  </i>

                  <h3>Start a Project</h3>
                  <p>
                    Helping organizations achieve business excellence through
                    potentially robust & technologies.
                  </p>
                  <a href="#" class="read-more">
                    <span>Read More</span> <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" class="team">
          <div class="container" data-aos="fade-up">
            <header class="section-header">
              <h2>Team</h2>
              <p>Our hard working team</p>
            </header>

            <div class="row gy-4">
              <div
                class="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div class="member">
                  <div class="member-img">
                    <img
                      src="../assets/img/team/team-1.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    <div class="social">
                      <a href="">
                        <i class="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>Walter White</h4>
                    <span>Chief Executive Officer</span>
                    <p>
                      Velit aut quia fugit et et. Dolorum ea voluptate vel
                      tempore tenetur ipsa quae aut. Ipsum exercitationem iure
                      minima enim corporis et voluptate.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div class="member">
                  <div class="member-img">
                    <img
                      src="../assets/img/team/team-2.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    <div class="social">
                      <a href="">
                        <i class="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>Sarah Jhonson</h4>
                    <span>Product Manager</span>
                    <p>
                      Quo esse repellendus quia id. Est eum et accusantium
                      pariatur fugit nihil minima suscipit corporis. Voluptate
                      sed quas reiciendis animi neque sapiente.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div class="member">
                  <div class="member-img">
                    <img
                      src="../assets/img/team/team-3.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    <div class="social">
                      <a href="">
                        <i class="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>William Anderson</h4>
                    <span>CTO</span>
                    <p>
                      Vero omnis enim consequatur. Voluptas consectetur unde qui
                      molestiae deserunt. Voluptates enim aut architecto porro
                      aspernatur molestiae modi.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div class="member">
                  <div class="member-img">
                    <img
                      src="../assets/img/team/team-4.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    <div class="social">
                      <a href="">
                        <i class="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>Amanda Jepson</h4>
                    <span>Accountant</span>
                    <p>
                      Rerum voluptate non adipisci animi distinctio et deserunt
                      amet voluptas. Quia aut aliquid doloremque ut possimus
                      ipsum officia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="clients" class="clients">
          <div class="container" data-aos="fade-up">
            <header class="section-header">
              <h2> Clients</h2>
              <p>Our Clients</p>
            </header>

            <div class="clients-slider swiper">
              <div
                class="swiper-wrapper align-items-center"
                style={{ display: "flex" }}
              >
                <div class="swiper-slide">
                  <img
                    src="../assets/img/clients/client-1.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="../assets/img/clients/client-2.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="../assets/img/clients/client-3.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="../assets/img/clients/client-4.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="../assets/img/clients/client-5.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="../assets/img/clients/client-6.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="../assets/img/clients/client-7.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="../assets/img/clients/client-8.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </section>

        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up">
            <header class="section-header">
              <h2>Contact</h2>
              <p>Contact Us</p>
            </header>
            <div class="row gy-4">
              <div class="col-lg-6">
                <div class="row gy-4">
                  <div class="col-md-6">
                    <div class="info-box">
                      <i class="bi bi-geo-alt"></i>
                      <h3>Address</h3>
                      <p>
                        Unit-2, D 84, B Block, 4th Floor, Greams Rd, Thousand
                        Lights West, Thousand Lights, Chennai, Tamil Nadu 600006
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="info-box">
                      <i class="bi bi-telephone"></i>
                      <h3>Call Us</h3>
                      <p>
                        {" "}
                        044 4284 4666 <br />
                        +91 78276 67667
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="info-box">
                      <i class="bi bi-envelope"></i>
                      <h3>Email Us</h3>
                      <p>info@colaninfotech.com</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="info-box">
                      <i class="bi bi-clock"></i>
                      <h3>Open Hours</h3>
                      <p>Monday - Friday 24hrs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6">
                <form
                  action="forms/contact.php"
                  method="post"
                  class="php-email-form"
                >
                  <div class="row gy-4">
                    <div class="col-md-6">
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div class="col-md-6 ">
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>

                    <div class="col-md-12">
                      <input
                        type="text"
                        class="form-control"
                        name="subject"
                        placeholder="Subject"
                        required
                      />
                    </div>

                    <div class="col-md-12">
                      <textarea
                        class="form-control"
                        name="message"
                        rows="6"
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>

                    <div class="col-md-12 text-center">
                      <div class="loading">Loading</div>
                      <div class="error-message"></div>
                      <div class="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                      <button type="submit">Send Message</button>
                    </div>  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <InstantMeetLink
        openmeet={openmeet}
        setOpenmeet={setOpenmeet}
        roomname={meetlink}
      />
      {/* {getMeetingRoom || Loginresponse ? <LoaderState /> : ""} */}
    </div>
  );
};

export default User;
