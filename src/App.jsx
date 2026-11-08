import LandingPage from "./pages/landing/LandingPage";
import "./app/layouts/LandingLayout.css";

export default function App() {
  return (
    <div className="landing-shell">
      <div className="landing-page">
        <LandingPage />
      </div>
    </div>
  );
}
