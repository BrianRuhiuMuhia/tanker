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


function  getRandomDimensions() {
    const min = 80;
    const max = 40;
    const width = Math.floor(Math.random() * (max - min + 1)) + min;
    const height = Math.floor(Math.random() * (max - min + 1)) + min;
    return { width:width, height:height };
}
    export {getRandomDimensions}
