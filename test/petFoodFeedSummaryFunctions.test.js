const {
  getNumberOfPetsFed,
  getNumberOfPetsFedFully,
  getNumberOfFoodsFed,
} = require("../src/logic/petFoodFeedSummaryFunctions");

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

test("getNumberOfPetsFed should return 4 because there are 4 distinct pets.", () => {
  expect(getNumberOfPetsFed(testInput)).toBe(4);
});

test("getNumberOfPetsFedFully should return 3 because there are 4 distinct pets, and only 3 were fully fed.", () => {
  expect(getNumberOfPetsFedFully(testInput)).toBe(3);
});

test("getNumberOfFoodsFed should return 49.", () => {
  expect(getNumberOfFoodsFed(testInput)).toBe(49);
});
