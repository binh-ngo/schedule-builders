import Typewriter from "typewriter-effect";

function LoadType() {
  return (
    <Typewriter
      options={{
        strings: [
          "Loading..."
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 100,
      }}
    />
  );
}

export default LoadType;