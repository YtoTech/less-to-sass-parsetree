import { parse, ParseTree, transformTree, tree } from 'less';
import _ from 'lodash';

// https://stackoverflow.com/questions/20817618/is-there-a-splice-method-for-strings
function spliceSlice(str, index, count, add) {
    // We cannot pass negative indexes dirrectly to the 2nd slicing operation.
    if (index < 0) {
        index = str.length + index;
        if (index < 0) {
            index = 0;
        }
    }

    return str.slice(0, index) + (add || "") + str.slice(index + count);
}

export async function convert (input) {
    // First, parse the Less code using Less parser...
    let parseTree;
    let ast;
    try {
        parseTree = await parse(input);
        // TODO Use ParseTree to manage imports.
        // const tree = new ParseTree(parseTree);
        // console.log(tree.root);
        // And get an AST of the input code.
        ast = transformTree(parseTree);
        // console.log(ast);
    } catch (e) {
        console.error('Error while parsing Less');
        throw e;
    }
    // Now we can use the Less AST to generate Scss code.
    // for (let name in ast._variables) {
    //     if (!ast._variables.hasOwnProperty(name)) {
    //         continue;
    //     }
    //     const variable = ast._variables[name];
    //     console.log(name);
    //     console.log(variable.value);
    // }
    // Approach 1: we take parse tree and generate directly Scss from it.
    // let output = '';

    // Approach 2: we use parse tree to match input and generate corresponding output.
    // Some part may not be transformed at all.
    let output = '';
    for (let i = 0; i < parseTree.rules.length; i++) {
        const node = parseTree.rules[i];
        const nextNode = i < parseTree.rules.length ? parseTree.rules[i+1] : null;
        const length = nextNode ? nextNode.index - node.index : input.length;
        console.log(node);
        if (node.variable == true) {
            function getValue(node, value) {
                if (!node) {
                    return ''
                }
                if (_.isArray(node.value)) {
                    let values = [];
                    _.forEach(node.value, (nodeValue) => {
                        values.push(getValue(nodeValue, ''));
                    })
                    return values.join(', ');
                }
                return value + node.value;
            }
            let nodeOutput = node.name.replace('@', '$') + ': ' + getValue(node.value, '');
            // TODO Preserve original separator from input (space, tab, \n, etc.).
            nodeOutput += ';';
            if (nextNode) {
                nodeOutput += ' ';
            }
            console
            // TODO We must track and match output and input indexes, are they
            // will differ while we are
            output += nodeOutput;
        } else {
            output += input.substr(input, node.index, length);
        }
    }
    // Approach 2 bis: use parse tree to determine what is each section, then
    // use appropriate regex for section. This is regex approach + insight.

    return output;
};

export default {
    convert: convert
}
