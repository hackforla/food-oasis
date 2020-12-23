import { useCallback, useReducer } from "react";

export const CATEGORY_ADD = "categoryAdd";
export const CATEGORY_CLEAR = "categoryClear";
export const CATEGORY_REMOVE = "categoryRemove";

const reducer = (state, { type, value, initialState }) => {
  const valueIndex = state.indexOf(value);
  switch (type) {
    case CATEGORY_ADD:
      return [
        ...state.slice(0, valueIndex),
        value,
        ...state.slice(valueIndex + 1),
      ];
    case CATEGORY_CLEAR:
      return initialState || [];
    case CATEGORY_REMOVE:
      return [...state.slice(0, valueIndex), ...state.slice(valueIndex + 1)];
    default:
      return state;
  }
};

const useCategoryIds = (initialState) => {
  const [categoryIds, dispatch] = useReducer(reducer, initialState);

  const addCategory = useCallback(
    (value) => dispatch({ type: CATEGORY_ADD, value }),
    [dispatch]
  );
  const removeCategory = useCallback(
    (value) => dispatch({ type: CATEGORY_REMOVE, value }),
    [dispatch]
  );
  const clearCategories = useCallback(
    () => dispatch({ type: CATEGORY_CLEAR, initialState }),
    [initialState]
  );

  const toggleCategory = useCallback(
    (value) => {
      if (categoryIds.indexOf(value) >= 0) {
        removeCategory(value);
      } else addCategory(value);
    },
    [addCategory, categoryIds, removeCategory]
  );

  return {
    categoryIds,
    addCategory,
    removeCategory,
    clearCategories,
    toggleCategory,
  };
};

export default useCategoryIds;
