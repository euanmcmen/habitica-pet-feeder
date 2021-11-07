import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";

function App() {
  const getText = async () => {
    var requestOptions = {
      method: "POST",
    };

    var requestUrl = "https://localhost:44354/api/PetFeeds";

    var response = await fetch(requestUrl, requestOptions);

    var data = await response.json();

    console.log(data);

    const stringyData = JSON.stringify(data);

    setText(stringyData);
  };

  const [text, setText] = useState("");

  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center">Welcome to my Habitica Pet Feeder App</h1>
        </Row>
        <Row>
          <button onClick={() => getText()}>Get Pet Feeds</button>
        </Row>
        <Row>
          <span>{text}</span>
        </Row>
      </Container>
    </>
  );
}

export default App;
