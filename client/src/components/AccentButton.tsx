import React from 'react'

interface AccentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

function AccentButton({text, ...props}: AccentButtonProps) {
  console.log({text, ...props})
  return (
    <button className='accent-btn' {...props}>
      {text}
    </button>
  )
}

export default AccentButton
