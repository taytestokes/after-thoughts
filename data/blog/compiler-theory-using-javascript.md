---
title: 'How Compilers Work and Building One Using Javascript'
publishedAt: '2023-08-24'
author: 'Tayte Stokes'
excerpt: 'A look into the compliation process and what it takes to build a compiler using Javascript.'
featured: false
---

A compiler is system that takes a programming language's source code and transforms it into something else. For example, this could be another programming language, bytecode, or even machine code.

There are a few popular compilers used for Javascript, such as [Babel](https://babeljs.io/), which is used to convert newer iterations of the language into older versions to support backwards compatibility for browsers and other environments that can't parse the languages newer features. It does this by transforming syntax and [polyfilling](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) features that are missing in the target environment.

Another compiler that has been gaining a lot of popularity is the [SWC](https://swc.rs/) compiler. This compiler is built with Rust and claims to be 20x faster than Babel. Speaking from my own experience working with SWC - it's insanely quick.

## How Compilers Work And The Different Phases

Compilers accomplish the task of transforming source code by executing a series of tasks in phases. In the following order, the phases consist of Lexical Analysis, Syntax Analysis, Semantic Analysis, Intermediate Code Generation, Optimization, and Code Generation.

### Lexical Analysis

The first phase of a compiler is the lexical analysis phase, which is often refered to as scanning. This is where the source code is read one character at a time and broken down into a set of tokens. A token is a group of characters that represent some form of functionality in the programming language. These tokens will then be passed to the next phase to be analyzed. This initial phase will strip away all non-token structures such as comments, additional whitespaces, etc from being compiled.

### Syntax Analysis

This second phase of the compilation process is the syntax analysis phase, which is also known as the parsing step. It receives the set of tokens from the lexicial analysis phase and parses through them individually to ensure that each token conforms to correct syntax and order of the targeted language. The parser is the functionality that handles this and will produce a hierarchical representation of the tokens usually in the form of an Abstract Syntax Tree. This AST will passed to the next phase in the compilation process.

### Semantic Analysis

This is the third phase of the compilation process. In this phase, the AST created in the previous phase is analyzed to ensure that it is semantically correct and that the syntax follows the targeted languages semantic rules and type systems. If there are any errors with following the targeted language's semantics, then those will be handled. If not, then the semantically validated AST will be passed to the next compliation phase.

### Intermediate Code Generation

This is the fourth phase of the compilation process. This phase uses an intermediate code generator to transform the output from the previous phase into intermediate code that is machine independent and can easily be turned into machine code. This is the phase of compilation that allows programs to be more portable by allowing the targeted machine to translate the code easily into their native machie code. The intermdiate code is then passed to the next phase of the compliation process.

### Optimization

This is the fifth phase in the compilation process. The optimization phase will take the intermediate code generated in the phase before and apply optimizations to be more efficient by using fewer resources when the machine code is generated. For example, some of the techniques that can be applied consist of dead code elimiation, unreachable code elimination, constant folding, etc. The optimized intermediate code is then passed to the next phase.

### Code Generation

This is the sixth and final phase of the compilation process. The code generator will receive the optimized intermediate code from the previous phase and translates it into the targeted machine language.

## Building our own compiler using Javascript

I'm a lazy programmer and I really hate having to type out the word _function_ so we are going to write a an extremely simple compiler that will allow us to use the expression _fn_ instead. Our compiler will take some of our special code that allows us to use the _fn_ expression and compile it into valid Javascript.

```js
// Our lazy expression will transform into a valid Javascript expression
fn add(){} => function sum(){}
```

Let's get started and define our compiler that accepts our special code as the input. It's important to note that the input here will be a string of our code.

```js
const compiler = (input) => {
  // Logic to compile our code
}
```

The first step in our compilation process is to scan the input and break it down into the different syntax blocks of the language. The syntax blocks are referred to as _tokens_. The function that handles this process is called the _lexer_ and will return a stream of the tokens created. Let's go ahead and create our lexer function.

```js
const letterRegex = /^[A-Za-z]+$/
const whiteSpaceRegex = /\s/

const lexer = (input) => {
  const tokens = []
  let position = 0

  while (position < input.length) {
    let character = input[position]

    if (letterRegex.test(character)) {
      let value = ''

      while (letterRegex.test(character)) {
        value += character
        character = input[++position]
      }

      if (value === 'fn') {
        tokens.push({
          type: 'function declaration',
          value,
        })
      } else {
        tokens.push({
          type: 'name',
          value,
        })
      }
      continue
    }

    if (whiteSpaceRegex.test(character)) {
      position++
      continue
    }

    if (character === '(' || character === ')') {
      tokens.push({
        type: 'paren',
        value: character,
      })
      position++
      continue
    }

    if (character === '{' || character === '}') {
      tokens.push({
        type: 'brace',
        value: character,
      })
      position++
      continue
    }

    throw new Error(`Error compiling value: '${character}'`)
  }

  return tokens
}
```

There's a lot happening in that lexer function, so let's break it down. We first create an empty array that will hold our tokens, then we need to process the input by iterating through it on each character so we create the _position_ variable to keep track of our current position in the loop.

Next we keep track of which character we are currently iterating over using our current position. We then need to run a few checks against the current character to know if we should tokenize it. We first check to see if character is an alphabetical letter, if it is then we will establish what characters follow it and if determine if it's a special keyword or some sort of variable name. If the group of characters equate to _fn_ then we will tokenize that as a function declaration and continue iterating over the rest of the input. If it's not, then we will tokenize it as a variable name.

Next we check if the current character is a whitespace. This isn't valid syntax for us, so we will not tokenize it and continue to the next iteration.

Now we will check to see if the character is either a '(' or ')' and then tokenize it as a paren.

The next values we need to check for are curly braces that define a block. We will check for the '{' and '}' characters and tokenize them as a brace.

With those checks in place, if we were to run our lexer function with a _fn_ declaration, we will get a list of tokens that can be used in the next phase of compilation.

```js
const input = 'fn test(arg){}'

lexar(input)

// Result:
//
// [
//   ({ type: 'function declaration', value: 'fn' },
//   { type: 'name', value: 'test' },
//   { type: 'paren', value: '(' },
//   { type: 'name', value: 'arg' },
//   { type: 'paren', value: ')' },
//   { type: 'brace', value: '{' },
//   { type: 'brace', value: '}' }),
// ]
```

Let's go ahead an now add our lexer function to our compiler.

```js
const compiler = (input) => {
  const tokens = lexer(input)
}
```

Now that we have the tokens of our program, we can use them to form an abstract syntax tree that will represent our program. We will create a _parser_ function to handle transorming our tokens into the AST.

```js
const parser = (tokens) => {
  let position = 0

  const walk = () => {
    let token = tokens[position]

    if (token.type === 'function declaration') {
      token = tokens[++position]

      const node = {
        type: 'FunctionDeclaration',
        name: token.value,
        params: [],
        body: [],
      }

      position += 2
      token = tokens[position]

      while (token.value !== ')') {
        node.params.push(walk())
        token = tokens[position]
        position++
      }

      token = tokens[++position]

      while (token.value !== '}') {
        node.body.push(walk())
        token = tokens[position]
        position++
      }

      return node
    }

    if (token.type === 'identifier') {
      position++
      const node = {
        type: 'Identifier',
        value: token.value,
      }
      return node
    }

    throw new TypeError(`Unknown token type: '${token.type}'`)
  }

  const ast = {
    type: 'Program',
    body: [walk()],
  }

  return ast
}
```

Let's unpack eveything that's happening inside of our parser.

## Resources

[Babel](https://babeljs.io/docs)
