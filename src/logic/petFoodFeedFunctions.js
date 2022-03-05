export const getFriendlyName = (petFullName) => {
  const petFullNameSplits = petFullName.split("-");
  return `${petFullNameSplits[1]} ${petFullNameSplits[0]}`;
};
