import { FavContextProvider } from "./context/fav-context"
import { Home } from "./pages/home"

function App() {

  return (
    <>
      <FavContextProvider>
        <Home />
      </FavContextProvider>
    </>
  )
}

export default App
