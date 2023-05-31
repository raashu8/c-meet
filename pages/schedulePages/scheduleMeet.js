import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import MeetLink from "@/components/modals/scheduleMeetLink";
import { router } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@/redux/slice/userSlice";
import moment from "moment";
import { UilAngleLeft } from "@iconscout/react-unicons";
import {
  getScheduleApi,
  getuseridApi,
  scheduleMeetingApi,
} from "@/redux/action/userAction";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ScheduleMeetingDetail from "../../components/modals/ScheduleMeetDetail";
import { Router } from "next/router";
import ScheduleMeetLink from "@/components/modals/scheduleMeetLink";

function ScheduleMeet() {
  const { scheduleMeetInfo, getAllUserInfo, sheduleCalendarInfo } =
    useSelector(userSelector);
  const [personName, setPersonName] = React.useState([]);
  const [userids, setUserids] = useState("");
  const [usernames, setUsernames] = useState("");
  const [StartDateTime, setStartDateTime] = useState("");
  const [EndDateTime, setEndDateTime] = useState("");
  const [meetlinkk, setMeetlink] = useState("");
  const [meetopen, setMeetopen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [UserItem, SetUserItem] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [scheduleDetail, setScheduleDetails] = useState("");

  const localizer = momentLocalizer(moment);
  const userid =
    typeof window !== "undefined" ? sessionStorage.getItem("UserId") : "";
  useEffect(() => {
    dispatch(getuseridApi());
  }, []);

  useEffect(() => {
    if (getAllUserInfo?.userId && getAllUserInfo?.username) {
      setUserids(getAllUserInfo?.userId);
      setUsernames(getAllUserInfo?.username);
    } else {
      setUserids("");
      setUsernames("");
    }
  }, [getAllUserInfo]);

  useEffect(() => {
    var item = sessionStorage.getItem("username");
    SetUserItem(item);
  }, []);

  const getValidate = () => {
    if (text.length <= 0) {
      setErrorMessage("please fill out this field");
    } else {
      setErrorMessage(null);
    }
  };
  const guestValidate = () => {
    if (personName.length >= 0) {
      setError("please fill out this field");
    } else {
      setError(null);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (scheduleMeetInfo?.meetlink) {
      setMeetlink(scheduleMeetInfo?.meetlink);
    } else {
      setMeetlink("");
    }
  }, [scheduleMeetInfo]);

  const getInputVal = (e) => {
    setText(e.target.value);
    getValidate();
  };

  const getFormatedDate = (date) => {
    let data = new Date(date);
    return moment(data).format("YYYY-MM-DDTHH:mm:ss[Z]");
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    guestValidate();
  };

  useEffect(() => {
    dispatch(getScheduleApi(userid));
  }, [scheduleMeetInfo]);

  const currentDate = new Date();

  const events = sheduleCalendarInfo?.response
    ?.map((e) => ({
      title: e.title,
      start: moment(e.timeFrom).subtract(5.5, "hours").toDate(),
      end: moment(e.timeEnd).subtract(5.5, "hours").toDate(),
      roomid: e.roomid,
    }))
    .filter((event) => event.end >= currentDate);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: text,
      startdate: StartDateTime,
      starttime: StartDateTime,
      enddate: EndDateTime,
      endtime: EndDateTime,
      username: UserItem,
      addguests: personName,
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title  is required *"),
      startdate: Yup.string().required("Start Date & Time is required *"),
      enddate: Yup.string().required("End Date & Time is required *"),
      addguests: Yup.array().min(1, "Please select at least one guest *"),
    }),

    onSubmit: (val) => {
      const req = {
        enddate: EndDateTime,
        endtime: EndDateTime,
        startdate: StartDateTime,
        starttime: StartDateTime,
        title: text,
        username: UserItem,
        addguests: personName,
      };
      formik.resetForm();
      dispatch(scheduleMeetingApi(val, req, userid));
      setMeetopen(true);
    },
  });

  const backHandler = () => {
    router.push("/home/user");
  };

  return (
    <>
      <div>
        <section id="hero" className="hero d-flex align-items-center sch-met">
          <div className="container">
            <IconButton
              className="bck-ico"
              onClick={() => {
                router.push("/home/user");
              }}
              sx={{ backgroundColor: "#013289" }}
            >
              <UilAngleLeft />
            </IconButton>
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up" style={{ fontFamily: "math" }}>
                  Schedule Meeting
                </h1>
                <div className="row">
                  <div className="col-lg-12">
                    <div>
                      <TextField
                        sx={{ width: "80%", mt: 5 }}
                        label="Meeting Title"
                        variant="outlined"
                        name="title"
                        type="text"
                        // id="outlined-error"
                        onBlur={formik.handleBlur}
                        value={text}
                        // error={Boolean(formik.touched.title && formik.errors.title)}
                        // helperText={formik.touched.title && formik.errors.title}
                        onChange={(e) => {
                          getInputVal(e);
                        }}
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <div className="err-nt">{formik.errors.title}</div>
                      ) : null}
                    </div>
                    <div style={{ paddingTop: "30px" }}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ display: "flex" }}
                      >
                        <DateTimePicker
                          label="Start Date & Time"
                          onChange={(newValue) => {
                            let FormatedDate = getFormatedDate(newValue?.$d);
                            setStartDateTime(FormatedDate);
                            formik.setFieldValue("startDate", FormatedDate);
                          }}
                          sx={{ width: "80%" }}
                        />
                        {formik.touched.startdate && formik.errors.startdate ? (
                          <div className="err-nt">
                            {formik.errors.startdate}
                          </div>
                        ) : null}

                        <DateTimePicker
                          label="End Date & Time"
                          onChange={(newValue) => {
                            let FormatedDate = getFormatedDate(newValue?.$d);
                            setEndDateTime(FormatedDate);
                            formik.setFieldValue("enddate", FormatedDate);
                          }}
                          sx={{ marginTop: "30px", width: "80%" }}
                        />
                        {formik.touched.enddate && formik.errors.enddate ? (
                          <div className="err-nt">{formik.errors.enddate}</div>
                        ) : null}
                      </LocalizationProvider>
                    </div>
                    <div style={{ paddingTop: "30px" }}>
                      <div>
                        <FormControl sx={{ width: "80%" }}>
                          <InputLabel id="demo-multiple-checkbox-label">
                            Add Guest
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            {...formik.getFieldProps("addguests")} // Pass Formik's field props
                            input={<OutlinedInput label="Add Guest" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                          >
                            {getAllUserInfo?.map((name) => (
                              <MenuItem
                                key={name.username}
                                value={name.username}
                              >
                                <Checkbox
                                  checked={formik.values.addguests.includes(
                                    name.username
                                  )}
                                />
                                <ListItemText primary={name.username} />
                              </MenuItem>
                            ))}
                          </Select>
                          {formik.touched.addguests &&
                          formik.errors.addguests ? (
                            <div className="err-nt">
                              {formik.errors.addguests}
                            </div>
                          ) : null}
                        </FormControl>
                      </div>
                      <div style={{ paddingTop: "25px" }}>
                        <Button
                          size="large"
                          onClick={formik.handleSubmit}
                          sx={{
                            backgroundColor: "#012970",
                            mt: 1.3,
                            borderRadius: "8px",
                            pt: 1.5,
                            pb: 1.5,
                          }}
                          className="joinbutton"
                          variant="contained"
                        >
                          Schedule Meeting
                        </Button>
                      </div>
                    </div>
                    <Toolbar />
                    <hr />
                  </div>
                </div>
              </div>
              <div
                class="col-lg-6 hero-img"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img src="../assets/img/3914790.jpg" class="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section id="hero" className="hero d-flex align-items-center sch-met">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  style={{ height: 600, marginBottom: "10rem", width: "100%" }}
                >
                  <h1
                    data-aos="fade-up"
                    style={{ fontFamily: "math" }}
                    className="sched-title"
                  >
                    Upcoming Meetings
                  </h1>
                  <Calendar
                    style={{ paddingTop: "30px " }}
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={(e) => {
                      // console.log(e, "even")
                      setScheduleDetails(e);
                      // alert(e.title + e.start + e.end)
                      setOpenDetails(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ScheduleMeetLink
        meetopen={meetopen}
        setMeetopen={setMeetopen}
        meetlinkk={scheduleMeetInfo}
      />
      <ScheduleMeetingDetail
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        scheduleDetail={scheduleDetail}
      />
    </>
  );
}

export default ScheduleMeet;
