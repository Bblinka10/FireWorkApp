import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Inventory from "./pages/Inventory";
import Sale from "./pages/Sale";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Inventory />} />
          <Route path="/sale" element={<Sale />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;