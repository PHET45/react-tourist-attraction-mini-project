import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import HeaderWidget from '@/components/ui/Widgets/HeaderWidget'
import CardListWidget from '@/components/ui/Widgets/CardListWidget'


const LandingPage = () => {
  const [blogs, setBlogs] = useState([])
  const [text, setText] = useState("")
  const [selectedTags, setSelectedTags] = useState([])

  const debouncedFetch = useMemo(() => debounce((q) => {
    FetchPage(q)
  }, 400), [])

  useEffect(() => {
    if (text) {
      debouncedFetch(text)
    } else {
      FetchPage()
    }
    return () => debouncedFetch.cancel()
  }, [text, debouncedFetch])

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

  const handleTagClick = (tag) => {
    setSelectedTags((prev) => {
      let newTags
      if (prev.includes(tag)) {
        newTags = prev.filter((t) => t !== tag)
      } else {
        newTags = [...prev, tag]
      }
      setText(newTags.join(" "))
      return newTags
    })
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeaderWidget
        text={text}
        onTextChange={setText}
      />
      <CardListWidget
        blogs={blogs}
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
      />
    </div>
  )
}

export default LandingPage
