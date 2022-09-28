/* eslint-disable no-param-reassign */
import { ownerDocument } from "./utils/ownerDocument";
import { applyAnimalStyles } from "./utils/styles";

export type ActionTypeMovement = "movement";
export type ActionTypeIdle = "idle";
export type ActionType = ActionTypeMovement | ActionTypeIdle;

export type Size = {
  width: number;
  height: number;
}

export type Duration = number

type NextAllowedAction = {
  name: string;
  possibility: number;
}

type AnimationBase = {
  frames: number;
  size: Size;
  duration: Duration;
}

type AnimationIdle = AnimationBase & {
  sprite: string;
}

type AnimationMove = AnimationBase & {
  spriteRight: string;
  spriteLeft: string;
  pxPerSecond: number;
}

export type Animation = AnimationIdle | AnimationMove

type ActionBase<T extends ActionType> = {
  name: string;
  type: T;
  nextActions: NextAllowedAction[];
}

export type ActionMove = ActionBase<ActionTypeMovement> & {
  animation: AnimationMove;
}

export type ActionIdle = ActionBase<ActionTypeIdle> & {
  duration: number;
  animation: AnimationIdle;
}

export type Action = ActionMove | ActionIdle

export type MovementMeta = {
  offsetX: number;
  duration: number;
  direction: number
}

const mathRandomInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export type AnimalOptions = {
  actions: Action[];
  size: Size;
  element: HTMLElement;
}

export class Animal {
  // Properties
  public id : string;
  private size: Size;
  private positionOffset: number = 0;

  // Actions
  public actions: Action[]
  private currentAction: Action | null = null;
  private timeoutId: NodeJS.Timeout | null = null;

  // Elements
  private element: HTMLElement;
  private styleElement: HTMLStyleElement | null = null;

  constructor(params: AnimalOptions) {
    this.id = `katty-${new Date().getTime().toString()}`;
    
    this.positionOffset = 0;
    this.actions = params.actions;
    this.element = params.element;
    this.size = params.size;
  }

  private getNextBoringRoutineByNext(nextActions: NextAllowedAction[]): Action {
    const totalPossibility = nextActions.reduce((prev,curr) => prev + curr.possibility, 0)
    const value = mathRandomInterval(0, totalPossibility)

    let currentTotal = 0;
    for (const nextAction of nextActions) {
      currentTotal += nextAction.possibility
      if (currentTotal < value) {
        continue
      }

      const action = this.actions.find(action => action.name === nextAction.name);

      if (!action) {
        throw new Error("Invalid next function name provided")
      }

      return action;
    }

    throw new Error("Should not happen")
  }

  private getNextBoringRoutine(): Action {
    if (!this.currentAction) {
      const newAction = this.actions[Math.floor(Math.random() * this.actions.length)]
      this.currentAction = newAction
      return this.currentAction
    }

    return this.getNextBoringRoutineByNext(this.currentAction.nextActions)
  }

  public startLiving() {
    this.switchBoringRoutine()
  }

  private switchBoringRoutine = () => {
    const action = this.getNextBoringRoutine();
    if (!action) {
      return this.murderBrutally()
    }

    this.currentAction = action;
    const durationOverride = this.setLimbMovement(action)

    const duration = action.type === "idle" ? action.duration * 1000 : (durationOverride ?? action.animation.duration) * 1000;
    this.timeoutId = setTimeout(this.switchBoringRoutine, duration)
  }

  private getOffsetPosition(action: Action): MovementMeta {
    if (action.type !== "movement") {
      return {
        offsetX: this.positionOffset,
        duration: 0,
        direction: 0
      }
    }
    
    const currentPosition = this.positionOffset;
    const width = this.element.getBoundingClientRect().width
    const newPosition = mathRandomInterval(0, width - this.size.width)
    const positionDiffNonAbs = newPosition - currentPosition
    const positionDiff = Math.abs(positionDiffNonAbs) 
    const positionDiffInSeconds = positionDiff / action.animation.pxPerSecond;
    this.positionOffset = newPosition;

    return {
      offsetX: newPosition,
      duration: positionDiffInSeconds,
      direction: positionDiffNonAbs,
    }
  }

  private setLimbMovement(action: Action): number | null {
    const prevStyleElement = this.styleElement;

    const offset = this.getOffsetPosition(action)

    const document = ownerDocument(null);
    this.styleElement = document.head.appendChild(document.createElement("style"));
    this.styleElement.innerHTML = applyAnimalStyles({
      id: this.id,
      size: this.size,
      animation: {
        sprite: action.type === "idle" ? action.animation.sprite : offset.direction < 0 ? action.animation.spriteLeft : action.animation.spriteRight,
        duration: action.animation.duration,
        frames: action.animation.frames,
      },
      movement: {
        offsetX: offset.offsetX,
        duration: offset.duration,
      }
    })
    this.element.classList.add(this.id);

    if (prevStyleElement) {
      prevStyleElement.remove();
    }

    if (action.type === "movement") {
      return offset.duration;
    }

    return null
  }

  public murderBrutally(): void {
    if (this.styleElement) {
      this.styleElement.remove()
      this.styleElement = null;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.element.classList.remove(this.id)
  }
}
