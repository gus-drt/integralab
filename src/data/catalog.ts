import type { Exercise } from '../types/content'
import { zeroExercises } from './zeroExercises'
import { primitiveExercises } from './primitiveExercises'
import { definedExercises } from './definedExercises'
import { techniqueExercises } from './techniqueExercises'
import { improperExercises } from './improperExercises'
import { applicationExercises } from './applicationExercises'
import { challengeExercises } from './challengeExercises'

export const allExercises: Exercise[] = [...zeroExercises, ...primitiveExercises, ...definedExercises, ...techniqueExercises, ...improperExercises, ...applicationExercises, ...challengeExercises]
export const exerciseById = Object.fromEntries(allExercises.map((exercise) => [exercise.id, exercise]))
