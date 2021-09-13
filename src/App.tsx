import { Canvas, extend } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { OrbitControls, TransformControls } from 'three-stdlib'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OrbitControls } from 'three-stdlib/controls/OrbitControls'
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// extend({ OrbitControls })

const Box = () => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export const App = () => {
  return (
    <div className="canvas-container">
      <Canvas>
        {/* <orbitControls /> */}
        {/* <OrbitControls enableDamping /> */}
        <ambientLight intesnsity={0.1} />
        <directionalLight position={[0, 0, 5]} color={"red"} />
        <Box />
      </Canvas>
    </div>
  );
};

export default App;
