import "./style.css"
function Button({text, onClick, disabled, width}) {
  return (
    <button className={`custom-btn ${width ? `btn-width-${width}` : ''}`} disabled={disabled} onClick={onClick}>{text}</button>
  )
}

export default Button