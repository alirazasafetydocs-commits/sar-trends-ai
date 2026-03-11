'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Torus, Icosahedron, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField({ count = 500 }) {
  const mesh = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function RotatingGlobe() {
  const globeRef = useRef()
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={globeRef}>
        <Sphere args={[1.5, 64, 64]}>
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={0.3}
          />
        </Sphere>
        <Sphere args={[1.4, 32, 32]}>
          <meshStandardMaterial
            color="#8b5cf6"
            transparent
            opacity={0.1}
          />
        </Sphere>
      </group>
    </Float>
  )
}

function FloatingShapes() {
  const shapesRef = useRef()
  
  useFrame((state) => {
    if (shapesRef.current) {
      shapesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={shapesRef}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5} position={[3, 1, -2]}>
        <Icosahedron args={[0.5, 0]}>
          <meshStandardMaterial color="#06b6d4" wireframe />
        </Icosahedron>
      </Float>
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1} position={[-3, -1, -1]}>
        <Torus args={[0.4, 0.15, 16, 32]}>
          <meshStandardMaterial color="#f472b6" wireframe />
        </Torus>
      </Float>
      
      <Float speed={4} rotationIntensity={0.6} floatIntensity={2} position={[2, -2, 1]}>
        <Icosahedron args={[0.3, 0]}>
          <meshStandardMaterial color="#22c55e" wireframe />
        </Icosahedron>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2} position={[-2, 2, -2]}>
        <Torus args={[0.3, 0.1, 16, 32]}>
          <meshStandardMaterial color="#f59e0b" wireframe />
        </Torus>
      </Float>
    </group>
  )
}

function NeuralNetwork() {
  const linesRef = useRef()
  
  const points = useMemo(() => {
    const temp = []
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 8
      const y = (Math.random() - 0.5) * 8
      const z = (Math.random() - 0.5) * 8
      temp.push(new THREE.Vector3(x, y, z))
    }
    return temp
  }, [])

  const linePositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (Math.random() > 0.7) {
          positions.push(points[i].x, points[i].y, points[i].z)
          positions.push(points[j].x, points[j].y, points[j].z)
        }
      }
    }
    return new Float32Array(positions)
  }, [points])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={linesRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </lineSegments>
      {points.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <ParticleField count={300} />
        <RotatingGlobe />
        <FloatingShapes />
        <NeuralNetwork />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

