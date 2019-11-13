export const initialState = {
  isLoading: true,
  categoriesError: null,
  stakeholdersError: null,
  isSearchPanelOpen: false,
  stakeholders: [],
  categories: [],
  searchString: "",
  selectedCategories: [{ id: 1, name: "Food Pantry" }],
  selectedLatitude: 34.041001,
  selectedLongitude: -118.235036,
  selectedDistance: 3,
};
