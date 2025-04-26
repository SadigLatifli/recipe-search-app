interface IRecipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    summary?: string;
    readyInMinutes?: number;
    servings?: number;
}

interface IRecipesResponse {
    offset: number;
    number: number;
    results: IRecipe[];
    totalResults: number;
}

export type {
    IRecipe,
    IRecipesResponse,
}