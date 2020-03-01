import React, { FC } from "react"
import "../css/tailwind.css"
import { PasswordGenerator } from "./password-generator"

const App: FC<{}> = () => {
  return (
    <div className="bg-gray-100 font-sans h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="-mt-24 text-2xl font-semibold text-blue-800 p-0 pb-2 m-0 leading-tight">
          PassGen
        </h1>
        <h2 className="font-light text-lg text-blue-700 p-0 m-0  leading-tight">
          Password generator
        </h2>
      </div>
      <PasswordGenerator />
    </div>
  )
}

export default App
