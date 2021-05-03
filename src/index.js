import tokenizer from './tokenizer';
import tokens2vdom from './tokens2vdom';

window.toVDOM = function(html) {

  const tokens = tokenizer(html);
  const vdom = tokens2vdom(tokens);

  return vdom;
}