export interface Category {
  id: number;
  name: string;
  displayOrder: number;
  inactive: boolean;
  suggestionStatusId?: number;
  isForFoodSeeker: boolean;
}
