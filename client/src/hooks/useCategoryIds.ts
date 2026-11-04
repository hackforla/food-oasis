import { useCallback, useReducer } from "react";

export const CATEGORY_ADD = "categoryAdd";
export const CATEGORY_CLEAR = "categoryClear";
export const CATEGORY_REMOVE = "categoryRemove";

type CategoryIdsAction =
  | { type: typeof CATEGORY_ADD; value: number }
  | { type: typeof CATEGORY_CLEAR; initialState?: number[] }
  | { type: typeof CATEGORY_REMOVE; value: number };

const reducer = (state: number[], action: CategoryIdsAction): number[] => {
  const valueIndex = "value" in action ? state.indexOf(action.value) : -1;

  switch (action.type) {
    case CATEGORY_ADD:
      return [
        ...state.slice(0, valueIndex),
        action.value,
        ...state.slice(valueIndex + 1),
      ];
    case CATEGORY_CLEAR:
      return action.initialState || [];
    case CATEGORY_REMOVE:
      return [...state.slice(0, valueIndex), ...state.slice(valueIndex + 1)];
    default:
      return state;
  }
};

const useCategoryIds = (initialState: number[]) => {
  const [categoryIds, dispatch] = useReducer(reducer, initialState);

  const addCategory = useCallback(
    (value: number) => dispatch({ type: CATEGORY_ADD, value }),
    [dispatch]
  );
  const removeCategory = useCallback(
    (value: number) => dispatch({ type: CATEGORY_REMOVE, value }),
    [dispatch]
  );
  const clearCategories = useCallback(
    () => dispatch({ type: CATEGORY_CLEAR, initialState }),
    [initialState]
  );

  const toggleCategory = useCallback(
    (value: number) => {
      if (categoryIds.indexOf(value) >= 0) {
        removeCategory(value);
      } else {
        addCategory(value);
      }
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