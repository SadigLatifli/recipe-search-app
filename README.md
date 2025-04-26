Recipe Search Application
=========================

A modern recipe search and discovery app built with Next.js, TypeScript, and Tailwind CSS. This application allows users to search for recipes by keywords, cuisine types, and preparation time, and view detailed recipe information.


Features
--------

-   **Recipe Search**: Search for recipes by keywords, cuisine type, and maximum preparation time
-   **Pagination**: Browse through large sets of recipe results with smooth pagination
-   **Responsive Design**: Mobile-first approach that looks great on all device sizes
-   **Recipe Details**: View comprehensive recipe information including:
    -   Ingredients list with images
    -   Step-by-step cooking instructions
    -   Preparation time and servings
    -   Health score
    -   Wine pairings (when available)
-   **Error Handling**: Graceful handling of API errors and loading states
-   **Timeout Protection**: Built-in request timeout to prevent hanging API calls

Technologies
------------

-   **Next.js 14**: For server-side rendering and API routes
-   **TypeScript**: For type safety and better developer experience
-   **Tailwind CSS**: For styling and responsive design
-   **Lucide React**: For beautiful icons
-   **Spoonacular API**: For recipe data

Project Structure
-----------------

```
├── app/                     # Next.js app directory
│   ├── recipes/             # Recipes search results page (static)
│   │   ├── [id]/            # Dynamic route for recipe details
│   │   │   └── page.tsx
│   │   └── page.tsx         # Recipes listing/search page
│   ├── favicon.ico          # Favicon
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # App layout
│   └── page.tsx             # Home page
├── components/              # UI components
│   ├── RecipeCard.tsx        
│   ├── SearchForm.tsx        
│   └── ui/                   # Small reusable UI elements
│       ├── Button.tsx
│       ├── Pagination.tsx
│       ├── Spinner.tsx
├── services/                # API service functions
│   └── recipes-service.ts
├── types/                   # TypeScript types
│   ├── recipe.ts
│   └── recipe-detailed.ts

```

Getting Started
---------------

### Prerequisites

-   Node.js 18.x or higher
-   npm or yarn
-   A Spoonacular API key (sign up at [spoonacular.com/food-api](https://spoonacular.com/food-api))

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=https://api.spoonacular.com
NEXT_PUBLIC_SPOONACULAR_API_KEY=your_api_key_here

```

### Installation

1.  Clone the repository:

    ```
    git clone https://github.com/SadigLatifli/recipe-search-app.git
    cd recipe-search-app

    ```

2.  Install dependencies:

    ```
    npm install
    # or
    yarn install

    ```

3.  Run the development server:

    ```
    npm run dev
    # or
    yarn dev

    ```

4.  Open [http://localhost:3000](http://localhost:3000/) with your browser to see the application.

Building for Production
-----------------------

To create a production build:

```
npm run build
# or
yarn build

```

To start the production server:

```
npm run start
# or
yarn start

```

API Rate Limits
---------------

The Spoonacular API has rate limits based on your subscription plan. The application includes timeout protection to prevent hanging requests, but you should be aware of your API usage limits.

Error Handling
--------------

The application includes error boundaries and loading states to handle:

-   API timeouts (requests that take longer than 60 seconds)
-   Invalid API responses
-   Network errors
-   Missing recipe information

Customization
-------------

### Styling

The application uses Tailwind CSS for styling. To modify the design:

1.  Edit the `tailwind.config.js` file to customize colors, fonts, and other design tokens
2.  Modify component classes directly to change specific elements

### Adding Features

Some ideas for extending the application:

-   User authentication to save favorite recipes
-   Recipe filtering by dietary restrictions (gluten-free, vegan, etc.)
-   Meal planning functionality
-   Shopping list generation from recipes
-   User reviews and ratings

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
----------------

-   [Spoonacular API](https://spoonacular.com/food-api) for providing the recipe data
-   [Next.js](https://nextjs.org/) for the React framework
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
-   [Lucide React](https://lucide.dev/) for the icon set