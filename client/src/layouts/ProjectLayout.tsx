import React from 'react'
import { Outlet } from 'react-router-dom'
import HiddenNavbar from "../components/HiddenNavbar"

function ProjectLayout() {
  return (
    <>
        <HiddenNavbar />
        <Outlet />
    </>
  )
}

export default ProjectLayout
