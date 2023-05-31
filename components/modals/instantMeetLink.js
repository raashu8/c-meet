import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import { Box } from "@mui/system";
import { successToast } from "../helper";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch, useSelector } from "react-redux";
import { verifyMeetLink } from "@/redux/action/userAction";
import { useEffect } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export function InstantMeetLink({ openmeet, setOpenmeet, roomname }) {
  const MeetIdresponse = useSelector((state) => state.user?.verifyMeetLinkInfo);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://meet.colan.in/meetingRoom/${roomname}`);
    // navigator.clipboard.writeText(`https://meet.jit.si/meetingRoom/${roomname}`);
    successToast("you have copied the link");
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(roomname);
    successToast("you have copied the Room ID");
  };

  const handleClose = () => {
    setOpenmeet(false);
  };

  useEffect(() => {
    if (MeetIdresponse?.status == 200 && MeetIdresponse?.response != "") {
      router.push(MeetIdresponse?.response)
    }
  }, [MeetIdresponse?.status])


  const Join = async () => {
     let link = `https://meet.colan.in/meetingRoom/${roomname}`
    // let link = `https://meet.jit.si/meetingRoom/${roomname}`
    if (link) {
      await dispatch(verifyMeetLink(link))
    }
  };

  // function baseUrl() {
  //   return JITSI_BASE_URL;
  // }


  return (
    <div>
      <Dialog
        open={openmeet}
      >
        <Box
          className="popUp"
        >
          <Box>
            <HighlightOffIcon className="close-icon" sx={{ float: "right", cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <DialogTitle
            sx={{
              fontWeight: "700",
              fontSize: "24px",
              color: "#012970",
            }}
          >
            {"Colan Instant Meet"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <table>
                <tr>
                  <td style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "black",
                  }}> Link </td>
                  <td className="popup-align">{`https://meet.colan.in/meetingRoom/${roomname}`}</td>
                  <td className="popup-align"><ContentCopyIcon onClick={handleCopyLink} style={{ cursor: "pointer" }} /></td>
                </tr>
                <br />
                <tr>
                  <td style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "black",
                  }}>Room ID</td>
                  <td className="popup-align">asdadsasd</td>
                  <td className="popup-align">
                    <ContentCopyIcon onClick={handleCopyId} style={{ cursor: "pointer" }} />
                  </td>
                </tr>
              </table>

            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={Join}
              color="success"
              variant="contained"
            >
              Join Now
            </Button>

          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
