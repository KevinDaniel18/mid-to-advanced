import { RoadMapWeek } from "@/types/RoadMapTypes";

export const roadmaps: RoadMapWeek[] = [
  {
    week: "Week 1: Solid Foundations and Best Practices",
    days: [
      {
        title: "Basic Hooks",
        description:
          "Create a counter and a search component using a public API with useState and useEffect.",
      },
      {
        title: "Events and Lists",
        description:
          "Build a task list with add, delete, and toggle functionality.",
      },
      {
        title: "Props and Lifting State",
        description:
          "Refactor the task app into components using prop drilling.",
      },
      {
        title: "Custom Hooks",
        description: "Create useLocalStorage or useOnlineStatus.",
      },
      {
        title: "Context API",
        description: "Use Context to manage light/dark theme.",
      },
      {
        title: "React Router",
        description:
          "Build an app with Home, About, NotFound, and a protected route.",
      },
      {
        title: "Review + Mini Challenge",
        description: "Weather app using API, useEffect, and error handling.",
      },
    ],
  },
  {
    week: "Week 2: Global State, APIs, and Project Structure",
    days: [
      {
        title: "Zustand or Redux Toolkit",
        description: "Task app with global state management.",
      },
      { title: "Basic React Query", description: "App using the Pokémon API." },
      {
        title: "Clean Folder Structure",
        description: "Refactor your project for maintainability.",
      },
      {
        title: "Forms with React Hook Form and Zod",
        description: "Login form with validation.",
      },
      {
        title: "Error Boundaries",
        description: "Implement error handling strategies.",
      },
      {
        title: "Dark Mode and Theming",
        description: "Use Tailwind or styled-components for theming.",
      },
      {
        title: "Mini Project",
        description: "ToDo Pro App with CRUD, filters, and dark mode.",
      },
    ],
  },
  {
    week: "Week 3: Testing, Animations, and Optimization",
    days: [
      {
        title: "Component Testing",
        description: "Use React Testing Library for unit tests.",
      },
      {
        title: "Mocking and API Tests",
        description: "Use Jest and MSW to mock APIs.",
      },
      {
        title: "useMemo and useCallback",
        description: "Optimize a filtered list.",
      },
      {
        title: "Lazy Loading and Suspense",
        description: "Improve performance with dynamic imports.",
      },
      {
        title: "Animations",
        description: "Integrate Framer Motion for UI transitions.",
      },
      {
        title: "Optimized Loading",
        description: "Use Skeleton UI and Suspense for smoother UX.",
      },
      {
        title: "Mini Challenge",
        description: "App with pagination, fetch logic, and animations.",
      },
    ],
  },
  {
    week: "Week 4: Final Project and Deployment",
    days: [
      {
        title: "Project Planning",
        description:
          "Define your final project: dashboard, chat, ecommerce, etc.",
      },
      {
        title: "Design and Wireframe",
        description: "Use Figma or wireframes to sketch your layout.",
      },
      {
        title: "UI and Logic Implementation",
        description: "Build the interface and core functionality.",
      },
      {
        title: "Global State, Routing, Auth",
        description: "Add authentication, routing, and persistence.",
      },
      { title: "Deployment", description: "Deploy to Vercel or Netlify." },
      {
        title: "Professional README and CI/CD",
        description: "Write a clean README and set up basic CI/CD.",
      },
      {
        title: "Portfolio and LinkedIn",
        description: "Publish your project and share it professionally.",
      },
    ],
  },
];
