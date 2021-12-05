const PetFeedSummary = (props) => {
  return (
    <>
      <p>TotalNumberOfPetsFed: {props.summary.totalNumberOfPetsFed}</p>
      <p>TotalNumberOfFoodsFed: {props.summary.totalNumberOfFoodsFed}</p>
      <p>
        TotalNumberOfSatisfiedPets: {props.summary.totalNumberOfSatisfiedPets}
      </p>
    </>
  );
};

export default PetFeedSummary;
