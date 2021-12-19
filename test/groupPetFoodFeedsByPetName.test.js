const groupPetFoodFeedsByPetName = require("../src/logic/groupPetFoodFeedsByPetName");

const testInput = [
  {
    petFullName: "LionCub-White",
    foodFullName: "Milk",
    feedQuantity: 6,
    willSatisfyPet: true,
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

const expectedTigerCub = {
  petFullName: "TigerCub-Base",
  willSatisfyPet: true,
  petFoodFeeds: [
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
      petFullName: "TigerCub-Base",
      foodFullName: "CottonCandyPink",
      feedQuantity: 3,
      willSatisfyPet: true,
    },
  ],
};

const expectedLionCub = {
  petFullName: "LionCub-White",
  willSatisfyPet: true,
  petFoodFeeds: [
    {
      petFullName: "LionCub-White",
      foodFullName: "Milk",
      feedQuantity: 6,
      willSatisfyPet: true,
    },
  ],
};

test("grouped output contains TigerCub-Base", () => {
  expect(groupPetFoodFeedsByPetName(testInput)).toContainEqual(
    expectedTigerCub
  );
});

test("grouped output contains LionCub-White", () => {
  expect(groupPetFoodFeedsByPetName(testInput)).toContainEqual(expectedLionCub);
});
