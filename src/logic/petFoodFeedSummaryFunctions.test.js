const {
  getNumberOfPetsToBeFed,
  getNumberOfPetsToBeFedFully,
  getNumberOfFoodsToBeFed,
} = require("./petFoodFeedSummaryFunctions");

const testInput = [
  {
    petFullName: "LionCub-White",
    foodFullName: "Milk",
    feedQuantity: 6,
    willSatisfyPet: false,
  },
  {
    petFullName: "TigerCub-Base",
    foodFullName: "Cake_Base",
    feedQuantity: 4,
    willSatisfyPet: false,
  },
  {
    petFullName: "TigerCub-Base",
    foodFullName: "Meat",
    feedQuantity: 2,
    willSatisfyPet: false,
  },
  {
    petFullName: "TigerCub-Base",
    foodFullName: "Candy_Base",
    feedQuantity: 1,
    willSatisfyPet: false,
  },
  {
    petFullName: "TigerCub-Base",
    foodFullName: "Pie_Base",
    feedQuantity: 1,
    willSatisfyPet: false,
  },
  {
    petFullName: "Dragon-Desert",
    foodFullName: "Potatoe",
    feedQuantity: 9,
    willSatisfyPet: true,
  },
  {
    petFullName: "TigerCub-Base",
    foodFullName: "CottonCandyPink",
    feedQuantity: 3,
    willSatisfyPet: true,
  },
  {
    petFullName: "PandaCub-Base",
    foodFullName: "CottonCandyPink",
    feedQuantity: 23,
    willSatisfyPet: true,
  },
];

test("getNumberOfPetsToBeFed should return 4 because there are 4 distinct pets.", () => {
  expect(getNumberOfPetsToBeFed(testInput)).toBe(4);
});

test("getNumberOfPetsToBeFedFully should return 3 because there are 4 distinct pets, and only 3 were fully fed.", () => {
  expect(getNumberOfPetsToBeFedFully(testInput)).toBe(3);
});

test("getNumberOfFoodsToBeFed should return 49.", () => {
  expect(getNumberOfFoodsToBeFed(testInput)).toBe(49);
});
