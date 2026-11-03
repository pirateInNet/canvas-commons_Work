import {makeProject} from '@canvas-commons/core';

import intro from './scenes/000-intro/intro?scene';
import sort from './scenes/001-sort/sort?scene';
import sort_ani from './scenes/002-sort-animation/sort-animation?scene';
// import search from './scenes/002-search/search?scene';

// for code blocks
import {Code, LezerHighlighter} from '@canvas-commons/2d';
import {parser} from '@lezer/python';
Code.defaultHighlighter = new LezerHighlighter(parser);


export default makeProject({
  scenes: [intro, sort, sort_ani],
});
