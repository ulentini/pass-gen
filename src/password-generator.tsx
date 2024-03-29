import React, { useState, useEffect } from "react"
import { usePasswordGenerator } from "./hooks/use-password-generator"
import copy from "clipboard-copy"
import { useKeyboardListener } from "./hooks/use-keyboard-listener"
import { Switch } from "./components/switch"

export const PasswordGenerator: React.FC = () => {
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [specialCharacters, setSpecialCharacters] = useState(true)
  const [length, setLength] = useState(16)
  const [color, setColor] = useState("text-gray-700")

  const { currentPassword, regeneratePassword } = usePasswordGenerator({
    length,
    numbers,
    uppercase,
    lowercase,
    specialCharacters,
    words: false,
  })

  useKeyboardListener((e) => {
    if (e.key === "r") {
      regeneratePassword()
    } else if (e.key === "c") {
      copyToClipboard()
    }
  })

  function copyToClipboard() {
    copy(currentPassword)
    setColor("text-green-600")
  }

  useEffect(() => {
    setColor("text-gray-700")
  }, [currentPassword])

  function guardSwitches(
    setter: (value: boolean) => void,
  ): (value: boolean) => void {
    let total = 0
    lowercase && total++
    uppercase && total++
    numbers && total++
    specialCharacters && total++

    return (value: boolean) => {
      if (total > 1 || value) {
        setter(value)
      }
    }
  }

  return (
    <div className="container mx-auto flex justify-center items-center text-gray-700">
      <div className="w-full p-4 md:w-4/5 lg:w-2/3 xl:w-1/2">
        <p
          className={`text-3xl sm:text-5xl lg:text-6xl font-mono text-center cursor-pointer color-transition ${color}`}
          onClick={() => copyToClipboard()}
        >
          {currentPassword}
        </p>
        <div className="w-full bg-white border-2 border-gray-200 rounded-lg my-4">
          <div className="flex-wrap flex justify-around w-full gap-4 p-4">
            <Switch checked={uppercase} onChange={guardSwitches(setUppercase)}>
              ABC
            </Switch>
            <Switch checked={lowercase} onChange={guardSwitches(setLowercase)}>
              abc
            </Switch>
            <Switch checked={numbers} onChange={guardSwitches(setNumbers)}>
              123
            </Switch>
            <Switch
              checked={specialCharacters}
              onChange={guardSwitches(setSpecialCharacters)}
            >
              #!?
            </Switch>
            <div>
              <input
                type="number"
                min={6}
                max={32}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="border-2 border-gray-200 px-2 md:px-3 py-1 text-center rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
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
