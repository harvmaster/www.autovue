export function getScreens (state) {
  return {
    splitscreen: {
      left: state.splitscreen.left,
      right: state.splitscreen.right
    }
  }
}
