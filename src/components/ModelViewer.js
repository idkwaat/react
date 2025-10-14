import React, { Suspense, memo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ url }) {
  const gltf = useGLTF(url, true);

  useEffect(() => {
    return () => {
      if (gltf.scene) gltf.scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [gltf]);

  return <primitive object={gltf.scene} scale={1.5} />;
}

const ModelViewer = memo(({ modelUrl }) => {
  if (!modelUrl) return null;

  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        background: "#f8f8f8",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 5]} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
});

export default ModelViewer;
