"use client";
import React, { useState } from "react";
import DragZone from "./DragZone";
import DragObject from "./DragObject";

const DragControlsDemo = () => {
  const [objects, setObjects] = useState([
    { id: "obj-1", x: 20, y: 20, container: "zone-1" },
    { id: "obj-2", x: 150, y: 50, container: "zone-1" },

    { id: "obj-3", x: 50, y: 50, container: "zone-1" },
    { id: "obj-4", x: 150, y: 50, container: "zone-1" },

    { id: "obj-5", x: 20, y: 20, container: "zone-1" },
    { id: "obj-6", x: 150, y: 50, container: "zone-1" },
    { id: "obj-7", x: 20, y: 20, container: "zone-2" },
  ]);

  const [canSwitch, setCanSwitch] = useState(false);
  const [enableCollision, setEnableCollision] = useState(true);

  const handlePositionChange = (id: string, x: number, y: number) => {
    setObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, x, y } : obj))
    );
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    console.log(`Object ${id} dropped at x: ${x}, y: ${y}`);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          DragControls Demo with useDragContainer()
        </h1>

        <div className="mb-4 flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={canSwitch}
              onChange={(e) => setCanSwitch(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Allow switching between containers
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enableCollision}
              onChange={(e) => setEnableCollision(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Enable collision detection
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Container 1 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Container 1
            </h3>
            <DragZone id="zone-1" height={400}>
              {objects
                .filter((obj) => obj.container === "zone-1")
                .map((obj) => (
                  <DragObject
                    key={obj.id}
                    id={obj.id}
                    x={obj.x}
                    y={obj.y}
                    width={120}
                    height={100}
                    canSwitchContainers={canSwitch}
                    hasCollision={enableCollision}
                    onPositionChange={handlePositionChange}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="bg-purple-500 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-[120px] h-[100px]">
                      <div className="font-bold mb-1">Object {obj.id}</div>
                      <div className="text-xs opacity-80">
                        x: {Math.round(obj.x)}, y: {Math.round(obj.y)}
                      </div>
                    </div>
                  </DragObject>
                ))}
            </DragZone>
          </div>

          {/* Container 2 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Container 2
            </h3>
            <DragZone id="zone-2" height={400}>
              {objects
                .filter((obj) => obj.container === "zone-2")
                .map((obj) => (
                  <DragObject
                    key={obj.id}
                    id={obj.id}
                    x={obj.x}
                    y={obj.y}
                    width={120}
                    height={100}
                    canSwitchContainers={canSwitch}
                    hasCollision={enableCollision}
                    onPositionChange={handlePositionChange}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="bg-emerald-500 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-[120px] h-[100px]">
                      <div className="font-bold mb-1">Object {obj.id}</div>
                      <div className="text-xs opacity-80">
                        x: {Math.round(obj.x)}, y: {Math.round(obj.y)}
                      </div>
                    </div>
                  </DragObject>
                ))}
            </DragZone>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Features with useDragContainer():
          </h3>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
            <li>
              ✨ <strong>Context-based</strong> - No need to pass refs manually
            </li>
            <li>
              🎯 <strong>Automatic container detection</strong> - Objects know
              their container
            </li>
            <li>
              🔄 <strong>useGSAP integration</strong> - Proper cleanup and React
              best practices
            </li>
            <li>
              ⚡ <strong>Performance optimized</strong> - Updates only on drop
            </li>
            <li>
              🎨 <strong>Toggle enable/disable</strong> - Click the ✓/✗ button
            </li>
            <li>
              📦 <strong>Bounded dragging</strong> - Objects stay within
              containers
            </li>
            <li>
              🚀 <strong>Smooth inertia</strong> - Momentum-based motion after
              release
            </li>
            <li>
              💥 <strong>Collision detection</strong> - Objects can&apos;t
              overlap when enabled
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DragControlsDemo;
