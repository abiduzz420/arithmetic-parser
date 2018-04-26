// 1. Lexical Analysis: Generating tokens
const lex = (code) => code.split(' ').filter(s => s.length).map(s => s.trim());

//2. Node types

const Op = Symbol('op');
const Num = Symbol('num');

/*
{
    A number with value: 32

    {
        type: Num,
        val: 32
    }

    add 32 23

    {
        type: Op,
        val: 'add',
        expr: [
            {
                type: Num,
                val: 32
            },
            {
                type: Num,
                val: 23
            }
        ]
    }

    add 2 mul 4 5
    {
        type: Op,
        val: 'add',
        expr: [
            {
                type: Num,
                val: 2
            },
            {
                type: Op,
                val: 'mul',
                expr: [
                    {
                        type: Num,
                        val:4
                    },
                    {
                        type: Num,
                        val: 5
                    }
                ]
            }
        ]
    }
}
*/

// 3. The Parser

/*
    👇
mul 3   add 2   5
*/
const parser = (tokens) => {
    let index = 0;

    const peek = () => tokens[index];
    const consume = () => tokens[index++];

    const parseNum = () => ({ val: parseInt(consume()), type: Num});

    const parseOp = () => {
        const node = {
            val: consume(),
            type: Op,
            expr: []
        };
        while(peek()) node.expr.push(parseExpr());
        return node;
    }

    const parseExpr = () => /\d/.test(peek()) ? parseNum() : parseOp();

    return parseExpr();
}

// 4. Transpiler

const transpile = (ast) => {
    const opMap = {
        add: '+',
        mul: '*',
        sub: '-',
        div: '/',
        mod: '%'
    };
    
    const transpileNode = (node) => node.type === Num ? transpileNum(node) : transpileOp(node);
    
    const transpileNum = (node) => parseInt(node.val);

    const transpileOp = (node) => '(' + node.expr.map(transpileNode).join(' ' + opMap[node.val] + ' ') + ')';

    return transpileNode(ast);
}

const program = () => {
    const code = document.getElementById('code').value;
    const output = transpile(parser(lex(code)));
    document.getElementById('output').innerHTML = 'Output is : <b>'+ output + '</b>';

    
}