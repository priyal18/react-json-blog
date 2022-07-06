import React, {useEffect, useState} from 'react';
import {
  MDBValidation, MDBInput, MDBBtn,MDBTextArea
} from 'mdb-react-ui-kit';
import {useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAddBlogMutation,useUpdateBlogMutation } from '../services/blogApi';

//gnwnli7a

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
}

const options = ["Travel","Food","Fashion","Fitness","Sports","Tech"];


const AddEditBlog = () => {
  const [editMode,setEditMode] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState(null);
  const {title,description,category,imageUrl} = formValue;
  const navigate = useNavigate();
  const [addBlog, responseInfo] = useAddBlogMutation();
  const [updateBlog, updateResp] = useUpdateBlogMutation();

  const getDate = () =>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2,"0");
    let mm = String(today.getMonth()+1).padStart(2,"0"); //January is 0;
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  const {id} = useParams();

  useEffect(() => {
    if(id){
      setEditMode(true);
      getSingleBlog(id);
    }else{
      setEditMode(false);
      setFormValue({...initialState});
    }
  },[id]);

  const getSingleBlog = async(id) => {
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    if(singleBlog.status === 200){
    setFormValue({...singleBlog.data});
    }else{
      toast.error("Something went wrong");
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!category || category === "Please select a category"){
      setCategoryErrorMsg("Please select a valid category");
    }

    if(title && description && imageUrl && category){
      const currentDate = getDate();
      if(!editMode)
      {
        const updatedBlogData = {...formValue, date: currentDate, liked: false};
        console.log(updatedBlogData);
        await addBlog(updatedBlogData);
        //const response = await axios.post("http://localhost:5000/blogs",updatedBlogData);
        // if(response.status === 201){
        //   toast.success("Blog created successfully");
        // }else{
        //   toast.error("Something went wrong");
        // }
      }else{
        //const response = await axios.put(`http://localhost:5000/blogs/${id}`,formValue);
        await updateBlog({blog:formValue,id});
        console.log(updateResp);
         if(!updateResp.isError){
           toast.success("Blog updated successfully");
        }else{
           toast.error("Something went wrong");
        }
      }
      setFormValue({title: "",description:"",category: "",imageUrl: ""});
      navigate("/");
    }
  };

  const onCategoryChange = (e) => {
    if(e.target.value === "Please select a category")
    {
      setCategoryErrorMsg("Please select a valid category"); 
    }else{
      setCategoryErrorMsg(null);
    }
    console.log(categoryErrorMsg);
    setFormValue({...formValue, category:e.target.value});
  };

  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue,[name]:value});
  };

  const onUploadImage = (file) => {
    console.log("file",file);
    const formData = new FormData(); //Generates key value pair representing a form fill, we create a key value pair that can interact with our cloudnary api bcz hosting images
    //we can easily make a http request with form Data to api request
    formData.append("file",file);
    formData.append("upload_preset","gnwnli7a");
    axios.post("http://api.cloudinary.com/v1_1/dqp2hcuur/image/upload",formData).then((resp) => {
      console.log("response ", resp);
      toast.info("Image uploaded successfully");
      setFormValue({...formValue,imageUrl:resp.data.url});
    }).catch((err) => {
      toast.error("Something went wrong, try again");
    })
  };

  return (
    <MDBValidation className='row g-3' style={{marginTop:"100px"}} noValidate onSubmit = {handleSubmit}>
      <p className="fs-2 fw-bold">{editMode ? "Update Blog" : "Add Blog"}</p>
      <div 
        style = {{
          margin:"auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value = {title || ""} 
          name = "title"
          type = "text"
          onChange = { onInputChange }
          required
          label = "Title"
        >
          <div className="invalid-feedback">
            Please provide a title for your blog.
          </div>
        </MDBInput>
        <br/>
        
        <MDBTextArea
          value = {description || ""} 
          name = "description"
          type="textarea"
          onChange = { onInputChange }
          required
          label = "Description"
          rows = {5}
        >
          <div className="invalid-feedback">
          Please provide a description for your blog
          </div>
        </MDBTextArea>
        <br/>
        {!editMode && (
          <>
          <MDBInput
          name="image"
          type = "file"
          accept="image/*"
          onChange = {(e) => onUploadImage(e.target.files[0]) }
          required
          >
            <div className="invalid-feedback">
            Please provide a image for your blog
            </div>
          </MDBInput>
          <br/>
          </>
        )}
        
        <select className='categoryDropdown' onChange={onCategoryChange} value={category} placeholder="Please Select Category">
          <option>Please select a category</option>
          {options.map((option,index) => (
            <option value = {option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrorMsg && (
          <div className='categoryErrorMsg'>
            {categoryErrorMsg}
          </div>
        )}
        <br/>
        <br/>
        <MDBBtn type="submit" style={{marginRight:"10px"}}>{editMode ? "Update" : "Add"}</MDBBtn>
        <MDBBtn color="danger" style={{marginRight:"10px"}} onClick={() => navigate("/")}>GoBack</MDBBtn>
      </div>
    </MDBValidation>
  )
}

export default AddEditBlog;