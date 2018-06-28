/* @flow */

import Options from './options';
import core from './core';

/**
 *  Returns the full plugin object (behavior + rendering + schema)
 */
function Image(
  // The plugin options
  optionsParam
) {
  const opts = new Options(optionsParam || {});
  const corePlugin = core(opts);

  return {
    ...corePlugin,
    onKeyDown: onKeyDown.bind(null, opts)
  };
}

export default Image;
