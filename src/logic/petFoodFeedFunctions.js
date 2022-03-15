export const getFriendlyName = (fullName) => {
  const fullNameSplits = fullName.split(/[-_]/);

  if (fullNameSplits.length === 1) return fullName;

  return `${fullNameSplits[1]} ${fullNameSplits[0]}`;
};
