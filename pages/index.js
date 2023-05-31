import React from "react";
import router from "next/router";

function Home() {
  React.useEffect(() => {
    router.push("/home/user");
  }, []);
  return <></>;
}

export default Home;
