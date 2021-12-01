const PetFeed = (props) => {
  function getSatisfiedText(isSatisfied) {
    return isSatisfied ? "All stuffed!" : "Still peckish...";
  }

  return (
    <tr key={`${props.petFullName}+${props.foodFullName}`}>
      <td>{props.petFullName}</td>
      <td>{props.foodFullName}</td>
      <td>{props.feedQuantity}</td>
      <td>{getSatisfiedText(props.willSatisfyPet)}</td>
    </tr>
  );
};

export default PetFeed;
