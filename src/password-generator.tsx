import React, { useState, useEffect } from "react"
import { Button, Checkbox, Slider } from "rsuite"
import { usePasswordGenerator } from "./hooks/use-password-generator"
import copy from "clipboard-copy"
import { useKeyboardListener } from "./hooks/use-keyboard-listener"

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
    <div className="container mx-auto flex justify-center items-center">
      <div className="w-full p-4 md:w-4/5 lg:w-2/3 xl:w-1/2">
        <p
          className={`text-3xl sm:text-5xl lg:text-6xl font-mono text-center cursor-pointer color-transition ${color}`}
          onClick={() => copyToClipboard()}
        >
          {currentPassword}
        </p>
        <div className="w-full bg-white border border-gray-300 rounded my-4">
          <div className="flex justify-around w-full">
            <Checkbox
              checked={uppercase}
              onChange={(value, checked) => {
                setUppercase(checked)
              }}
              className="text-lg"
            >
              Aa
            </Checkbox>
            <Checkbox
              checked={numbers}
              onChange={(value, checked) => {
                setNumbers(checked)
              }}
              className="text-lg"
            >
              123
            </Checkbox>
            <Checkbox
              checked={specialCharacters}
              onChange={(value, checked) => {
                setSpecialCharacters(checked)
              }}
              className="text-lg"
            >
              #!?
            </Checkbox>
          </div>

          <div className="py-4 w-full px-6 flex items-center">
            <div className="flex-grow">
              <Slider
                value={length}
                min={6}
                step={2}
                max={32}
                graduated
                progress
                onChange={(value) => {
                  setLength(value)
                }}
              />
            </div>
            <div className="ml-6">
              <strong>{length}</strong> Chars
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button appearance="primary" size="lg" onClick={regeneratePassword}>
            New password
          </Button>
        </div>
      </div>
    </div>
  )
}
