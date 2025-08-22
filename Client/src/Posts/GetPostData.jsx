import React from 'react'
import { useParams } from 'react-router'
import PostData from './PostData'

const GetPostData = () => {
    const params=useParams()
  
    const postdata=PostData.filter(post=>post.id==parseInt(params.postid))

  return (
    <div className='flex flex-col items-center h-full p-10'>
        {/* <div className=""> */}
            <h1 className='text-center font-bold text-2xl p-2'>{postdata[0].title}</h1>
            <img src={postdata[0].img} width={500}/>
            <p>{postdata[0].description}</p>
        {/* </div> */}
    </div>
  )
}

export default GetPostData
