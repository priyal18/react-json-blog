import React from 'react';
import {MDBCard, MDBListGroup, MDBListGroupItem} from 'mdb-react-ui-kit';

const Category = ({handleCategory, options}) => {
  
  return (
    <MDBCard style={{width: "14rem",marginTop:"20px"}}>
        <h4>Categories</h4>
        <MDBListGroup >
            {options.map((item,index) => (
                <MDBListGroupItem key = {index} style={{cursor:"pointer"}} action onClick={() => handleCategory(item)}>
                    {item}
                </MDBListGroupItem>
            ))}
        </MDBListGroup>
    </MDBCard>
  )
}

export default Category