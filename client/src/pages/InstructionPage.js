import React from 'react'
import { useNavigate } from 'react-router-dom'

const InstructionPage = () => {

  const navigate = useNavigate()
  const handleInstructions = () => {
    navigate("/instructions")
  }

  return (
    <div className='absolute top-5 right-5'>
      <button
        onClick={handleInstructions}
        className="border-1 px-5 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300 w-full"
      >
        Instructions
      </button>
    </div>
  )
}

export default InstructionPage