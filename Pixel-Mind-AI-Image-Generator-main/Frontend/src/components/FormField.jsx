import React from 'react'

const FormField = ({labelName,type,placeholder,name,handleChange,handleSurpriseMe,isSurpriseMe,value}) => {
  return (
    <div>
<div className='flex items-center gap-2 mb-2'>   

<label htmlFor={name} className='block text-sm font-medium text-gray-900'>{labelName}</label>
{isSurpriseMe && (  <button type='button'  onClick={handleSurpriseMe} className='font-semibold text-xs bg-[#ECECF1] p-1 px-2 rounded-[5xl] text-black '>  Surprise me </button> )}

</div>

<input  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-3'  type={type} id={name} name={name} placeholder={placeholder} value={value}  onChange={handleChange }required/>



    </div>
  )
}

export default FormField