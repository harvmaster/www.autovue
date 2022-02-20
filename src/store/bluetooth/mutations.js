export function setDevice (state, payload) {
  state.device = payload.device

  return state
}

export function updatePlayer (state, payload) {
  state.player = { ...state.player, ...payload.player }
}
