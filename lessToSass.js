import { parse, ParseTree, transformTree} from 'less';

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
        console.log(ast);
    } catch (e) {
        console.error('Error while parsing Less');
        throw e;
    }
    // Now we can use the Less AST to generate Scss code.
    for (let name in ast._variables) {
        if (!ast._variables.hasOwnProperty(name)) {
            continue;
        }
        const variable = ast._variables[name];
        console.log(name);
        console.log(variable.value);
    }

    return input;
};

export default {
    convert: convert
}
