import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import PetFoodFeedList from "../PetFoodFeeds/PetFoodFeedList/PetFoodFeedList";
import PetFoodFeedSummary from "../PetFoodFeeds/PetFoodFeedSummary";

const MainDisplay = (props) => {

    const renderComponentIfFetchComplete = (componentToRender) => {
        if (props.fetchState === 1)
            return <p>Fetching...</p>;

        if (props.fetchState === -1)
            return <p>An error occurred.</p>

        return componentToRender
    }

    return (

        <>
            {renderComponentIfFetchComplete(
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Pet Food Feed Summary</Accordion.Header>
                        <Accordion.Body>
                            <PetFoodFeedSummary petFoodFeeds={props.petFoodFeeds} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Pet Food Feeds</Accordion.Header>
                        <Accordion.Body>
                            <PetFoodFeedList petFoodFeeds={props.petFoodFeeds} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
        </>


        // <>
        //     <Row className="text-center">
        //         <Col>{
        //             renderComponentIfFetchComplete(<PetFoodFeedSummary petFoodFeeds={props.petFoodFeeds} />)
        //         }</Col>
        //     </Row>
        //     <br />
        //     <Row className="text-center">
        //         <Col>{
        //             renderComponentIfFetchComplete(<PetFoodFeedList petFoodFeeds={props.petFoodFeeds} />)
        //         }</Col>
        //     </Row>
        // </>
    );
}

export default MainDisplay