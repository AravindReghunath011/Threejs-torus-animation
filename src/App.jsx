import { useEffect, useState } from 'react'
import './App.css'
import MyScene from './Component/MyScene';
import { Canvas } from '@react-three/fiber';

function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [count, setCount] = useState(0)
  useEffect(() => {
    const resize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', resize);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <Canvas style={{ height: size.height, width: size.width, background: 'black' }}>
      <MyScene />
    </Canvas>
  )
}

export default App
