export function setDevice (state, payload) {
  state.device = payload.device

  return state
}

export function updatePlayer (state, payload) {
  const positionUpdate = state.player.position != payload.player.position
  const lastUpdate = positionUpdate ? Date.now() : state.player.lastUpdate
  state.player = { ...state.player, ...payload.player, ...{ lastUpdate } }
}
