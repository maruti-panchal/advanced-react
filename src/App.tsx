import { Button } from "./components/Button";
import { Input } from "./components/Input";

function App() {
  return (
    <main>
      <Input id="name" label="Your Name" type="text" />
      <Input id="age" label="Your Age" type="number" />
      <Button el="button" onClick={() => alert('Button clicked!')}>Click Me</Button>
      <Button el="anchor" href="https://www.google.com">Go to Example</Button>
      </main>
  );
}

export default App;
