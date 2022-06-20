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
