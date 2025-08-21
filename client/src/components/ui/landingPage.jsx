import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
const landingPage = () => {
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
      console.log(res)
      if(res.status === 200){
        setBlogs(res)
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
  <Input 
    value={text}
    onChange={handleInputChange}
    className="mb-6 w-1/2"
  />

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
        className="w-64 h-40 object-cover rounded-lg"
      />

      {/* เนื้อหา */}
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-bold mb-2">{blog.title}</h1>
        <div className="flex flex-col gap-2">
          <div className={expandedDescriptions[blog?.id || index] ? '' : 'line-clamp-2'}>
            {blog.description}
          </div>
          <button 
            onClick={() => toggleDescription(blog?.id || index)}
            className="text-blue-400 hover:text-blue-800 underline text-sm self-start"
          >
            {expandedDescriptions[blog?.id || index] ? 'ย่อข้อความ' : 'อ่านต่อ'}
          </button>
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
        <div className="flex flex-row gap-2 mt-3">
          <img src={blog.photos[1]} alt="blogImg" className="w-20 h-20 object-cover rounded-md"/>
          <img src={blog.photos[2]} alt="blogImg" className="w-20 h-20 object-cover rounded-md"/>
          <img src={blog.photos[3]} alt="blogImg" className="w-20 h-20 object-cover rounded-md"/>
        </div>
      </div>
    </div>
  ))}
</div>

    
  )
}

export default landingPage
