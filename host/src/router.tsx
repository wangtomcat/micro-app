import React from "react";
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'
import routerConfig from '@/config/router'
import BasicLayout from '@/layout/BasicLayout'

const Index = () => {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        {routerConfig.map((item, index) => <Route key={index} path={item.path} element={item.element} />)}
      </Route>
    </Routes>
  </HashRouter>
}

export default Index