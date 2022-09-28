import { RefCallback, useState } from 'react'
import { useKatty } from './katty/useCatPlayground'
import { EXAMPLE_ACTIONS } from "./katty/example"
import './App.css'

function App() {
  const [levelRef, setLevelRef] = useState<HTMLDivElement | null>(null)

  const handleRef: RefCallback<HTMLDivElement> = (ref) => {
    if (!ref) {
      return
    }

    setLevelRef(ref)
  }

  useKatty({
    element: levelRef,
    size: {
        height: 20,
        width: 27,
    },
    actions: EXAMPLE_ACTIONS
})

  return (
    <div className="app">
      <div ref={handleRef} className="level level-1" />
    </div>
  )
}

export default App
