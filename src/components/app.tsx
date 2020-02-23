import React, { FC } from "react"
import "../css/tailwind.css"

const App: FC<{}> = () => {
  return (
    <div className="bg-teal-600 h-screen text-white flex items-center">
      <h1 className="text-center font-bold text-5xl w-full">Hello Dev!</h1>
    </div>
  )
}

export default App
