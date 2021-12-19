import { useState, useEffect } from "react"

interface PasswordGeneratorOptions {
  length: number
  numbers: boolean
  uppercase: boolean
  lowercase: boolean
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
  const chars = "_#-?!.@"
  const r = Math.round(Math.random() * (chars.length - 1))
  return chars.split("")[r]
}

export function generatePassword({
  length,
  numbers,
  uppercase,
  lowercase,
  specialCharacters,
  words,
}: PasswordGeneratorOptions) {
  const parts = generateParts({
    length,
    lowercase,
    uppercase,
    numbers,
    specialCharacters,
  })

  let keys = Object.keys(parts) as (keyof typeof parts)[]
  let password = ""
  while (password.length < length) {
    const current = keys[~~(keys.length * Math.random())]

    if (parts[current]! > 0) {
      if (current === "specialCharacters") {
        password += generateSpecialChar()
      } else {
        const numberChar = current === "numbers"
        const uppercaseChar = current === "uppercase"

        password += generateAlphaNumericChar(numberChar, uppercaseChar)
      }
      parts[current]!--
    } else {
      keys = keys.filter((i) => i !== current)
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
      lowercase: options.lowercase,
      words: options.words,
    }
    setCurrentPassword(generatePassword(opts))
  }, [
    options.length,
    options.numbers,
    options.specialCharacters,
    options.uppercase,
    options.lowercase,
    options.words,
  ])

  return {
    currentPassword,
    regeneratePassword,
  }
}

function generateParts({
  length,
  numbers,
  uppercase,
  lowercase,
  specialCharacters,
}: {
  length: number
  numbers: boolean
  uppercase: boolean
  lowercase: boolean
  specialCharacters: boolean
}) {
  let total = 0
  numbers && total++
  uppercase && total++
  lowercase && total++
  specialCharacters && total++

  const parts: {
    lowercase?: number
    uppercase?: number
    numbers?: number
    specialCharacters?: number
  } = {}

  const unit = Math.floor(length / total)
  const partial = unit * total

  if (lowercase) {
    parts.lowercase = unit
  }

  if (uppercase) {
    parts.uppercase = unit
  }

  if (numbers) {
    parts.numbers = unit
  }

  if (specialCharacters) {
    parts.specialCharacters = unit
  }

  const keys: (keyof typeof parts)[] = Object.keys(
    parts,
  ) as (keyof typeof parts)[]
  const diff = length - partial
  for (let i = 0; i < diff; i++) {
    parts[keys[i]]!++
  }

  return parts
}
