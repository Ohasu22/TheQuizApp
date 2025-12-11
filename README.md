Quiz App – Frontend Developer Intern Assignment

This project was built as part of the Frontend Developer Intern Assignment, where I implemented a pixel-perfect quiz interface based on a provided Figma design.

The application includes a complete quiz flow, animations, timer, random questions, and a fully responsive desktop UI.

Available Scripts

In the project directory, you can run:

npm start

Runs the app in development mode.
Open http://localhost:3000
 to view it in your browser.

The page will reload when you make changes.
You may also see lint errors in the console.

npm run build

Builds the app for production to the build folder.

It bundles React in production mode and optimizes the UI for best performance.
The output is minified, hashed, and ready to be deployed on Vercel or any hosting platform.

npm test

(If tests are added later)
Launches the test runner in interactive watch mode.

npm run eject

⚠ This is a one-way operation. Once you eject, you cannot go back.

You will gain full control over Webpack, Babel, ESLint, and all configurations.

📦 Setup Instructions

This project requires TailwindCSS, PostCSS, and Autoprefixer in addition to standard dependencies.

Follow these steps:

1. Clone the Repository
git clone <your_repo_url>
cd <your_project_folder>

2. Install npm dependencies
npm install

3. Install TailwindCSS + PostCSS + Autoprefixer
npm install -D tailwindcss postcss autoprefixer

4. Initialize Tailwind
npx tailwindcss init -p


This will generate:

tailwind.config.js

postcss.config.js

5. Configure Tailwind

Add paths inside tailwind.config.js:

content: [
  "./src/**/*.{js,jsx,ts,tsx}",
],

6. Import Tailwind into your CSS

In src/index.css (or App.css), add:

@tailwind base;
@tailwind components;
@tailwind utilities;

7. Start the development server
npm start

8. Build for production
npm run build

🧰 Tech Stack Used

React.js – Component-based UI

TailwindCSS – Styling framework

PostCSS + Autoprefixer – For browser compatibility

JavaScript (ES6+)

Framer Motion – Animations

Vercel – Deployment

✨ Key Features Implemented
✔ Pixel-perfect UI based on Figma

Pastel gradients

Rounded cards

Smooth navbar & progress bars

✔ Complete Quiz Flow

Next/Previous navigation

Option selection

Result screen

✔ Timer System (per question)

Updates every second

Synchronized with progress bar

✔ Random Questions

User receives 5 random questions each run

Increases replayability

✔ Accessibility Features

Keyboard navigation

ARIA labels

Focus rings

High contrast text

✔ Smooth Animations

Hover effects

Button transitions

Background crossfades

Cat Paw animations

🧠 Assumptions Made
1. Timer Must Be Included

Since quizzes typically require time-bound decisions, I added a timer to make the experience more realistic and interactive.

2. Questions Should Be Randomized

To avoid repetition and improve user engagement, the app picks five random questions from the pool on every attempt.

These assumptions improve realism, UX, and replay value.

⏱ Time Spent on the Assignment

I completed design interpretation, component building, logic implementation, animations, styling, and deployment within:

➡️ Approximately 4 hours
📚 Learn More

To learn React:
https://reactjs.org/

To learn TailwindCSS:
https://tailwindcss.com/docs/installation

To deploy on Vercel:
https://vercel.com/docs
