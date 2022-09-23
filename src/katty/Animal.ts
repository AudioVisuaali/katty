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

type DurationRandom = { min: number, max: number }
type DurationFixed = number
export type Duration = DurationRandom | DurationFixed

type NextAllowedAction = {
  name: string;
  possibility: number;
}

export type ActionAnimation = {
  frames: number;
  duration: Duration;
  sprite: string;
}

type ActionBase<T extends ActionType> = {
  name: string;
  type: T;
  nextActions: NextAllowedAction[];
  animation: ActionAnimation;
}

export type ActionMove = ActionBase<ActionTypeMovement> & {
  pxPerSecond: number;
}

export type ActionIdle = ActionBase<ActionTypeIdle>

type Action = ActionMove | ActionIdle

const mathRandomInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

type Params = {
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
  private timeoutId: number | null = null;

  // Elements
  private element: HTMLElement;
  private styleElement: HTMLStyleElement | null = null;

  constructor(params: Params) {
    this.id = `katty-${new Date().getTime().toString()}`;
    
    this.positionOffset = 0;
    this.actions = params.actions;
    this.element = params.element;
    this.size = params.size;
  }

  private getNExtBoringRoutineByNext(nextActions: NextAllowedAction[]): Action {
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

    return this.getNExtBoringRoutineByNext(this.currentAction.nextActions)
  }
  
  private getDuration(duration: Duration): number {
    if (typeof duration === "number") {
      return duration;
    }

    return Math.floor(Math.random() * (duration.max - duration.min + 1) + duration.min);
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

    const duration = durationOverride === null ? this.getDuration(action.animation.duration) * 1000 : durationOverride * 1000;
    this.timeoutId = setTimeout(this.switchBoringRoutine, duration)
  }

  private getOffsetPosition(action: Action) {
    if (action.type !== "movement") {
      return {
        offsetX: this.positionOffset,
        duration: 0,
      }
    }
    
    const currentPosition = this.positionOffset;
    const width = this.element.getBoundingClientRect().width
    const newPosition = mathRandomInterval(0, width - this.size.width)
    const positionDiff = Math.abs(newPosition - currentPosition) 
    const positionDiffInSeconds = positionDiff / action.pxPerSecond;
    this.positionOffset = newPosition;

    return {
      offsetX: newPosition,
      duration: positionDiffInSeconds,
    }
  }

  private setLimbMovement(action: Action): number | null {
    const prevStyleElement = this.styleElement;

    const offset = this.getOffsetPosition(action)

    const document = ownerDocument(null);
    this.styleElement = document.head.appendChild(document.createElement("style"));
    this.styleElement.innerHTML = applyAnimalStyles(this.id, this.size, action.animation, offset);
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
