import React from "react";
import { Row, Col } from "react-bootstrap";
import PetFoodFeedList from "../PetFoodFeeds/PetFoodFeedList/PetFoodFeedList";
import PetFoodFeedSummary from "../PetFoodFeeds/PetFoodFeedSummary";

const MainDisplay = (props) => {

    const renderComponentIfFetchComplete = (componentToRender) => {
        if (props.fetchState == 1)
            return <p>Fetching...</p>;

        if (props.fetchState == -1)
            return <p>An error occurred.</p>

        return componentToRender
    }

    return (
        <>
            <Row className="text-center">
                <Col>{
                    renderComponentIfFetchComplete(<PetFoodFeedSummary petFoodFeeds={props.petFoodFeeds} />)
                }</Col>
            </Row>
            <br />
            <Row className="text-center">
                <Col>{
                    renderComponentIfFetchComplete(<PetFoodFeedList petFoodFeeds={props.petFoodFeeds} />)
                }</Col>
            </Row>
        </>
    );
}

export default MainDisplay