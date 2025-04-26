import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Users, Star } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { IIngredient, IRecipeDetails } from "@/types/recipe-detailed";
import { fetchRecipeDetails } from "@/services/recipes-service";

function IngredientsList({ ingredients }: { ingredients: IIngredient[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">Ingredients</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                width={40}
                height={40}
                alt={ingredient.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-amber-900">
                {ingredient.original}
              </p>
              <p className="text-sm text-amber-700">
                {ingredient.amount} {ingredient.unit}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Instructions({ instructions }: { instructions: string }) {
  if (!instructions) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Instructions</h2>
        <p className="text-amber-700 italic">
          No detailed instructions available. Please check the source website
          for cooking steps.
        </p>
      </div>
    );
  }

  const steps = instructions
    .split(/\n|\d+\.\s/)
    .filter((step) => step.trim().length > 0);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">Instructions</h2>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex">
              <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center mr-3">
                {index + 1}
              </span>
              <p className="text-amber-900">{step.trim()}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RecipeSummary({ summary }: { summary: string }) {
  const cleanSummary = summary.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-amber-800 mb-2">
        About this recipe
      </h2>
      <p className="text-amber-700">{cleanSummary}</p>
    </div>
  );
}

async function RecipeDetails({ id }: { id: string }) {
  const recipe: IRecipeDetails = await fetchRecipeDetails(id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/recipes"
          className="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Results
        </Link>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {recipe.dishTypes &&
                recipe.dishTypes.slice(0, 3).map((type, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs font-semibold bg-amber-500 bg-opacity-90 rounded-full"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              {recipe.diets &&
                recipe.diets.slice(0, 2).map((diet, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs font-semibold bg-green-500 bg-opacity-90 rounded-full"
                  >
                    {diet.charAt(0).toUpperCase() + diet.slice(1)}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-medium text-gray-400">{recipe.readyInMinutes} min</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-medium text-gray-400">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Health Score</p>
                <p className="font-medium text-gray-400">{recipe.healthScore}/100</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Recipe by{" "}
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 underline"
            >
              {recipe.sourceName}
            </a>
          </div>

          <RecipeSummary summary={recipe.summary} />
          <IngredientsList ingredients={recipe.extendedIngredients} />
          <Instructions instructions={recipe.instructions} />

          {recipe.winePairing && recipe.winePairing.pairingText && (
            <div className="mt-8 bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h2 className="text-xl font-bold text-amber-800 mb-2">
                Wine Pairing
              </h2>
              <p className="text-amber-700 mb-4">
                {recipe.winePairing.pairingText}
              </p>
              {recipe.winePairing.productMatches &&
                recipe.winePairing.productMatches.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-amber-800 mb-2">
                      Suggested Wine:
                    </h3>
                    <div className="flex items-start space-x-4 bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex-shrink-0">
                        <Image
                          src={recipe.winePairing.productMatches[0].imageUrl}
                          width={80}
                          height={120}
                          alt={recipe.winePairing.productMatches[0].title}
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-amber-900">
                          {recipe.winePairing.productMatches[0].title}
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                          {recipe.winePairing.productMatches[0].price}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {recipe.winePairing.productMatches[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecipeLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Spinner size="lg" color="text-amber-500" className="mb-4" />
      <p className="text-amber-700 font-medium">Loading recipe details...</p>
    </div>
  );
}

export default function RecipePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<RecipeLoading />}>
          <RecipeDetails id={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
