import React from 'react';
import {MDBCard,MDBRow,MDBCol,MDBCardImage,MDBCardBody} from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';

const LatestBlog = ({imageUrl, title, id}) => {
  return (
    <div>
        <Link to={`/blog/${id}`}>
            <MDBCard  className="mt-2 hover-zoom">
                <MDBRow className='g-0'>
                    <MDBCol md='3' sm='3' xs="6" className='d-flex align-items-center'>
                        <MDBCardImage src={imageUrl} alt={title} fluid className='rounded-circle' style={{height:"6rem"}}/>
                    </MDBCol>
                    <MDBCol md='9'sm='9' xs="6">
                        <MDBCardBody>
                            <p className='text-start latest-title'>
                                 {title}
                            </p>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </Link>
    </div>
  )
}

export default LatestBlog