import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MyBox } from './MyBox';
import { BufferGeometry, NormalBufferAttributes } from 'three';

interface MyCanvasProps {
  geometry: BufferGeometry<NormalBufferAttributes> | null;
}

export const MyCanvas = ({ geometry }: MyCanvasProps) => {
  return (
    <Canvas shadows camera={{ position: [-5, 5, 5], fov: 50 }} style={{ height: '100vh' }}>
      <spotLight
        castShadow
        position={[1000, 400, 300]}
        angle={1}
        penumbra={1}
        decay={0}
        intensity={1.5}
      />
      <spotLight
        castShadow
        position={[-1000, -400, 150]}
        angle={0.7}
        penumbra={1}
        decay={0}
        intensity={1.5}
      />
      <ambientLight intensity={0.8} />

      {geometry && <MyBox geometry={geometry} />}

      <OrbitControls />
    </Canvas>
  );
};
