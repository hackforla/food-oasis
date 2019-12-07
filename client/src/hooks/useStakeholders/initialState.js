export const initialState = {
  isLoading: true,
  categoriesError: null,
  stakeholdersError: null,
  isSearchPanelOpen: false,
  stakeholders: [],
  categories: [],
  searchString: "",
  selectedCategories: [
    { id: 1, name: "Food Pantry" },
    { id: 8, name: "Food Bank" },
    { id: 9, name: "Soup Kitchen" }
  ],
  selectedLatitude: 34.041001,
  selectedLongitude: -118.235036,
  selectedDistance: 10
};
