import { ComponentType, FunctionComponent } from "react";

export type RoutesTypeSubmenu = {
  name: string;
  path: string;
  component: any;
  config: {
    key: string;
    icon: any;
    structure: "layout" | "nonlayout" | "student_layout";
    exact?: boolean;
    isMenu: boolean;
  };
};

export type RoutesTypeChildren = {
  name: string;
  path: string;
  component: any;
  config: {
    key: string;
    icon: any;
    structure: "layout" | "nonlayout" | "student_layout";
    exact?: boolean;
    isMenu: boolean;
  };
  submenu: Array<RoutesTypeSubmenu>;
};

export type RoutesType = {
  title: string;
  children: Array<RoutesTypeChildren>;
};
