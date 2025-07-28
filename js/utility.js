// Preload ALL images at game start
// const preloadImages = async (urls) => {
//     await Promise.all(
//         urls.map(url => {
//             const img = new Image();
//             img.src = url;
//             return new Promise(resolve => {
//                 img.onload = resolve;
//                 img.onerror = resolve; // Degrade gracefully
//             });
//         })
//     );
// };

// // Usage:
// await preloadImages(['enemy1.png', 'enemy2.png']);
  function generateRandomXandYPos(dim,gameSize){
        let x,y
    if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - dim.width : gameSize.width + dim.width
            y = Math.random() * gameSize.height
        } else {
            x = Math.random() * gameSize.width
            y = Math.random() < 0.5 ? 0 -gameSize.height : gameSize.height + dim.width
        }
        return {x,y}
    }
    export {generateRandomXandYPos}