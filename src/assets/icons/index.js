/*
 * @Author: liuhuitao
 * @Date: 2019-8-14 14:10:15
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-11-27 15:34:45
 */
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);

const allSvgKeys = req.keys();
const svgs = [];
if (allSvgKeys.length > 0) {
  allSvgKeys.map((svg) => {
    const svgNames = svg.split('/');
    const reg = /([\w1-9A-Za-z-_]+)\.svg/;

    const result = reg.exec(svgNames[svgNames.length - 1]);
    if (result) {
      const svgName = result[1];
      svgs.push(svgName);
    }
  });
}
