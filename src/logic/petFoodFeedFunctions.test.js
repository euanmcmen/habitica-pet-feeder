const { getFriendlyName } = require("./petFoodFeedFunctions");

test("LionCub-White should return White LionCub.", () => {
  expect(getFriendlyName("LionCub-White")).toBe("White LionCub");
});

test("Cake_Base should return Base Cake.", () => {
  expect(getFriendlyName("Cake_Base")).toBe("Base Cake");
});

test("Milk should return Milk.", () => {
  expect(getFriendlyName("Milk")).toBe("Milk");
});
