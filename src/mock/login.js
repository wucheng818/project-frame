import Mock from 'mockjs';
export default Mock.mock('/login', {
  'user|1-3': [
    {
      name: '@cname' // 中文名称
    }
  ]
});
