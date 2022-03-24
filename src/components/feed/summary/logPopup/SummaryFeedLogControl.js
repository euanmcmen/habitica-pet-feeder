import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import FeedLog from "../../feedLog/FeedLog";

const FeedLogOffCanvasControl = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="info"
        onClick={handleShow}
        size="sm"
        className="float-end"
      >
        Show Feed Log
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Feed Log</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FeedLog includeNotFed={true} includeFed={true} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FeedLogOffCanvasControl;
