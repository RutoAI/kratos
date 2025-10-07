'use client'

import { XCircleIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal wrapper */}
      <div className="relative w-full max-w-7xl">
        {/* Close button - positioned relative to modal */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-20 text-white hover:text-orange-500 transition-colors"
        >
          <XCircleIcon className="h-10 w-10" />
        </button>

        {/* Modal content */}
        <div
          className="relative z-10 w-full max-h-[90vh] overflow-y-auto bg-gradient-to-tr from-[#171A21] to-[#0E0D19] rounded-xl border border-white/15 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal body */}
          <div className="px-6 py-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
