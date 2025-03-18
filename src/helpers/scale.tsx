// import { useMemo, useState } from "react";

// const scale = () => {

//     const [baseCanvasSize, setBaseCanvasSize] = useState<number | null>(null);

//     useMemo(() => {
//         setBaseCanvasSize(window.innerWidth / 2);
//     }, []);

//     // Изменять скалирование при изменении размера окна
//     // if (baseCanvasSize !== null) {
//     //     scale = canvasSize.width / baseCanvasSize;
//     // }
//     // useEffect(() => {
//     //     const handleResize = () => {
//     //         setCanvasSize({ width: window.innerWidth / 2, height: window.innerHeight / 2 });
//     //     };

//     //     window.addEventListener("resize", handleResize);
//     //     return () => window.removeEventListener("resize", handleResize);

//     // }, []);

// };