import React from "react";
import { useLocation } from "react-router-dom"

import './index.scss'

interface IMenu {
  path: string;
  name: string;
}

const Menu: IMenu[] = [
  {
    path: "/home",
    name: 'remote-home'
  },
  {
    path: "/detail",
    name: "remote-detail"
  }
]

const Index = () => {
  const { pathname } = useLocation()
  return <div className="menu_layout_wrap">
    {Menu.map((item, index) => <span onClick={() => location.hash = item.path} key={index} className={`meunItems ${item.path === pathname ? 'active' : ""}`}>{item.name}</span>)}
  </div>
}

export default Index