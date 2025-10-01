import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import { QuestionProvider } from "./components/context/questionProvider.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
     <QueryClientProvider client={queryClient}>
      <QuestionProvider>
        <App />
      </QuestionProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
