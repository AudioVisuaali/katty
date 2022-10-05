import { useRef } from 'react'
import { useKatty } from './katty/useCatPlayground'
import { EXAMPLE_ACTIONS } from "./katty/example"
import './App.css'

function App() {
  const levelRef = useRef<HTMLDivElement>(null);

  useKatty({
    element: levelRef.current,
    size: {
        height: 20,
        width: 27,
    },
    actions: EXAMPLE_ACTIONS
  })

  return (
    <div className="app">
      <div ref={levelRef} className="level level-1" />
    </div>
  )
}

export default App
