declare module "*.module.scss" {
  const classes: {
    [key: string]: string;
  };
  export default classes;
}

interface Window {
  init: Function;
  get: Function;
}

declare function __webpack_init_sharing__(params: string): Promise<any>;

declare var __webpack_share_scopes__: any;
