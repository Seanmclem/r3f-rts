import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";
import { VillagerProps as VillagerData } from "./shared/types";
import { EmptyInventory } from "./shared/utils";

export const box1: VillagerData = {
    uid: "fddsfsdfdsf",
    position: new Vector3(9, 0, 0),
    inventory: EmptyInventory,
    status: "standing",
};

export const box2: VillagerData = {
    uid: "f1234567dfdsf",
    position: new Vector3(1, 0, 0),
    inventory: EmptyInventory,
    status: "standing",

};

export const VillagerComponent = ({
    villager,
    // initialPosition,
    setSelectedNodeUid,
    selectedNodeUid,
}: {
    villager: VillagerData;
    // initialPosition: Vector3;
    setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedNodeUid?: string;
}) => {
    const size = 2;
    const selected = villager.uid === selectedNodeUid;
    const [ currentPosition, setCurrentPosition ] = useState(villager.position)

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        setSelectedNodeUid(villager.uid)

    }

    useFrame(() => {
        // setCurrentPosition()
    });

    return (
        <mesh
            position={[
                currentPosition.x as number,
                size / 2 + 0.0001,
                currentPosition.z
            ]}
            onClick={handleClick}
        >
            <boxGeometry args={[size, size, size]} />
            <meshBasicMaterial color={selected ? "blue" : "gray"} />
        </mesh>
    );
};