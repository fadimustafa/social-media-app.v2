import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import LandingPage from "./pages/LandingPage.jsx";
import { useUser } from "@clerk/clerk-react";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Container maxW="45%">
        <Routes>
          {/* public routes  */}
          <Route path="/" element={<LandingPage />} />
          {/* privet routes  */}
          <Route
            path={`/:username/:id`}
            element={isSignedIn ? <UserPage /> : <LandingPage />}
          />
          <Route
            path="/home"
            element={isSignedIn ? <PostPage /> : <LandingPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
