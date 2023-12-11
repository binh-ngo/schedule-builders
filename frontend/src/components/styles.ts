import { MouseEvent } from "react";

export const buttonStyle = {
  backgroundColor: 'black',
  borderColor: 'transparent',
  transition: 'box-shadow 0.3s',
  fontFamily: 'Lato',
  border: '2px solid white',
  color: 'white'
}

export const iconBarCaptionStyle = {
  textDecoration: 'none',
  color: 'inherit',
}

export const iconMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.backgroundColor = '#ffffbf';
}

export const iconMouseOut = (e: MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.backgroundColor = 'white';
}

export const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.backgroundColor = '#F6E71D';
  e.currentTarget.style.color = 'black';
  e.currentTarget.style.border = '2px solid black';
};

export const handleMouseOut = (e: MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.backgroundColor = 'black';
  e.currentTarget.style.color = 'white';
  e.currentTarget.style.border = '2px solid white';

};