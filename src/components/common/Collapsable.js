import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

export const Collapsable = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? "Show" : "Hide"}
      </Button>
      <span>{props.title}</span>
      <Collapse in={isCollapsed}>
        <>{props.children}</>
      </Collapse>
    </>
  );
};
