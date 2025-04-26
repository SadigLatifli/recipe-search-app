"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { Clock, Search, Utensils } from "lucide-react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState("");
  const router = useRouter();

  const isFormValid = query || cuisine || maxReadyTime;

  const handleSubmit = () => {
    const params = new URLSearchParams({
      query,
      cuisine,
      maxReadyTime,
    }).toString();
    router.push(`/recipes?${params}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-amber-100">
        <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">
          Find Your Recipe
        </h2>

        <div className="space-y-5">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-amber-500 h-5 w-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="pl-10 border border-amber-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 placeholder-gray-400 text-gray-700"
            />
          </div>

          <div className="relative">
            <Utensils className="absolute left-3 top-3 text-amber-500 h-5 w-5" />
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="pl-10 border border-amber-200 p-3 rounded-lg w-full appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 bg-white text-gray-700"
            >
              <option value="">Select Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Thai">Thai</option>
              <option value="Japanese">Japanese</option>
              <option value="Mediterranean">Mediterranean</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg
                className="h-5 w-5 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <Clock className="absolute left-3 top-3 text-amber-500 h-5 w-5" />
            <input
              type="number"
              value={maxReadyTime}
              onChange={(e) => setMaxReadyTime(e.target.value)}
              placeholder="Max Prep Time (minutes)"
              min="0"
              className="pl-10 border border-amber-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 placeholder-gray-400 text-gray-700"
            />
          </div>

          <Button
            disabled={!isFormValid}
            onClick={handleSubmit}
            variant="primary"
            className="w-full"
          >
            Find Recipes
          </Button>
        </div>
      </div>
    </div>
  );
}
