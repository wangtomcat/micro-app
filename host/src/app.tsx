import React from "react";
import System from "@/utils/system";

function App() {
  const [system, setSystem] = React.useState<any>(undefined);

  function setApp1() {
    setSystem({
      url: "http://localhost:3002/remoteEntry.js",
      scope: "RemoteHome",
      module: "Home",
    });
  }

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation{" "}
        <strong>remotes</strong> and <strong>exposes</strong>. It will no load
        components that have been loaded already.
      </p>
      <button onClick={setApp1}>Load App 2 Widget</button>
      <div style={{ marginTop: "2em" }}>
        <System system={system} />
      </div>
    </div>
  );
}

export default App