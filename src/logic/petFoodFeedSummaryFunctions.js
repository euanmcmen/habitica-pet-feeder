export const getNumberOfPetsToBeFed = (petFoodFeeds) => {
  const petFoodFeedNames = new Set();

  for (const petFoodFeed of petFoodFeeds) {
    petFoodFeedNames.add(petFoodFeed.petFullName);
  }

  return petFoodFeedNames.size;
};

export const getNumberOfPetsToBeFedFully = (petFoodFeeds) => {
  const petFoodFeedNames = new Set();

  for (const petFoodFeed of petFoodFeeds) {
    if (petFoodFeed.willSatisfyPet)
      petFoodFeedNames.add(petFoodFeed.petFullName);
  }

  return petFoodFeedNames.size;
};

export const getNumberOfFoodsToBeFed = (petFoodFeeds) => {
  return petFoodFeeds.reduce((acc, obj) => acc + obj.feedQuantity, 0);
};
