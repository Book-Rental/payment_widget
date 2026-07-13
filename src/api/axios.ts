import axios from "axios";

function getWidgetBaseURL() {
  // When loaded via <script src="...">
  const currentScript = document.currentScript as HTMLScriptElement | null;

  if (currentScript?.src) {
    return new URL(currentScript.src).origin;
  }

  // Fallback (for local dev or non-widget usage)
  return window.location.origin;
}

const api = axios.create({
  baseURL: getWidgetBaseURL(),
});

export default api;
