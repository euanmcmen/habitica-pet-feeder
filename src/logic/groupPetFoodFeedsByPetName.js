//GROUPED PET FOOD FEED STRUCTURE
// {
//     petFullName: <string>,
//     willSatisfyPet: <bool>,
//     petFoodFeeds: [
//         {
//             petFullName: <string>,
//             foodFullName: <string>,
//             feedQuantity: <number>,
//             willSatisfyPet: <bool>,
//         },
//     ],
// };

/**
 * @description
 * Returns a collection of Grouped PetFoodFeeds, grouped by the Pet's full name.
 *
 * @param petFeeds A list of PetFoodFeeds as returned by the API.
 *
 * @returns Collection of Grouped PetFoodFeeds by their full name.
 */
const groupPetFoodFeedsByPetName = (petFoodFeeds) =>
  Object.entries(groupByPetFullName(petFoodFeeds)).map(toGroupedPetsObject);

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

module.exports = groupPetFoodFeedsByPetName;
