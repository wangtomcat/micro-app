import React from "react";
import { IRouteItem } from "@/options/router"
import { Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import NotFound from '@/components/NotFound'

const routerConfig: IRouteItem[] = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/detail',
    element: <Detail />
  },
  {
    path: "*",
    element: <NotFound />
  }
]

export default routerConfig