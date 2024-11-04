import { FC, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Canvas, useLoader } from "@react-three/fiber";
import { PerspectiveCamera, PresentationControls } from "@react-three/drei";

const Model: FC<{ url: string }> = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.3/"
    );
    loader.setDRACOLoader(dracoLoader);

    loader.manager.onStart = () => {
      console.info("foreground model Loading Start");
      setLoading(true);
    };
    loader.manager.onLoad = () => {
      console.info("foreground model Loading Ended");
      setLoading(false);
    };
    loader.manager.onError = () => {
      console.info("foreground model Loading Error");
      setLoading(false);
    };
  });

  if (loading) return null;
  return (
    <PresentationControls>
      <mesh rotation={[0, 0.5, 0]} scale={[3, 3, 3]}>
        <primitive object={gltf.scene} />
      </mesh>
    </PresentationControls>
  );
};

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas>
        <Model key={"background"} url="/simpleBackground.glb" />
        <Model key={"gun"} url="/gun.glb" />
        <PerspectiveCamera
          makeDefault
          fov={10}
          aspect={window.innerWidth / window.innerHeight}
          position={[0, 0, 60]}
        />
      </Canvas>
    </div>
  );
}

export default App;
