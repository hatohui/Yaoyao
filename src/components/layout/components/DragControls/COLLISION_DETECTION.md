# Collision Detection for DragControls

## Overview

The DragControls system now includes built-in collision detection that prevents draggable objects from overlapping each other.

## How It Works

### 1. **Collision Registry**

Each `DragZone` maintains a registry of all objects with collision detection enabled. Objects register themselves automatically when `hasCollision={true}`.

### 2. **Hitbox System**

Each object has a defined hitbox (width × height) that determines its collision boundaries:

```tsx
<DragObject
  id="obj-1"
  x={20}
  y={20}
  width={120} // Hitbox width
  height={100} // Hitbox height
  hasCollision={true} // Enable collision detection
/>
```

### 3. **Real-time Detection**

During drag operations:

- The system checks for overlaps with other collision-enabled objects
- If a collision is detected, the object snaps back to its last valid position
- The collision check uses bounding rectangle intersection

### 4. **Smooth Behavior**

- **During Drag**: Objects are prevented from moving into collision zones in real-time
- **On Drop**: If somehow an object ends up colliding, it smoothly animates back to the last valid position with a "back.out" easing

## Usage

### Basic Example

```tsx
import { DragZone, DragObject } from "./DragControls";

function MyComponent() {
  return (
    <DragZone id="my-zone" height={400}>
      <DragObject
        id="obj-1"
        x={20}
        y={20}
        width={120}
        height={100}
        hasCollision={true} // Enable collision
      >
        <div className="w-[120px] h-[100px] bg-blue-500">Object 1</div>
      </DragObject>

      <DragObject
        id="obj-2"
        x={150}
        y={20}
        width={120}
        height={100}
        hasCollision={true} // Enable collision
      >
        <div className="w-[120px] h-[100px] bg-red-500">Object 2</div>
      </DragObject>
    </DragZone>
  );
}
```

### Important Notes

1. **Matching Dimensions**: The `width` and `height` props should match the actual visual size of your object:

   ```tsx
   <DragObject width={120} height={100}>
     <div className="w-[120px] h-[100px]">...</div>
   </DragObject>
   ```

2. **Optional Collision**: Objects without `hasCollision={true}` can pass through other objects freely.

3. **Mixed Modes**: You can have some objects with collision and others without in the same zone:

   ```tsx
   <DragObject hasCollision={true} />   // Can't overlap
   <DragObject hasCollision={false} />  // Can pass through others
   <DragObject />                       // No collision by default
   ```

4. **Cross-Container**: Collision detection works both within containers and when `canSwitchContainers={true}`.

## Props

### DragObject Collision Props

| Prop           | Type      | Default | Description                |
| -------------- | --------- | ------- | -------------------------- |
| `width`        | `number`  | `120`   | Hitbox width in pixels     |
| `height`       | `number`  | `100`   | Hitbox height in pixels    |
| `hasCollision` | `boolean` | `false` | Enable collision detection |

## Demo

See `DragControlsDemo.tsx` for a complete working example with a toggle to enable/disable collision detection.

## Performance

The collision detection is optimized:

- Only checks objects within the same container (unless switching containers)
- Only active objects with `hasCollision={true}` are checked
- Uses efficient bounding rectangle intersection algorithm
- Checks occur during drag events, not on every frame

## Future Enhancements

Potential improvements:

- Custom collision shapes (circular, polygon)
- Collision callbacks for custom behavior
- Snap-to-grid alignment with collision
- Elastic collision responses
- Collision groups (objects only collide with specific groups)
