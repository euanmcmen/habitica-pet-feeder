import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import { clearApiConnection } from "../../slices/apiConnectionSlice";

import { clearPetFoodFeeds } from "../../slices/petFoodFeedSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogoutButtonClick = (event) => {
    event.preventDefault();
    dispatch(clearApiConnection());
    dispatch(clearPetFoodFeeds());
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        style={{ textAlign: "left" }}
        onClick={handleLogoutButtonClick}
      >
        Log out
      </Button>
    </>
  );
};

export default LogoutButton;
