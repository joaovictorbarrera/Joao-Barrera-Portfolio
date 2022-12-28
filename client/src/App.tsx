import {Route, Routes} from "react-router-dom"
import AmazonSidebar from "./pages/amazon-sidebar/AmazonSidebar"
import Index from "./pages/index/Index"
import ToggleButtons from "./pages/toggle-buttons/ToggleButtons"
import "./App.css"
import QuicksortVisualizer from "./pages/quicksort-visualizer/QuicksortViz"
import ReactShoppingCart from "./pages/react-shopping-cart/ReactShoppingCart"
import ProjectLayout from "./layouts/ProjectLayout"
import ProvidersApp from "./pages/providers-app/ProvidersApp"
import Admin from "./pages/admin/Admin"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<ProjectLayout />} >
          <Route path="amazon-sidebar" element={<AmazonSidebar />}/>
          <Route path="providers-app" element={<ProvidersApp />}/>
          <Route path="toggle-buttons" element={<ToggleButtons />}/>
          <Route path="quicksort-visualizer" element={<QuicksortVisualizer />}/>
          <Route path="react-shopping-cart" element={<ReactShoppingCart />}/>
        </Route>
        <Route path="/*" element={<div>not found</div>}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
