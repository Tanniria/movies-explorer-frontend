// import { useState, useEffect } from "react";

// export default function useResize() {
//   const [width, setWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     function handleResize(evt) {
//       setWidth(evt.window.innerWidth);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   }, []);

//   return width
// }

import { useState, useEffect } from "react";

export default function useResize() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth
        )    
    }
    handleResize()

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);
  
  return width
}