import { Button, OverlayTrigger } from "react-bootstrap";
import SummaryPetsPopover from "./SummaryPetsPopover";

const SummaryPetsControl = (props) => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      rootClose
      overlay={<SummaryPetsPopover petsToBeFed={props.petsToBeFed} />}
    >
      <Button variant="info" size="sm" className="float-end">
        Show Pets
      </Button>
    </OverlayTrigger>
  );
};

export default SummaryPetsControl;
