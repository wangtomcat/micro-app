import React from "react";
import loadComponent from "./loadComponent";
import { useDynamicScript } from "./hooks";
import NotFound from '@/components/NotFound'

interface IProps {
  url: string, // 微应用地址
  scope: string; // 微应用名称
  module: string; // 微应用抛出的模块
  moduleProps?: object; // 透传下去的props
}

export default function System(props: IProps) {
  const { url, scope, module, moduleProps = {} } = props
  const { ready, failed } = useDynamicScript({
    url: url,
  });

  if (!url) {
    return <h2>Not specified</h2>;
  }

  if (!ready) {
    // return <h2>Loading dynamic script: {url}</h2>;
    return null;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(scope, module)
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component {...moduleProps} />
    </React.Suspense>
  );
}