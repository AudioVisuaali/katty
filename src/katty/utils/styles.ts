import { Action, Animation, Size } from "../Animal";

const toPx = (size: number) => `${size}px`

export type MovementDirection = "left" | "right" | "neutral"

export type MovementSettings = {
  offsetX: number;
  duration: number;
}

type Params = {
  id: string;
  size: Size;
  animation: {
    sprite: string;
    duration: number;
    frames: number;
  }
  movement: {
    offsetX: number;
    duration: number;
  }
}

export const applyAnimalStyles = (params: Params) => {
  const percentages = [...new Array(params.animation.frames)].map((_, i) => Math.floor((i / params.animation.frames) * 100))

  return `
  .${params.id}::before {
    content: " ";
    position: absolute;
    height: ${toPx(params.size.height)};
    width: ${toPx(params.size.width)};
    top: ${toPx(-params.size.height)};
    background-image: url(${params.animation.sprite});
    background-size: ${toPx(params.size.width * params.animation.frames)} ${toPx(params.size.height)};
    transform: translateX(${params.movement.offsetX}px);
    animation-name: sprite;
    animation-duration: ${params.animation.duration}s;
    animation-iteration-count: infinite;
    animation-timing-function: step-end;
    transition-property: transform;
    transition-duration: ${params.movement.duration}s;
    transition-timing-function: linear;
  }
  
  @keyframes sprite {
    ${percentages.map((percentage, index) => `
    ${percentage}% {
      background-position: ${index * params.size.width}px 0px;
    }
    `).join("")}
  }
  `
}