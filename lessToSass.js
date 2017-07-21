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
        console.log(parseTree);
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
    let output = _.clone(input);
    for (let i = 0; i < parseTree.rules.length; i++) {
        const node = parseTree.rules[i];
        const nextNode = i < parseTree.rules.length ? parseTree.rules[i+1] : null;
        const length = nextNode ? nextNode.index - node.index : input.length;
        console.log(node);
        if (node.variable) {
            function getValue(node, value) {
                if (_.isArray(node.value)) {
                    let values = [];
                    // console.log('Node', node);
                    _.forEach(node.value, (nodeValue) => {
                        // console.log('NodeValue', nodeValue);
                        values.push(getValue(nodeValue, ''));
                    })
                    return values.join(', ');
                }
                // console.log('Leaf', node);
                return value + node.value;
            }
            let nodeOutput = node.name.replace('@', '$') + ': ' + getValue(node.value, '');
            console.log(nodeOutput);
            // TODO Preserve \n.
            output = spliceSlice(output, node.index, length, nodeOutput);
        }
    }

    console.log(output);
    return output;
};

export default {
    convert: convert
}
