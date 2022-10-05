import { ReactElement, useRef } from "react";

import { EXAMPLE_ACTIONS } from "./katty/example";
import { useKatty } from "./katty/useKatty";
import "./App.css";

function App(): ReactElement {
  const levelRef = useRef<HTMLDivElement>(null);

  useKatty({
    element: levelRef.current,
    size: {
      height: 20,
      width: 27,
    },
    actions: EXAMPLE_ACTIONS,
  });

  return (
    <div className="app">
      <div ref={levelRef} className="level" />
    </div>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default App;
