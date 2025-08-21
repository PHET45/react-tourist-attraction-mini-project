import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Input } from '../components/ui/input'
const LandingPage = () => {
    const [blogs, setBlogs] = useState([])
    const [text, setText] = useState("")
    

  useEffect(() => {
    if(text){
      FetchPage(text)
    }
    FetchPage(text)
  },[text])

  const FetchPage = async(queryIn) => {
    let query = `${encodeURIComponent(queryIn ?? "")}`;
    try{
      const res = await axios.get(`http://localhost:4001/trips?keywords=${query}`)
      if(res.status === 200){
        setBlogs(res.data.data)
      }
    } catch(err) {
      console.error("Error fetching products:", err);
    }
  }

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  
  return (
    
  <div className="flex flex-col items-center justify-center">
  <h1 className="text-blue-400 text-2xl mb-4">เที่ยวไหนดี</h1>
  <div className='w-full max-w-7xl'>
  <div className='flex flex-col gap-2'>
    <label className='text-sm font-medium text-gray-700'>ค้นหาที่เที่ยว</label>
    <Input 
      value={text}
      onChange={handleInputChange}
      placeholder="หาที่เที่ยวแล้วไปกัน"
      className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none px-0 py-2 text-base w-full"
    />
  </div>
</div>
  {blogs && blogs.map((blog, index) => (
    <div 
      key={blog?.id || index} 
      className="flex flex-row gap-6 items-start justify-center 
                 max-w-4xl w-full bg-white rounded-lg shadow-md p-4 mb-6"
    >
      {/* รูปใหญ่ */}
      <img 
        src={blog.photos[0]} 
        alt="blogImg" 
        className="w-[320px] h-[260px] object-cover rounded-lg"
      />

      {/* เนื้อหา */}
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-bold mb-2">{blog.title}</h1>
        <div className="flex flex-col gap-2">
          <div className="text-gray-600">
            {blog.description && blog.description.length > 100
              ? `${blog.description.substring(0, 100)}...`
              : blog.description}
          </div>
          <a 
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-800 underline text-sm self-start"
          >
            อ่านต่อ
          </a>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span>หมวด:</span>
          {blog.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="px-2 py-1 rounded text-sm underline">
              {tag}
            </span>
          ))}
        </div>

        {/* รูปเล็ก */}
        <div className="flex flex-row gap-7 mt-3">
          <img src={blog.photos[1]} alt="blogImg" className="w-24 h-24 object-cover rounded-md"/>
          <img src={blog.photos[2]} alt="blogImg" className="w-24 h-24 object-cover rounded-md"/>
          <img src={blog.photos[3]} alt="blogImg" className="w-24 h-24 object-cover rounded-md"/>
        </div>
      </div>
    </div>
  ))}
</div>

    
  )
}

export default LandingPage
