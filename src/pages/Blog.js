import React, { useEffect,useState } from 'react'
import {MDBIcon,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardText,MDBCardTitle,MDBCardBody,MDBCardImage,MDBTypography,MDBBtn} from 'mdb-react-ui-kit';
import {Link,useParams} from "react-router-dom";
import axios from 'axios';
import Badge from '../components/Badge';
import { toast } from 'react-toastify';

import {useUpdateBlogMutation } from '../services/blogApi';


const Blog = () => {
  const [blog, setBlog] = useState();
  const [liked,setLiked] = useState(false);
  const [relatedPost,setRelatedPost] = useState([]);
  const {id} = useParams();
  const [updateBlog,responseInfo] = useUpdateBlogMutation();

  useEffect(() => {
    if(id){
      getSingleBlog();
    }
  },[id]);

  const getSingleBlog = async() => {
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    const relatedPostData = await axios.get(`http://localhost:5000/blogs/?category=${singleBlog.data.category}`);

    if(relatedPostData.status === 200){
      setRelatedPost(relatedPostData.data) ;
    }
    if(singleBlog.status === 200){
    setBlog(singleBlog.data);
    setLiked(singleBlog.data.liked);
    console.log(singleBlog.data.liked);
    }else{
      toast.error("Something went wrong");
    }
  };

  const handleLiked = async(e) => {
    const like = !liked;
    setLiked(like);
    const updatedBlogData = {...blog,liked:like};
    // console.log(updatedBlogData);
    const id = blog.id;
    // const response = await axios.put(`http://localhost:5000/blogs/${id}`,updatedBlogData);
    await updateBlog({blog:updatedBlogData,id});
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    if(singleBlog.status === 200)
     setBlog(singleBlog.data);
    else{
      toast.error("Something went wrong");
    }
  };

  const excerpt = (str) => {
    if(str.length > 50){
      str = str.substring(0,50) + " ... ";
    }
    return str;
  };

  const styleInfo = {
    display : "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px"
  }

  return (
    <MDBContainer style={{border: "1px solid #d1ebe8"}}>
      <Link to="/">
        <strong className='mt-3' style={{float:"left",color:"black"}}>
          Go Back
        </strong>
      </Link>
      <MDBTypography tag="h2" className="text-muted mt-2" style={{display: "inline-block"}}>
        {blog && blog.title}
      </MDBTypography>
      
      <img src = {blog && blog.imageUrl} className="img-fluid rounded" alt = {blog && blog.title} style = {{width: "100%", maxHeight: "600px"}}/>
      <div style={{marginTop: "20px"}}>
        <div style={{height: "43px",background: "#f6f6f6"}}>
          <MDBIcon
            style={{float:"left"}}
            className = "mt-3"
            far
            icon = "calendar-alt"
            size = "lg"
          />
          <strong style={{float:"left", marginTop:"12px",marginLeft:"2px"}}>
            {blog && blog.date}
          </strong>
          
          <MDBBtn onClick={handleLiked}>{blog && liked && (<strong>UnLike</strong>)} {blog && !liked && <strong>Like</strong>}</MDBBtn>
           
          <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
        </div>
        <MDBTypography className="lead mb-5 mt-5 lh-base" style={{textAlign:'justify'}}>

          {blog && blog.description}
        </MDBTypography>
      </div>
      {relatedPost && relatedPost.length>0 && (
        <>
        {relatedPost.length>1 && (
          <h1>Related Post</h1>
        )}
        
        <MDBRow className="row-cols-1 row-cols-md-3 g-4">
          {relatedPost.filter((item)=>item.id != id).map((item,index) => (
            <MDBCol key={index}>
              <MDBCard>
                <Link to={`/blog/${item.id}`}>
                  <MDBCardImage 
                    src={item.imageUrl}
                    alt={item.title}
                    position = "top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{item.title}</MDBCardTitle>
                    <MDBCardText>{excerpt(item.description)}</MDBCardText>
                  </MDBCardBody>
                </Link>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
        </>
      )}
    </MDBContainer>
  )
}

export default Blog