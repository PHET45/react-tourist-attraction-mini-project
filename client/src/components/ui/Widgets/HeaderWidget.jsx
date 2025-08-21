import React from 'react'
import { Input } from '@/components/ui/input'
const HeaderWidget = ({ text, onTextChange }) => {
    const handleInputChange = (e) => {
        onTextChange?.(e.target.value)
      }
  return (
    <>
      <h1 className="text-blue-400 text-2xl mb-4">เที่ยวไหนดี</h1>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex flex-col gap-2 items-start m-10'>
          <label className='text-sm font-medium text-gray-700'>ค้นหาที่เที่ยว</label>
          <Input 
            value={text}
            onChange={handleInputChange}
            placeholder="หาที่เที่ยวแล้วไปกัน"
            className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none px-0 py-2 text-base w-full"
          />
        </div>
      </div>
    </>
  )
}

export default HeaderWidget
