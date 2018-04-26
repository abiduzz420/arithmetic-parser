
// 1. Lexical Analysis: Generating tokens
const lex = (code) => code.split(' ').filter(s => s.length).map(s => s.trim());

//2. Node types

const Op = Symbol('op');
const Num = Symbol('num');

/*
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

*/