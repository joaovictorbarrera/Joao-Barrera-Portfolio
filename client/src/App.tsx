import {Route, Routes} from "react-router-dom"
import AmazonSidebar from "./pages/amazon-sidebar/AmazonSidebar"
import Index from "./pages/index/Index"
import ToggleButtons from "./pages/toggle-buttons/ToggleButtons"
import "./App.css"
import QuicksortVisualizer from "./pages/quicksort-visualizer/QuicksortVisualizer"
import ReactShoppingCart from "./pages/react-shopping-cart/ReactShoppingCart"
import ProjectLayout from "./layouts/ProjectLayout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path="/" element={<ProjectLayout />} >
        <Route path="amazon-sidebar" element={<AmazonSidebar />}/>
        <Route path="toggle-buttons" element={<ToggleButtons />}/>
        <Route path="quicksort-visualizer" element={<QuicksortVisualizer />}/>
        <Route path="react-shopping-cart" element={<ReactShoppingCart />}/>
      </Route>
      <Route path="/*" element={<div>not found</div>}/>
    </Routes>
  )
}

export default App
