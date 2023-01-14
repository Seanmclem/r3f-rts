# R3F RTS

Idk. It might be an RTS one day. Built with React Three Fiber

## To-dos

- [x] Teleporting worker
- [x] better camera
- [ ] implement a way for a villager to check/update grid-data ... via `useGameDataStore > gridData`
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
