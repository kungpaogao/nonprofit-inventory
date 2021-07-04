import { SvgIconComponent } from "@material-ui/icons";

export type Route = {
  icon?: SvgIconComponent;
  text?: string;
  path?: string;
  component?: React.LazyExoticComponent<() => JSX.Element>;
  divider?: boolean;
};
