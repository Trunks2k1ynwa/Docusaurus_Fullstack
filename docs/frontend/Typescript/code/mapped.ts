type Developer = {
  [key: string]: string;
};

const Darwin: Developer = {
  name: "Le văn trung",
  age: `22`,
  sdt: "30232432",
};

//////////////////////

type OptionFags<Type> = {
  [Property in keyof Type]: string;
};
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};
type FeatureOptions = OptionFags<FeatureFlags>;

const darling: FeatureOptions = {
  darkMode: "COn cho",
  newUserProfile: "Con ga",
};

//////////////////////
// Delete readonly of property
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
const test: UnlockedAccount = {
  id: "Trung",
  name: "le Trung",
};
