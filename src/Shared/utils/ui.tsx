import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "../../assets/css/wrap-image.css";
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}
export const wrapOnchange = (fn: (val: any) => void) => (e: any) => {
  e.preventDefault();
  fn(e.target.value);
};
export const wrapClick = (fn: () => void) => (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  fn();
};

export const wrapImage = (img: JSX.Element) => {
  return <Zoom classDialog='custom-zoom' >{img}</Zoom>;
};
