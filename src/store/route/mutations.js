export function setScreen (state, payload) {
  const splitscreen = state.splitscreen
  // Read that this doesnt work in previous code, will leave her for testing purposes once I have test infrastructure prepared
  // state.splitscreen = { splitscreen, ...payload }

  // Individiually setting values as overwriting with objects creates issues with vue's reactivty. (Based off comment from gameshow project)
  state.splitscreen.left = payload?.left || splitscreen.left
  state.splitscreen.right = payload?.right || splitscreen.right

  return state
}
