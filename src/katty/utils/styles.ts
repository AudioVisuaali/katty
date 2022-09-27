import { ActionAnimation, Size } from "../Animal";

const toPx = (size: number) => `${size}px`

type MovementSettings = {
  offsetX: number;
  duration: number;
}

export const applyAnimalStyles = (id: string, size: Size, animation: ActionAnimation, movement: MovementSettings) => {
  const percentages = [...new Array(animation.frames)].map((_, i) => Math.floor((i / animation.frames) * 100))

  return `
  .${id}::before {
    content: " ";
    position: absolute;
    height: ${toPx(size.height)};
    width: ${toPx(size.width)};
    top: ${toPx(-size.width)};
    transform: translateX(${movement.offsetX}px);
    background-image: url("${animation.sprite}");
    background-size: ${toPx(size.width * animation.frames)} ${toPx(size.height)};
    animation-name: sprite;
    animation-duration: ${animation.duration}s;
    animation-iteration-count: infinite;
    animation-timing-function: step-end;
    transition-property: transform;
    transition-duration: ${movement.duration}s;
    transition-timing-function: linear;
  }
  
  @keyframes sprite {
    ${percentages.map((percentage, index) => `
    ${percentage}% {
      background-position: ${index * size.width}px 0px;
    }
    `).join("")}
  }
  `
}