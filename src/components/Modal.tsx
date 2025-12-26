"use client"
import React from 'react'

type Props = {
  isOpen: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode
}

export default function Modal({ isOpen, title, onClose, children }: Props) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-lg p-6 mx-auto max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white/90 -mx-6 px-6 py-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Close</button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  )
}
