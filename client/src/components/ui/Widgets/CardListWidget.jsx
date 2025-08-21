import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
const CardListWidget = ({ blogs, selectedTags, onTagClick }) => {
   
  return (
    <>
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
            <h1 className="text-lg font-bold mb-2 hover:underline"><a href={blog.url} target="_blank">{blog.title}</a></h1>
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
                <button
                  key={tagIndex}
                  onClick={() => onTagClick?.(tag)}
                  className={`px-2 py-1 rounded text-sm underline transition cursor-pointer ${
                    selectedTags.includes(tag) 
                      ? "bg-blue-100 text-blue-600" 
                      : "hover:text-blue-800"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* รูปเล็ก */}
            <div className="flex flex-row gap-15 mt-3">
              <div className='flex flex-row gap-7 mt-3'>
                  <img src={blog.photos[1]} alt="blogImg" className="w-24 h-24 object-cover rounded-md"/>
                  <img src={blog.photos[2]} alt="blogImg" className="w-24 h-24 object-cover rounded-md"/>
                  <img src={blog.photos[3]} alt="blogImg" className="w-24 h-24 object-cover rounded-md"/>
              </div>
              <button
                onClick={() => {
                    navigator.clipboard
                    .writeText(blog.url);
                    toast.success("คัดลอกลิงค์แล้ว")
                }}
                aria-label="คัดลอกลิงก์"
                className='cursor-pointer'
              >
                <img src="/copyImage.svg" alt="copy link"/>
              </button>
              <ToastContainer/>
            </div>
            
          </div>
        </div>
      ))}
      
    </>
  )
}

export default CardListWidget
