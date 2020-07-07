import React from 'react'
import { useMyHook } from '@doosterling/use-shopify'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App