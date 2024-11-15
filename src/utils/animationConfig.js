import { DIRECTION } from '@/utils/direction.js'

const DURATION = 1

export const animationConfig = {
  inactive: {
    [DIRECTION.PREV]: {
      duration: DURATION,
      yPercent: 100,
    },
    [DIRECTION.NEXT]: {
      duration: DURATION,
      rotationX: 70,
      yPercent: -100,
      autoAlpha: 0,
      transformOrigin: 'center bottom',
    },
  },
  active: {
    [DIRECTION.PREV]: {
      from: { yPercent: -100, rotationX: 70, autoAlpha: 0 },
      to: { yPercent: 0, rotationX: 0, autoAlpha: 1, duration: DURATION },
    },
    [DIRECTION.NEXT]: {
      from: { yPercent: 100, rotationX: 0, autoAlpha: 1 },
      to: { yPercent: 0, duration: DURATION },
    },
  },
}
