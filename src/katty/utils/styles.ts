export const applyAnimalStyles = (id: string, image: string) => `
.${id}::before {
  content: " ";
  position: absolute;
  height: 64px;
  width: 64px;
  top: -64px;
  left: 20px;
  background-image: url("${image}");
  background-size: 128px 64px;
  image-rendering: -webkit-optimize-contrast;
  animation-name: sprite;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
}

@keyframes sprite {
  0% {
    background-position: 0px 0px;
  }
  50%  {
    background-position: 64px 0px;
  }
}
`