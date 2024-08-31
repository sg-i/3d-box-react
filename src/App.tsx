import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { BufferAttribute, BufferGeometry } from 'three';
import { Flex } from 'antd';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';
import { MyForm } from './components/MyForm';
import { MyCanvas } from './components/MyCanvas';
import { ThemeSwitcher } from './components/ThemeSwitcher';

const App: React.FC = () => {
  const initCubeSize = { length: 150, width: 100, height: 200 };
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);

  const updateCubeSize = useCallback((length: number, width: number, height: number) => {
    axios
      .post(
        'https://functions.yandexcloud.net/d4e68e2ke7uiv7ik58i4',
        JSON.stringify({ length, width, height }),
      )
      .then(({ data: { positions, normals, uvs } }) => {
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
        geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
        geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
        setGeometry(geometry);
      });
  }, []);

  useEffect(() => {
    const { length, width, height } = initCubeSize;
    updateCubeSize(length, width, height);
  }, [updateCubeSize]);

  return (
    <div className="app-layout">
      <Flex align="center" gap={15} vertical justify="center" className="sider">
        <ThemeSwitcher />
        <MyForm initCubeSize={initCubeSize} updateCubeSize={updateCubeSize} />
      </Flex>
      <Content className="content">
        <MyCanvas geometry={geometry} />
      </Content>
    </div>
  );
};

export default App;
