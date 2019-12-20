/* eslint-disable */
/*
 * @Descripttion: 修改了dragTreeTable的参数及样式--详情：https://github.com/751754949/vue-drag-tree-table
 * @version:
 * @Author: ZhengPan
 * @Date: 2019-08-14 10:57:58
 * @LastEditors: ZhengPan
 * @LastEditTime: 2019-08-14 15:39:22
 * @params
 *      lists:
 *        参数	      可选值	     描述
 *         id	        String	    唯一标志
 *         parent_id	String	    父节点ID
 *         order	    Number	    排序,0开始,onDrag后�order会重置
 *         name	      String	    默认显示内容
 *         open	      Boolean	    true展开,false收起
 *         lists	    Array	      子节点
 *
 *
 *      columns:
 *        参数	      可选值	                    描述
 *         type	      'selection', 'actions'	   selection会显示折叠图标，actions指操作栏
 *         title	    String	                   表格标题
 *         field	    String	                   单元格内容取值使用
 *         style	    Object	                   此单元格的样式
 *         tips	      Boolean	                   是否有提示窗（仅type=actions时使用）
 *         tipContent	String	                   提示窗内容（tips=true时生效）
 *         flex	      Number	                   单元格宽度以flex计算（设置flex时，width无效）
 *         align	    left,center,right	         单元格对齐方式，默认局左对齐
 *         formatter	Function	                 自定义单元格显示内容,参数为当前行数据(设置formatter时，field无效)
 *
 */
import dragTreeTable from './dragTreeTable.vue';
export default dragTreeTable;
