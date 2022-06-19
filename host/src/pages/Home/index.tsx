import React from "react";
import LoadComponent from "@/components/LoadComponents";

const component = {
  url: "http://localhost:3002/remoteEntry.js",
  scope: "RemoteHome",
  module: "Home",
}

const Index = () => {
  return <div>
    <LoadComponent {...component} />
  </div>
}

export default Index