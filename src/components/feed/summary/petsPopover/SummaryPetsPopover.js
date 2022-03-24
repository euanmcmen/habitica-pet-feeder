import React from "react";
import { ListGroup, Popover } from "react-bootstrap";
import { getFriendlyName } from "../../../../logic/petFoodFeedFunctions";

const SummaryPetsPopover = React.forwardRef(
  ({ petsToBeFed, ...props }, ref) => {
    return (
      <Popover ref={ref} body {...props}>
        <Popover.Header as="h3">Pet Names</Popover.Header>
        <Popover.Body style={{ maxHeight: "calc(50vh)", overflowY: "auto" }}>
          <ListGroup variant="flush">
            {petsToBeFed &&
              petsToBeFed.map((petFullName) => (
                <ListGroup.Item key={petFullName}>
                  <span>{getFriendlyName(petFullName)}</span>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Popover.Body>
      </Popover>
    );
  }
);

export default SummaryPetsPopover;
