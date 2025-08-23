import React from 'react'
import { useParams } from 'react-router'
import PostData from './PostData'

const GetPostData = () => {
    const params=useParams()
  
    const postdata=PostData.filter(post=>post.id==parseInt(params.postid))

  return (
    <div className='flex flex-col items-center h-full p-10'>
            <h1 className='text-center font-bold text-4xl p-2 font-mono'>{postdata[0].title}</h1>
            <img src={postdata[0].img} width={700}/>
            <p className='text-2xl font-serif mt-3'>{postdata[0].description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum veritatis quo eius non voluptatum adipisci excepturi inventore, dicta ea mollitia quasi ipsam id, iusto quod voluptatibus nesciunt. Nihil, omnis.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus suscipit dolore exercitationem quod repellat. Harum doloremque laudantium est vel illum, placeat ratione, dolor exercitationem autem nisi earum! A, provident error.\
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt assumenda autem aut sapiente magnam maiores modi nesciunt quasi, explicabo soluta non, distinctio voluptatem beatae error rerum fugiat consectetur dolores quidem!
            </p>
    </div>
  )
}

export default GetPostData
