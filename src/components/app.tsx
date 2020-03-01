import React, { FC } from "react"
import "../css/tailwind.css"
import { PasswordGenerator } from "./password-generator"

const App: FC<{}> = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <PasswordGenerator />
    </div>
  )
}

export default App
