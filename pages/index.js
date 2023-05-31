import React from "react";
import router from "next/router";

function Home() {
  React.useEffect(() => {
    router.push("/home/User");
  }, []);
  return <></>;
}

export default Home;
