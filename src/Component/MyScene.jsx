import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, OrbitControls, Text } from '@react-three/drei';
import {  useControls } from 'leva'

const MyScene = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const torusRef = useRef(null);

  useEffect(() => {
    torusRef.current.rotation.y = Math.PI/4
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
  
useFrame(()=>{
    if(torusRef.current){
        // torusRef.current.rotation.y += 0.02
        torusRef.current.rotation.x +=0.015   

    }
})

const controls = useControls({
    thickness:{value:0.2,min:0,max:3,step:0.1},
    roughness:{value:0.2,min:0,max:3,step:0.1},
    transmission:{value:0.2,min:0,max:1,step:0.1},
    ior:{value:0.2,min:0,max:3,step:0.1},
    chromaticAberration:{value:0.2,min:0,max:1,step:0.1},
    backside:{value:true}
})


  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="city" />
      <Text position={[0, 0, -2]} scale={size.width / 1000} color="white">
        Hello Three.js
      </Text>
      <mesh ref={torusRef} position={[0, 0, 0]} scale={size.width / 800}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <MeshTransmissionMaterial {...controls}/>
      </mesh>
      <OrbitControls />
      </>
  );
};

export default MyScene;
