import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Deck Builders,",
          "Plumbers,",
          "Handymen,",
          "Roofers,",
          "Landscapers,",
          "Electricians,",
          "Contractors,",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;