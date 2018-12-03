import EditPrism from 'slate-prism';
import EditCode from 'slate-edit-code';
import options from '../options';
import {
  BoldPlugin, BlockquotePlugin, ImagesPlugin, PasteHtmlPlugin, LinkPlugin, HrPlugin,
  ItalicPlugin, Underlinelugin, DeletelinePlugin, CodePlugin, CodeBlockPlugin,
  HeaderOnePlugin, HeaderTwoPlugin, HeaderThreePlugin, HeaderFourPlugin, HeaderFivePlugin, HeaderSixPlugin,
} from './index';

const { BLOCKS } = options;

const editCodePlugin = EditCode({
  containerType: BLOCKS.CODE_BLOCK,
  lineType: BLOCKS.CODE_LINE,
  onlyIn: node => node.type === BLOCKS.CODE_BLOCK
});
// 插件
const plugins = [
  editCodePlugin,
  LinkPlugin(),
  CodePlugin(),
  CodeBlockPlugin(),
  HrPlugin(),
  EditPrism({
    onlyIn: node => node.type === BLOCKS.CODE_BLOCK,
    getSyntax: node => node.data.get('syntax')
  }),
  ItalicPlugin(),
  Underlinelugin(),
  DeletelinePlugin(),
  HeaderOnePlugin(),
  HeaderTwoPlugin(),
  HeaderThreePlugin(),
  HeaderFourPlugin(),
  HeaderFivePlugin(),
  HeaderSixPlugin(),
  BoldPlugin(),
  BlockquotePlugin(),
  PasteHtmlPlugin(),
  ImagesPlugin({
    lastInsert: {
      line: 5,
    },
    insertImage: (transform, file) => {
      return transform.insertBlock({
        type: 'image',
        isVoid: true,
        data: { file },
      });
    }
  }),
];

export {
  editCodePlugin
};
export default plugins;
