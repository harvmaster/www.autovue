export function setDevice (state, payload) {
  state.device = payload.device

  return state
}

// Null check is used to reset the player on disconnect
export function updatePlayer (state, payload) {
  if (!payload.player) return state.player = {}

  const positionUpdate = state.player.position != payload.player.position
  const lastUpdate = positionUpdate ? Date.now() : state.player.lastUpdate
  state.player = { ...state.player, ...payload.player, ...{ lastUpdate } }
}
