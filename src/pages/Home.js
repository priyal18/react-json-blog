import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {MDBRow, MDBCol, MDBContainer, MDBTypography,MDBBtn} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Category from '../components/Category';
import LatestBlog from '../components/LatestBlog';
import Pagination from '../components/Pagination';
import {useNavigate} from "react-router-dom"
import { useGetBlogsQuery,useDeleteBlogMutation } from '../services/blogApi';

const Home = () => {
  const [blogData, setBlogData] = useState([])
  const {data, isFetching} = useGetBlogsQuery();
  const [deleteBlog,responseInfo] = useDeleteBlogMutation();
  const navigate = useNavigate();
  const [latestBlog,setLatestBlog] = useState([]);
  const [searchValue,setSearchValue] = useState([]);
  const [totalBlog,setTotalBlog] = useState(null);
  if(isFetching)
    return "Loading...";

  //Main for loading blogs
  const loadBlogsData = async() => {
    //const {data, isFetching} = useGetBlogsQuery();
    console.log("fd" ,data);
   // if(blog)
     // setData(blog);
    
  //   const response = await axios.get(`http://localhost:5000/blogs`);
  //  // console.log(response.data);
  //   if(response.status === 200){
  //      const temp = response.data;
  //      setData(temp);
       
  //     // console.log("dvd");
  //     // setData(response.data);
  //     //
  //   }else{
  //     toast.error("Something went wrong");
  //   }
    //  console.log(response.data);
    //  
  };

  
  //Delete blog
  const handleDelete = async(id) => {
    if(window.confirm("Are you sure that you want to delete that blog")){
       await deleteBlog(id);
       console.log(responseInfo);
    }
  };

  const excerpt = (str) => {
    if(str.length > 50){
      str = str.substring(0,50) + " ... ";
    }
    return str;
  };

  //on Search Input Change
  const onInputChange = (e) => {
    if(!e.target.value){
      loadBlogsData();
    }
    setSearchValue(e.target.value);
  }

  //Search Liked = true
  const handleSearchLikedBlogs = async(e) => {
    const liked = true;
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/blogs/?liked=${liked}`);
    if(response.status === 200){
      toast.success("Liked Blogs displayed successfully");
    }else{
      toast.error("Something went wrong");
    }
  }

  //Search
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/blogs/?q=${searchValue}`);
    if(response.status === 200){
    }else{
      toast.error("Something went wrong");
    }
  }

  //Latest Blogs
  const fetchLatestBlog = async() => {
    const totalBlogs = await axios.get('http://localhost:5000/blogs');
    setTotalBlog(totalBlogs.data.length);
    let start = 0;
    //console.log("start " + start + " toal "+totalBlogs.data.length);
    if(totalBlogs.data.length > 4)
    {
      //console.log("dvgcvhdvchgdv");
      start = totalBlogs.data.length - 4;
    }
    const end = totalBlogs.data.length;
    const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
    if(response.status === 200){
      setLatestBlog(response.data);
    }else{
      toast.error("Something went wrong");
    }
  }

  //Category
  const options = ["Travel","Food","Fashion","Fitness","Sports","Tech"];
  const handleCategory = async(category) => {
    const response = await axios.get(`http://localhost:5000/blogs/?category=${category}`);
    if(response.status === 200){
    }else{
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <MDBRow>
        <MDBCol md="3">
          <MDBBtn className='mt-3' type="submit" onClick={handleSearchLikedBlogs} color="primary">Liked Blogs</MDBBtn>
        </MDBCol>
        <MDBCol>
          <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className = "text-center mb-0" tag="h2">
            No blog found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data && data.map((item,index) => (
                <Blogs 
                  key = {index}
                  {...item}
                  excerpt = {excerpt}
                  handleDelete = {handleDelete}
                />
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol md="3" sm="12">
          <h4 className='text-start mt-2'>Latest Posts</h4>
          {latestBlog && latestBlog.map((item,index) => (
            <LatestBlog key={index} {...item}/>
          )).reverse()}
          <Category options={options} handleCategory = {handleCategory}/>
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default Home






















// import React, {useState,useEffect} from 'react'
// import axios from 'axios';
// import {MDBRow, MDBCol, MDBContainer, MDBTypography,MDBBtn} from 'mdb-react-ui-kit';
// import { toast } from 'react-toastify';
// import Blogs from '../components/Blogs';
// import Search from '../components/Search';
// import Category from '../components/Category';
// import LatestBlog from '../components/LatestBlog';
// import Pagination from '../components/Pagination';
// import {useNavigate} from "react-router-dom"
// import { useGetBlogsQuery,useDeleteBlogMutation } from '../services/blogApi';

// const Home = () => {
//   const [data, setData] = useState([])
//   const {data:blog, isFetching} = useGetBlogsQuery();
//   setData
//   const [deleteBlog,responseInfo] = useDeleteBlogMutation();
//   //console.log(res);
//   //console.log(useGetBlogsQuery());
//   const navigate = useNavigate();

 

//   const [latestBlog,setLatestBlog] = useState([]);
//  // const [data, setData] = useState([]);
//   const [searchValue,setSearchValue] = useState([]);
//   // const [currentPage,setCurrentPage] = useState(0);
//   // const [pageLimit,setPageLimit] = useState(6);
//   const [totalBlog,setTotalBlog] = useState(null);
//   //const [paginate, setPaginate] = useState(true);
//   // useEffect(() => {
//   //   // setPageLimit(6);
//   //   // loadBlogsData(0,pageLimit,0); // start end increase/decrease
//   //  // loadBlogsData();
//   //   fetchLatestBlog();
//   // }, [blog]);

//   if(isFetching)
//   return "Loading...";

//   // const loadBlogsData = async(start,end,increase, operation) => {
//   //   const totalBlogs = await axios.get('http://localhost:5000/blogs');
//   //   setTotalBlog(totalBlogs.data.length);
//   //   const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
//   //   console.log(response.data);
//   //   if(response.status === 200){
//   //      const temp = response.data;
//   //      setData(temp);
//   //      if(operation){
//   //        setCurrentPage(0);
//   //      }else{
//   //      setCurrentPage(currentPage+increase);
//   //      }
//   //      console.log(data);
//   //     // console.log("dvd");
//   //     // setData(response.data);
//   //     //
//   //   }else{
//   //     toast.error("Something went wrong");
//   //   }
//   //   //  console.log(response.data);
//   //   //  
//   // };

//   //Main for loading blogs
//   const loadBlogsData = async() => {
//     //const {data, isFetching} = useGetBlogsQuery();
//     console.log("fd" ,data);
//    // if(blog)
//      // setData(blog);
    
//   //   const response = await axios.get(`http://localhost:5000/blogs`);
//   //  // console.log(response.data);
//   //   if(response.status === 200){
//   //      const temp = response.data;
//   //      setData(temp);
       
//   //     // console.log("dvd");
//   //     // setData(response.data);
//   //     //
//   //   }else{
//   //     toast.error("Something went wrong");
//   //   }
//     //  console.log(response.data);
//     //  
//   };

  
//   //Delete blog
//   const handleDelete = async(id) => {
//     if(window.confirm("Are you sure that you want to delete that blog")){
//       //const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
//        await deleteBlog(id);
//        console.log(responseInfo);
//       // if(response.status === 200)
//       // {
//       //   toast.success("Blog deleted successfully");
//       //   //loadBlogsData(0,pageLimit,0,"delete");
//       //   loadBlogsData();
       
//       // }else{
//       //   toast.error("Something went wrong");
//       // }
//     }
//   };

//   const excerpt = (str) => {
//     if(str.length > 50){
//       str = str.substring(0,50) + " ... ";
//     }
//     return str;
//   };

//   //on Search Input Change
//   const onInputChange = (e) => {
//     if(!e.target.value){
//       loadBlogsData();
//     }
//     setSearchValue(e.target.value);
//   }

//   //Search Liked = true
//   const handleSearchLikedBlogs = async(e) => {
//     const liked = true;
//     e.preventDefault();
//     const response = await axios.get(`http://localhost:5000/blogs/?liked=${liked}`);
//     if(response.status === 200){
//       toast.success("Liked Blogs displayed successfully");
//       //setPaginate(false);
//      // setData(response.data);
//     }else{
//       toast.error("Something went wrong");
//     }
//   }

//   //Search
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const response = await axios.get(`http://localhost:5000/blogs/?q=${searchValue}`);
//     if(response.status === 200){
      
//      // setPaginate(false);
    
//      // setData(response.data);
//     }else{
//       toast.error("Something went wrong");
//     }
//   }

//   //Latest Blogs
//   const fetchLatestBlog = async() => {
//     const totalBlogs = await axios.get('http://localhost:5000/blogs');
//     setTotalBlog(totalBlogs.data.length);
//     let start = 0;
//     //console.log("start " + start + " toal "+totalBlogs.data.length);
//     if(totalBlogs.data.length > 4)
//     {
//       //console.log("dvgcvhdvchgdv");
//       start = totalBlogs.data.length - 4;
//     }
//     const end = totalBlogs.data.length;
//     const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
//     if(response.status === 200){
//       setLatestBlog(response.data);
//     }else{
//       toast.error("Something went wrong");
//     }
//   }

//   //Category
//   const options = ["Travel","Food","Fashion","Fitness","Sports","Tech"];
//   const handleCategory = async(category) => {
//     const response = await axios.get(`http://localhost:5000/blogs/?category=${category}`);
//     if(response.status === 200){
//      // setPaginate(false);
//       //setData(response.data);
//     }else{
//       toast.error("Something went wrong");
//     }
//   }

//   return (
//     <>
//       <MDBRow>
//         <MDBCol md="3">
//           <MDBBtn className='mt-3' type="submit" onClick={handleSearchLikedBlogs} color="primary">Liked Blogs</MDBBtn>
//         </MDBCol>
//         <MDBCol>
//           <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/>
//         </MDBCol>
//       </MDBRow>
//       <MDBRow>
//         {data.length === 0 && (
//           <MDBTypography className = "text-center mb-0" tag="h2">
//             No blog found
//           </MDBTypography>
//         )}
//         <MDBCol>
//           <MDBContainer>
//             <MDBRow>
//               {data && data.map((item,index) => (
//                 <Blogs 
//                   key = {index}
//                   {...item}
//                   excerpt = {excerpt}
//                   handleDelete = {handleDelete}
//                 />
//               ))}
//             </MDBRow>
//           </MDBContainer>
//         </MDBCol>
//         <MDBCol md="3" sm="12">
//           <h4 className='text-start mt-2'>Latest Posts</h4>
//           {latestBlog && latestBlog.map((item,index) => (
//             <LatestBlog key={index} {...item}/>
//           )).reverse()}
//           <Category options={options} handleCategory = {handleCategory}/>
//         </MDBCol>
//       </MDBRow>
//       {/* <div className='mt-3'>
//         {paginate && <Pagination currentPage={currentPage} loadBlogsData={loadBlogsData} data={data} pageLimit={pageLimit} totalBlog = {totalBlog}/>}
//       </div> */}
//     </>
//   )
// }

// export default Home