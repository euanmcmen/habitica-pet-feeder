/**
 * @description
 * Returns a collection of Grouped PetFoodFeeds, grouped by the Pet's full name.
 *
 * @param petFoodFeeds A list of PetFoodFeeds as returned by the API.
 *
 * @returns Collection of Grouped PetFoodFeeds by their full name.
 */
export const groupPetFoodFeedsByPetName = (petFoodFeeds) =>
  Object.entries(groupByPetFullName(petFoodFeeds)).map(toGroupedPetsObject);

/**
 * @description
 * Projects a list of PetFoodFeeds to a flat list of friendly pet names.
 * A friendly pet name is the type and the name separated by a space.
 *
 * @param petFoodFeeds A list of PetFoodFeeds as returned by the API.
 *
 * @returns String list of friendly pet names.
 */
export const mapPetFoodFeedsToPetFullName = (petFoodFeeds) =>
  petFoodFeeds.map(toFriendlyNames);

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
const groupByPetFullName = (arr) =>
  arr.reduce((acc, obj) => {
    const key = obj["petFullName"];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

const toGroupedPetsObject = (nameCollectionPair) => ({
  petFullName: nameCollectionPair[0],
  willSatisfyPet: nameCollectionPair[1].some(
    (petFoodFeed) => petFoodFeed.willSatisfyPet === true
  ),
  petFoodFeeds: nameCollectionPair[1],
});

const toFriendlyNames = (petFoodFeed) => {
  const petFullNameSplits = petFoodFeed["petFullName"].split("-");
  return `${petFullNameSplits[1]} ${petFullNameSplits[0]}`;
};
