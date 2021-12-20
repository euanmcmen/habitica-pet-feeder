const getNumberOfPetsFed = (petFoodFeeds) => {
  const petFoodFeedNames = new Set();

  for (const petFoodFeed of petFoodFeeds) {
    petFoodFeedNames.add(petFoodFeed.petFullName);
  }

  return petFoodFeedNames.size;
};

const getNumberOfPetsFedFully = (petFoodFeeds) => {
  const petFoodFeedNames = new Set();

  for (const petFoodFeed of petFoodFeeds) {
    if (petFoodFeed.willSatisfyPet)
      petFoodFeedNames.add(petFoodFeed.petFullName);
  }

  return petFoodFeedNames.size;
};

const getNumberOfFoodsFed = (petFoodFeeds) => {
  return petFoodFeeds.reduce((acc, obj) => acc + obj.feedQuantity, 0);
};

module.exports = {
  getNumberOfPetsFed,
  getNumberOfPetsFedFully,
  getNumberOfFoodsFed,
};
