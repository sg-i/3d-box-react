import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { theme } from 'antd';
import { BufferGeometry, Mesh } from 'three';

const { useToken } = theme;

interface MyBoxProps {
  geometry: BufferGeometry | undefined;
}

export const MyBox: React.FC<MyBoxProps> = ({ geometry }) => {
  const cubeRef = useRef<Mesh>(null!);

  // Получаем токен темы
  const { token } = useToken();

  // Используем useMemo для оптимизации, если token изменяется
  const color = useMemo(() => token.colorFillContent, [token]);

  // Обновляем вращение куба
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh
      ref={cubeRef}
      scale={0.02}
      castShadow
      receiveShadow
      position={[0, 0, 0]}
      geometry={geometry}>
      <meshLambertMaterial color={color} />
    </mesh>
  );
};
