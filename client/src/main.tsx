import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Load Umami Analytics
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
if (umamiWebsiteId) {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://cloud.umami.is/script.js';
  script.setAttribute('data-website-id', umamiWebsiteId);
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(<App />);
