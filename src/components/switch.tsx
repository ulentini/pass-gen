import React from "react"
import { Switch as HSwitch } from "@headlessui/react"

export const Switch: React.FC<{
  checked?: boolean
  onChange?: (checked: boolean) => void
}> = ({ checked = false, onChange = () => {}, children }) => {
  return (
    <HSwitch.Group>
      <div className="flex items-center">
        {children && (
          <HSwitch.Label className="mr-4 w-10 text-right">
            {children}
          </HSwitch.Label>
        )}
        <HSwitch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? "bg-pink-600" : "bg-gray-200"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300`}
        >
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </HSwitch>
      </div>
    </HSwitch.Group>
  )
}
