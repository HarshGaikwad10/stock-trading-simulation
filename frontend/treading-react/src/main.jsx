import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
import { store } from "./state/Store"

createRoot(document.getElementById("root")).render(  
    <BrowserRouter>
     <Provider store={store}>
       <div className="dark min-h-screen">
        <App />
      </div>
     </Provider>
    </BrowserRouter>
)
