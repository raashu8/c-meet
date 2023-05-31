import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { userSelector } from "@/redux/slice/userSlice";

const JitsiMeeting = dynamic(
  () => import("@jitsi/react-sdk").then(({ JitsiMeeting }) => JitsiMeeting),
  {
    ssr: false,
  }
);

const GitsiMeet = () => {
  const { getMeetingRoom } = useSelector(userSelector);
  const [MeetLink, setMeetlink] = useState("");
  const [jitsi, setJitsi] = useState("");

  const router = useRouter();

  const MeetingRoomLink =
    router?.query?.gitsimeet !== undefined
      ? router?.query?.gitsimeet
      : MeetLink;

  useEffect(() => {
    if (getMeetingRoom?.meetinglink !== undefined) {
      setMeetlink(getMeetingRoom.meetinglink);
    }
  }, [getMeetingRoom]);

  const handleJitsiMeet = (JitsiMeetAPI) => {
    setJitsi(JitsiMeetAPI);
  };

  return (

    <div>
      <JitsiMeeting
        domain="meet-jitsi.colan.in"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          buttonPlacement: 'toolbar',
          enableFileTransfer: true,
          prejoinPageEnabled: true,
          enableWelcomePage: true,
          enableCLosePage: true,
          disableDeepLinking: true,
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          brandingRoomAlias: null,
          buttonsWithNotifyClick: [
            {
              key: "hangup",
              preventExecution: false,
              externalConnectUrl: 'https//meet.colan.in',
            },
          ],
        }}
        interfaceConfigOverwrite={{
          APP_NAME: 'Colan Meet',
          DEFAULT_BACKGROUND: '#FFC0CB',
          DEFAULT_LOGO_URL: '/images/watermark.svg',
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_JITSI_WATERMARK: false,
          enableCLosePage: false,
          enableClosePage: true,
          SHOW_BRAND_WATERMARK: true,
          SHOW_POWERED_BY: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          TOOLBAR_BUTTONS: [
            'microphone',
            'camera',
            'closedcaptions',
            'desktop',
            'fullscreen',
            'fodeviceselection',
            // `${hand()}`,
            'hangup',
            {
              key: 'invite',
              preventExecution: false
            },
            // {data},
            'profile',
            'chat',
            'filetransfer',
            'recording',
            'livestreaming',
            'etherpad',
            'sharedvideo',
            'settings',
            'raisehand',
            'videoquality',
            'filmstrip',
            'invite',
            'feedback',
            'stats',
            'shortcuts',
            'tileview',
            'videobackgroundblur',
            'download',
            'help',
            'mute-everyone',
            'security'
          ],
        }}


        userInfo={{
          displayName: 'USERNAME',
        }}
        roomName={MeetingRoomLink}
        onApiReady={handleJitsiMeet}
        getIFrameRef={(node) => (node.style.height = '99vh')}
      />
    </div>

  );
};

export default GitsiMeet;
