import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import counterReducer, { good, ok, bad, reset } from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const newState = counterReducer(undefined, { type: 'INIT' })
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, good())
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, ok())
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, bad())
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset returns to initial state', () => {
    const state = {
      good: 5,
      ok: 4,
      bad: 2
    }
    deepFreeze(state)
    const newState = counterReducer(state, reset())
    expect(newState).toEqual(initialState)
  })
})
