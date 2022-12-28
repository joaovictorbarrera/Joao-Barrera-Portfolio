import React from 'react'

interface AccentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    variant ?: null | undefined | "outline"
}

function AccentButton({text, variant, ...props}: AccentButtonProps) {

  return (
    <button className={`accent-btn ${variant ? variant : ''}`} type={props.type ? props.type : "button"} {...props}>
      {text}
    </button>
  )
}

export default AccentButton
