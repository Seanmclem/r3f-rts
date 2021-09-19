import { ThreeEvent, useFrame } from "@react-three/fiber";
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
    position,
    setSelectedNodeUid,
    handleSetPositions,
    destination,
    selectedNodeUid,
}: {
    villager: VillagerData;
    position: Vector3;
    setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleSetPositions: (
        position: Vector3 | undefined, 
        nodeToMove?: string | undefined,
        isPositionOnly?: boolean,
    ) => void;
    destination?: Vector3;
    selectedNodeUid?: string;
}) => {
    const size = 2;
    const selected = villager.uid === selectedNodeUid;
    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        setSelectedNodeUid(villager.uid)
    }

    useFrame(() => {
        destination && console.log({ destination })
        if (destination) {
            if (destination !== position) { // here is where we move the villager
                console.log("trying to move the villager")
                console.log({ destination, position })

                const isPositionOnly = true
                // const reachedDestination = postion >= 

                handleSetPositions(destination, villager.uid, isPositionOnly)
                console.log("I think I moved the villager")
            } else {
                handleSetPositions(undefined, villager.uid)
            }
        }
    });

    return (
        <mesh
            position={[position.x as number, size / 2 + 0.0001, position.z]}
            onClick={handleClick}
        >
            <boxGeometry args={[size, size, size]} />
            <meshBasicMaterial color={selected ? "blue" : "gray"} />
        </mesh>
    );
};