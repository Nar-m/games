import GamesProvider from "./components/StartConteiner";
import StartConteiner from "./components/Start/Start";

function App() {
  return (
    <GamesProvider>
      <StartConteiner />
    </GamesProvider>
  );
}

export default App;
