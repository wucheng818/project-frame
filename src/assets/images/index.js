/*
 * @Author: liuhuitao
 * @Date: 2019-8-14 14:10:15
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-11-14 13:54:21
 */
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const req = require.context('./', true, /\.png$/);
requireAll(req);

const allPngKeys = req.keys();
const allImages = {};
if (allPngKeys.length > 0) {
  allPngKeys.map((png) => {
    const pngNames = png.split('/');
    const reg = /([\w1-9A-Za-z-_]+)\.png/;

    const result = reg.exec(pngNames[pngNames.length - 1]);
    if (result) {
      const pngName = result[1];
      allImages[pngName] = require('' + png);
    }
  });
}

export default allImages;
