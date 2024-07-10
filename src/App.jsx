import "./App.css";
import { TransitionExample } from "./examples/Transition/main";
import { ActionState } from "./examples/ActionState/ActionState";
import { UseExample1 } from "./examples/UseAPI/UseAPI";
import { FormStatusExample } from "./examples/FormStatus/FormStatusExample";
import { UseOptimisticExample } from "./examples/useOptimistic/UseOptimisticExample";

function App() {
  return (
    <div className="app">
      <UseExample1 />
      <TransitionExample />
      <ActionState />
      <FormStatusExample />
      <UseOptimisticExample />
    </div>
  );
}

export default App;
