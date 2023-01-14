# R3F RTS

Idk. It might be an RTS one day. Built with React Three Fiber

## To-dos

- [x] Teleporting worker
- [x] better camera
- [ ] implement a way for a villager to check/update grid-data ... via `useGameDataStore > gridData`
  - [ ] added grid coordinates to on-context-click of the grid-cubes
  - [ ] need to already-have/set current-cube-coordinates for a villager/unit at START/initialization. That way, when a cube moves, it already knows its current-cube, and next-cube. Then, the next-cube always becomes the current-cube _after_ the move-action is completed
    - [ ] initial_cube is always already set on the initial-cube-data. populates in the component as the current_cube state. move-path goes from cube-center to cube-center
    - [ ] current-cube only important for path-finding
    - [ ] Still want to start storing edge coordinates on grid-cubes
- [ ] NEW Above
- [ ] OLD Below
- [ ] Worker management
  - [ ] Add buildings
    - [ ] "Collide" with buildings ... needs useBox for collision
    - [ ] Needs generic container for multiple building types
    - [ ] Needs to trigger hud only on-click
  - [ ] create worker from menu, via click on TC
  - [ ] UI for building/unit actions
  - [x] listing
  - [x] selecting
- [x] Walking worker
  - [x] Spread new position/destination copy values, to prevent referential-equality
  - [x] walk to x point
  - [x] walk to z after
  - [ ] connect animations
- [ ] Resources Hud (Top)
  - [ ] add trees, individual/groups
  - [ ] Gather resources
  - [ ] deposit resources
