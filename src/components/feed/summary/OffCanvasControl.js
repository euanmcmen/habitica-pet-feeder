import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";

const OffCanvasControl = (props) => {
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
        {props.title}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={props.placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{props.children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvasControl;
