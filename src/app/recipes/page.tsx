import Link from "next/link";
import { ArrowLeft, Search, Utensils, Timer } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import Spinner from "@/components/ui/Spinner";
import { Suspense } from "react";
import { IRecipesResponse } from "@/types/recipe";
import { fetchRecipes } from "@/services/recipes-service";

interface IRecipesPageProps {
  searchParams: Promise<{
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
    page?: string;
  }>;
}

function SearchTag({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
      {icon}
      <span className="ml-1">{label}: </span>
      <span className="font-semibold ml-1">{value}</span>
    </span>
  );
}

function RecipesLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Spinner size="lg" color="text-amber-500" className="mb-4" />
      <p className="text-amber-700 font-medium">Loading recipes...</p>
    </div>
  );
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: IRecipesPageProps["searchParams"];
}) {
  const recipes: IRecipesResponse = await fetchRecipes(searchParams);
  const resolvedParams = await searchParams;

  const searchQuery = resolvedParams.query;
  const selectedCuisine = resolvedParams.cuisine;
  const prepTime = resolvedParams.maxReadyTime;
  const currentPage = Number(resolvedParams.page) || 1;

  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.totalResults / recipesPerPage);

  const paginationParams = {
    query: searchQuery,
    cuisine: selectedCuisine,
    maxReadyTime: prepTime,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<RecipesLoading />}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-4">Recipes</h1>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <SearchTag
                  icon={<Search className="h-4 w-4" />}
                  label="Search"
                  value={searchQuery}
                />
              )}
              {selectedCuisine && (
                <SearchTag
                  icon={<Utensils className="h-4 w-4" />}
                  label="Cuisine"
                  value={selectedCuisine}
                />
              )}
              {prepTime && (
                <SearchTag
                  icon={<Timer className="h-4 w-4" />}
                  label="Max Prep Time"
                  value={`${prepTime} min`}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="mb-6 text-amber-700">
              Found {recipes.totalResults} recipes
              {recipes.totalResults > recipes.results.length && (
                <span>
                  (showing {recipes.offset + 1}-
                  {Math.min(
                    recipes.offset + recipes.results.length,
                    recipes.totalResults
                  )}
                  of {recipes.totalResults})
                </span>
              )}
            </div>
            {recipes?.results?.length >= 1 && (
              <Link href="/" className="mb-4">
                <Button variant="primary" className=" inline-flex ">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Search
                </Button>
              </Link>
            )}
          </div>

          {recipes.results.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.results.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  searchParams={paginationParams}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <div className="flex justify-center">
                <Search className="h-16 w-16 text-amber-300" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-amber-800">
                No recipes found
              </h2>
              <p className="mt-2 text-amber-600">
                Try adjusting your search criteria
              </p>
              <div className="mt-6">
                <Link href="/" className="">
                  <Button variant="primary" className=" inline-flex ">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Search
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
