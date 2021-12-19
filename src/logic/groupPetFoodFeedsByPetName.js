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
function groupPetFoodFeedsByPetName(petFeeds) {
  const groupedPets = groupBy(petFeeds, "petFullName");

  const petFoodFeedsWillSatisfy = (petFoodFeed) =>
    petFoodFeed.willSatisfyPet === true;

  const toGroupedPetsObject = (nameCollectionPair) => ({
    petFullName: nameCollectionPair[0],
    willSatisfyPet: nameCollectionPair[1].some(petFoodFeedsWillSatisfy),
    petFoodFeeds: nameCollectionPair[1],
  });

  return Object.entries(groupedPets).map(toGroupedPetsObject);
}

var groupBy = function (data, key) {
  // `data` is an array of objects, `key` is the key (or property accessor) to group by
  // reduce runs this anonymous function on each element of `data` (the `item` parameter,
  // returning the `storage` parameter at the end
  return data.reduce(function (storage, item) {
    // get the first instance of the key by which we're grouping
    var group = item[key];

    // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
    storage[group] = storage[group] || [];

    // add this item to its group within `storage`
    storage[group].push(item);

    // return the updated storage to the reduce function, which will then loop through the next
    return storage;
  }, {}); // {} is the initial value of the storage
};

module.exports = groupPetFoodFeedsByPetName;
