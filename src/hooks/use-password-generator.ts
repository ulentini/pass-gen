import { useState, useEffect } from "react"

interface PasswordGeneratorOptions {
  length: number
  numbers: boolean
  uppercase: boolean
  specialCharacters: boolean
  words: boolean
}

function generateAlphaNumericChar(number: boolean, uppercase: boolean): string {
  const min = !number ? 10 : 0
  const max = number ? 10 : 62
  let r = (Math.random() * (max - min) + min) << 0
  const c = String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48))
  return uppercase ? c.toUpperCase() : c.toLowerCase()
}

function generateSpecialChar() {
  const chars = "_#-?!"
  const r = Math.round(Math.random() * (chars.length - 1))
  return chars.split("")[r]
}

export function generatePassword({
  length,
  numbers,
  uppercase,
  specialCharacters,
  words,
}: PasswordGeneratorOptions) {
  const parts = {
    numbers: numbers ? Math.round(length * 0.3) : 0,
    specialCharacters: specialCharacters ? Math.round(length * 0.2) : 0,
    upperCaseLetters: 0,
    lowerCaseLetters: 0,
  }

  const remaining = length - parts.numbers - parts.specialCharacters
  parts.upperCaseLetters = uppercase ? Math.round(remaining * 0.5) : 0
  parts.lowerCaseLetters = remaining - parts.upperCaseLetters

  let keys = Object.keys(parts)
  let password = ""
  while (password.length < length) {
    const current = keys[~~(keys.length * Math.random())] as
      | "numbers"
      | "specialCharacters"
      | "upperCaseLetters"
      | "lowerCaseLetters"

    if (parts[current] > 0) {
      if (current === "specialCharacters") {
        password += generateSpecialChar()
      } else {
        const numberChar = current === "numbers"
        const uppercaseChar = current === "upperCaseLetters"

        password += generateAlphaNumericChar(numberChar, uppercaseChar)
      }
      parts[current]--
    } else {
      keys = keys.filter(i => i !== current)
    }
  }

  return password
}

export function usePasswordGenerator(options: PasswordGeneratorOptions) {
  const [currentPassword, setCurrentPassword] = useState(
    generatePassword(options),
  )

  function regeneratePassword() {
    setCurrentPassword(generatePassword(options))
  }

  useEffect(() => {
    const opts: PasswordGeneratorOptions = {
      length: options.length,
      numbers: options.numbers,
      specialCharacters: options.specialCharacters,
      uppercase: options.uppercase,
      words: options.words,
    }
    setCurrentPassword(generatePassword(opts))
  }, [
    options.length,
    options.numbers,
    options.specialCharacters,
    options.uppercase,
    options.words,
  ])

  return {
    currentPassword,
    regeneratePassword,
  }
}
