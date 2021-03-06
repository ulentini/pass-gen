import React, { useState, useEffect } from "react"
import { usePasswordGenerator } from "./hooks/use-password-generator"
import copy from "clipboard-copy"
import { useKeyboardListener } from "./hooks/use-keyboard-listener"
import { Switch } from "./components/switch"

export const PasswordGenerator: React.FC = () => {
  const [uppercase, setUppercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [specialCharacters, setSpecialCharacters] = useState(true)
  const [length, setLength] = useState(16)
  const [color, setColor] = useState("text-gray-700")

  const { currentPassword, regeneratePassword } = usePasswordGenerator({
    length,
    numbers,
    uppercase,
    specialCharacters,
    words: false,
  })

  useKeyboardListener((e) => {
    if (e.key === "r") {
      regeneratePassword()
    }
  })

  function copyToClipboard() {
    copy(currentPassword)
    setColor("text-green-600")
  }

  useEffect(() => {
    setColor("text-gray-700")
  }, [currentPassword])

  return (
    <div className="container mx-auto flex justify-center items-center text-gray-700">
      <div className="w-full p-4 md:w-4/5 lg:w-2/3 xl:w-1/2">
        <p
          className={`text-3xl sm:text-5xl lg:text-6xl font-mono text-center cursor-pointer color-transition ${color}`}
          onClick={() => copyToClipboard()}
        >
          {currentPassword}
        </p>
        <div className="w-full bg-white border border-gray-300 rounded my-4">
          <div className="flex justify-around w-full py-4">
            <Switch checked={uppercase} onChange={setUppercase}>
              Aa
            </Switch>
            <Switch checked={numbers} onChange={setNumbers}>
              123
            </Switch>
            <Switch checked={specialCharacters} onChange={setSpecialCharacters}>
              #!?
            </Switch>
            <div>
              <input
                type="number"
                min={6}
                max={32}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="border-2 border-gray-200 px-3 py-1 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              Chars
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-gradient-to-tr from-blue-700 to-pink-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            onClick={regeneratePassword}
          >
            New password
          </button>
        </div>
      </div>
    </div>
  )
}
