import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import Button from "./ui/Button";

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    readyInMinutes?: number;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
      <div className="relative w-full pt-[60%]">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={recipe.image}
          alt={recipe.title}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-amber-800 line-clamp-2 mb-3 min-h-[3.5rem]">
          {recipe.title}
        </h2>

        {recipe.readyInMinutes && (
          <div className="flex items-center text-amber-600 mt-auto mb-4">
            <Clock className="h-5 w-5 mr-1" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
        )}

        <div className="mt-auto">
          <Link
            href={`/recipes/${recipe.id}`}
            // className="inline-block w-full text-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200"
          >
            <Button variant="primary" className="w-full">
              View Recipe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
