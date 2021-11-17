import PetFeed from "./PetFeed";

const PetFeedList = (props) => {
  return (
    <table className="table">
      <thead>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </thead>
      <tbody>{props.petFeeds.map((petFeed) => PetFeed(petFeed))}</tbody>
    </table>
  );
};

export default PetFeedList;
