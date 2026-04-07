import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileNav } from "@/components/MobileNav";
import Index from "./pages/Index.tsx";
import CountryPage from "./pages/CountryPage.tsx";
import UniversityPage from "./pages/UniversityPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import StudentStoriesPage from "./pages/StudentStoriesPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import AboutUs from "./pages/AboutUs.tsx"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MobileNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/country/:id" element={<CountryPage />} />
          <Route path="/university/:id" element={<UniversityPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/stories" element={<StudentStoriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
