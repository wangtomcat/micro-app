import React from "react";
import { Outlet } from 'react-router-dom'
import HeaderLayout from '../HeaderLayout'
import MenuLayout from '../MenuLayout'

import './index.scss'

const Index = () => {
  return <div className="basic_layout_wrap">
    <div className="basic_header_wrap">
      <HeaderLayout />
    </div>
    <div className="basic_content_wrap">
      <div className="content_left_wrap">
        <MenuLayout />
      </div>
      <div className="content_main_wrap">
        <Outlet />
      </div>
    </div>
  </div>
}

export default Index