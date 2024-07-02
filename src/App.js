import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import EventRegistrationForm from "./components/EventRegistrationForm";
import Home from "./components/Home";
import JobApplicationForm from "./components/JobApplicationForm";
import ComplexFormApi from "./components/ComplexFormApi";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "formone",
    element: <EventRegistrationForm />,
  },
  {
    path: "formtwo",
    element: <JobApplicationForm />,
  },
  {
    path: "formthree",
    element: <ComplexFormApi />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter}>
        <Home />
      </RouterProvider>
    </div>
  );
}

export default App;
