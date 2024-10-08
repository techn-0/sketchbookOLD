import React, { useRef, useEffect, useState } from "react";

const Sketchbook = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const startDrawing = (e) => {
      setDrawing(true);
      ctx.beginPath();
      const rect = canvas.getBoundingClientRect();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const stopDrawing = () => {
      setDrawing(false);
      ctx.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [drawing, color, lineWidth]);

  const saveSketch = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");

    // 서버로 이미지 업로드
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: dataURL,
          description: "User's sketch", // 사용자가 입력한 설명으로 수정 가능
        }),
      });

      if (response.ok) {
        console.log("Sketch saved successfully");
      } else {
        console.error("Failed to save sketch");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">스케치북</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border rounded"
        />
        <input
          type="number"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
          className="border rounded w-16"
          min="1"
          max="100"
        />
        <button onClick={clearCanvas} className="bg-red-500 text-white p-2 rounded">클리어</button>
        <button onClick={saveSketch} className="bg-blue-500 text-white p-2 rounded">저장</button>
      </div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};

export default Sketchbook;
