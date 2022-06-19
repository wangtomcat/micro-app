import React from "react";

import styles from './index.module.scss'

interface IProps {
  className?: string;
  style?: { [key: string]: string };
}

const Index = (props: IProps) => {
  const { className, style = {} } = props
  return <div className={`${styles.notFoundPageWrap} ${className}`} style={style}>404 Not Found</div>
}

export default Index