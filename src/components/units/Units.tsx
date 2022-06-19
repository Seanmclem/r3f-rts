/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useGameDataStore } from "../../stores/game-data-store";
import { VillagerComponent } from "../villager/Villager";
import {} from "./units-service";

interface props {}

export const Units: React.FC<props> = () => {
  const villagers = useGameDataStore((state) =>
    state.units.filter((unit) => unit.classType === "VILLAGER")
  );

  //   const [villagers, setVillagers] = useState<VillagerProps[]>([box1, box2]);
  //   const [selectedNodeUid, setSelectedNodeUid] = useState<string | undefined>();

  //   const handleReachDestination = (specificNodeUid: string) => {
  //     reachDestination(specificNodeUid, villagers, setVillagers);
  //   };

  //   const handleClick = (event: any) => {
  //     if (event.type === "click") {
  //       setSelectedNodeUid(undefined);
  //     } else if (event.type === "contextmenu") {
  //       const     destination: Vector3 = event.intersections[0].point;
  //       console.log({ destination });
  //       // setPosition(destination);
  //       handleInitiateMoving(destination);
  //     }
  //   };

  //   const handleInitiateMoving = (destinationPosition: Vector3) => {
  //     selectedNodeUid &&
  //       initiateMoving(
  //         selectedNodeUid,
  //         destinationPosition,
  //         villagers,
  //         setVillagers
  //       );
  //   };

  return (
    <>
      {villagers?.length
        ? villagers.map((villager) => (
            <VillagerComponent key={villager.uid} {...villager} />
          ))
        : null}
    </>
  );
};
