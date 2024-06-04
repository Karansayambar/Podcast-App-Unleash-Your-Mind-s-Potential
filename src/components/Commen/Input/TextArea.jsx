
function TextArea({type,state,setState,placeholder,required}) {
  return (
    <>
    <textarea
    type={type}
    value={state}
    onChange={(e) => setState(e.target.value)}
    placeholder={placeholder}
    required={required}
    className='custom-input'
    style={{height:"100px"}}
    />
    </>
  )
}

export default TextArea