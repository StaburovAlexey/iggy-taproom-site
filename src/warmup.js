export async function warmupScene(renderer, scene, camera, targets = []) {
  if (!renderer || !scene || !camera) {
    return
  }
  const visibility = new Map()
  const items = Array.isArray(targets) ? targets : [targets]
  items.filter(Boolean).forEach((root) => {
    if (!root?.traverse) {
      return
    }
    root.traverse((child) => {
      if (!visibility.has(child)) {
        visibility.set(child, child.visible)
        child.visible = true
      }
    })
  })
  if (typeof renderer.compileAsync === 'function') {
    await renderer.compileAsync(scene, camera)
  } else if (typeof renderer.compile === 'function') {
    renderer.compile(scene, camera)
  }
  visibility.forEach((value, key) => {
    key.visible = value
  })
}
