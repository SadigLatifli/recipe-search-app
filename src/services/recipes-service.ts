import { IRecipesResponse } from "@/types/recipe";
import { IRecipeDetails } from "@/types/recipe-detailed";

export async function fetchRecipes(
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
): Promise<IRecipesResponse> {
    const resolvedParams = await searchParams;
    const params = new URLSearchParams();

    if (resolvedParams.query)
        params.append("query", resolvedParams.query.toString());
    if (resolvedParams.cuisine)
        params.append("cuisine", resolvedParams.cuisine.toString());
    if (resolvedParams.maxReadyTime)
        params.append("maxReadyTime", resolvedParams.maxReadyTime.toString());

    const page = Number(resolvedParams.page) || 1;
    const number = 9;
    const offset = (page - 1) * number;

    params.append("offset", offset.toString());
    params.append("number", number.toString());

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL
        }/recipes/complexSearch?${params.toString()}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
        }`
        , { next: { revalidate: 60 } });

    if (!res.ok) {
        throw new Error("Failed to fetch recipes");
    }

    return res.json();
}


export async function fetchRecipeDetails(id: string): Promise<IRecipeDetails> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch recipe details");
    }

    return res.json();
}