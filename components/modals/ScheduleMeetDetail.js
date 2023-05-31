import { verifyMeetLink } from "@/redux/action/userAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { errorToast, successToast } from "../helper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box } from "@mui/system";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ScheduleMeetingDetail = ({
  openDetails,
  setOpenDetails,
  scheduleDetail,
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenDetails(false);
  };

  const handleClick = async () => {
    const currentDate = new Date();
    {
      currentDate <= scheduleDetail?.start
        ? errorToast("Meeting is not started")
        : successToast("Meeting is ongoing !");
      let link = `https://meet.colan.in/meetingRoom/${scheduleDetail?.roomid}`;
      if (link) {
        await dispatch(verifyMeetLink(link));
      }
    }
  };

  const handleCopyLink = () => {
    // navigator.clipboard.writeText(`https://meet.colan.in/meetingRoom/${roomname}`);
    navigator.clipboard.writeText(
      `https://meet.colan.in/meetingRoom/${scheduleDetail?.roomid}`
    );
    successToast("you have copied the link");
  };
  const handleCopyId = () => {
    navigator.clipboard.writeText(scheduleDetail?.roomid);
    successToast("you have copied the Room ID");
  };

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <Dialog open={openDetails}>
        <Box className="popUp">
          <Box>
            <HighlightOffIcon
              className="close-icon"
              sx={{ float: "right", cursor: "pointer" }}
              onClick={handleClose}
            />
          </Box>
          <DialogTitle
            sx={{
              fontWeight: "700",
              fontSize: "24px",
              color: "#012970",
            }}
          >
            {"Schedule Metting Details "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <table>
                <tr>
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "black",
                    }}
                  >
                    {" "}
                    Title{" "}
                  </td>
                  <td className="popup-align">{scheduleDetail?.title}</td>
                </tr>
                <br />
                <tr>
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "black",
                    }}
                  >
                    {" "}
                    Duration{" "}
                  </td>
                  <td className="popup-align">
                    {scheduleDetail?.start?.toLocaleString("en-US", options)}{" "}
                    <b>-</b>{" "}
                    {scheduleDetail?.end?.toLocaleString("en-US", options)}{" "}
                  </td>
                </tr>
                <br />

                <tr>
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "black",
                    }}
                  >
                    {" "}
                    Link{" "}
                  </td>
                  <td className="popup-align">{`https://meet.colan.in/meetingRoom/${scheduleDetail?.roomid}`}</td>
                  <td className="popup-align">
                    <ContentCopyIcon
                      onClick={handleCopyLink}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "black",
                    }}
                  >
                    Room ID
                  </td>
                  <td className="popup-align">{scheduleDetail?.roomid} </td>
                  <td className="popup-align">
                    <ContentCopyIcon
                      onClick={handleCopyId}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              </table>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleClick}
            >
              Join
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default ScheduleMeetingDetail;
