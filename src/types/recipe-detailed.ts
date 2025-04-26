interface IIngredient {
  id: number;
  name: string;
  original: string;
  amount: number;
  unit: string;
  image: string;
}

interface IRecipeDetails {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  preparationMinutes?: number;
  cookingMinutes?: number;
  summary: string;
  instructions: string;
  sourceUrl: string;
  sourceName: string;
  healthScore: number;
  spoonacularScore: number;
  dishTypes: string[];
  diets: string[];
  extendedIngredients: IIngredient[];
  winePairing?: {
    pairedWines: string[];
    pairingText: string;
    productMatches: {
      title: string;
      description: string;
      price: string;
      imageUrl: string;
    }[];
  };
}

export type { IRecipeDetails, IIngredient };