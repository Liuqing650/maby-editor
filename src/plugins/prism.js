import React from 'react';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import createPrismPlugin from 'draft-js-prism-plugin';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-swift';

const prismPlugin = {
  decorators: [
    new PrismDecorator({
      prism: Prism,
      getSyntax(block) {
        const language = block.getData().get('javascript');
        if (typeof Prism.languages[language] === 'object') {
          return language;
        }
        return null;
      },
      render({ type, children }) {
        console.log('type---->', type);
        return <span className={`prism-token token ${type}`}>{children}</span>;
      }
    })
  ]
};
// const prismPlugin = createPrismPlugin({
//   prism: Prism
// });

export default prismPlugin;
