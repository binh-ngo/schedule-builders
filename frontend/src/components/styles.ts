import { MouseEvent } from "react";

export const buttonStyle = {
  backgroundColor: 'black',
  borderColor: 'transparent',
  transition: 'box-shadow 0.3s',
  fontFamily: 'Lato'
}

export const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.boxShadow = '0px 1px 15px #F6E71D';
};

export const handleMouseOut = (e: MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.boxShadow = 'none';
};