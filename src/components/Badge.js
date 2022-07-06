import { toBeEnabled } from '@testing-library/jest-dom/dist/matchers'
import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

const Badge = ({children}) => {
    const colorKey = {
        Fashion : "primary",
        Travel : "success",
        Fitness : "danger",
        Food : "warning",
        Tech : "info",
        Sports: "dark"
    }
  return (
    <h5>
        <MDBBadge color = {colorKey[children]}>{children}</MDBBadge>
    </h5>
  )
}

export default Badge