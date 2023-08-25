---
title: 'Introduction to Compiler Design and building one with Javascript'
publishedAt: '2023-08-24'
author: 'Tayte Stokes'
excerpt: 'An introduction to the different phases used in compiler design with an example of building a mini compiler in Javascript'
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
fn add(){} => function sum(){}
```

Let's get started and define our compiler that accepts our special code as the input. It's important to note that the input here will be a string of our code.

```js
const compiler = (input) => {}
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

Let's go ahead an now add our lexer function to our compiler.

```js
const compiler = (input) => {
  const tokens = lexer(input)
}
```

If we return the tokens from our compiler and use our example input, the result would look like the following.

```js
const input = 'fn test(arg){}'

compiler(input)

// Result:
[
  ({ type: 'function declaration', value: 'fn' },
  { type: 'name', value: 'test' },
  { type: 'paren', value: '(' },
  { type: 'name', value: 'arg' },
  { type: 'paren', value: ')' },
  { type: 'brace', value: '{' },
  { type: 'brace', value: '}' }),
]
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

Let's unpack eveything that's happening inside of our parser. Since we will be iterating through the tokens we generated and trasnform them into nodes on the AST, we need to keep track of our iteration poisition. We then create an object that will represent our AST. The root node of the AST will contain two properties, the type which is set to _Program_ and the body which will be all children nodes on the tree.

We will set the value of the root nodes body by using a recursive function called _walk_ that will produce the nodes on the AST that are derived from the tokens we are processing.

The _walk_ function will first keep track of the token that we are processing and determine it's type. Dependendant on the type, we will execute logic. Since this example is so simple we only need to create one node on our AST, which is a FunctionDeclaration node that will represent our single function declaration.

We first check for a function declaration token and then we will create a new node that represents a FunctionDeclaration and save the type, name, params, and body of the function declaration. The type declares what type of node this is, the name will be the variable name for the function, the params will be additional nodes that represent the param objects, and the body will be another set of nodes that will describe what the function does.

In order to get the name of the function declaration, we need to advance to the token that contains it which should be the next token in the list. After saving the functions name, we can move onto building the param nodes.

Since we built the lexer and understand that the variables defined between the parenthsis of the function delcaration are params, we can skip to the first param token and create nodes for each param token. In our case, we are labeling these nodes as Identifiers (I actually think this de facto name for this).

Notice how we are now recursively calling our _walk_ function to create a node for each of these param tokens. We now are at the top level of the _walk_ function in the recursive call, so we need to add a condition to check for Indentifier token type and properly spawn a new node for it.

Once we have created new nodes on the AST for our params, we can do the same thing for creating new nodes that represent the body of our function declaration.

Now let's add our parser to our compiler.

```js
const compiler = (input) => {
  const tokens = lexer(input)
  const ast = parser(tokens)
}
```

If we were to return the AST that was just created from our parser from the compiler function using our example input, the result look like the following.

```js
const input = 'fn test(arg){}'

compiler(input)

// Result
{
  type: 'Program',
  body: [
    {
      type: 'FunctionDeclaration',
      name: 'test',
      params: [{ type: 'Identifier', value: 'arg' }],
      body: [],
    },
  ],
}
```

Now that we have our AST, we will need to transform it into a shape that will make it easy for Javascript to be generated from. In our case, we will create another AST that will mimic our AST, but with with nodes that have been transformed with proper information to make it easy to for Javascript to be generated.

Let's go ahead an create the _transformer_ function that will receive our AST that is produced from the _parser_ as an argument and it will return a transformed AST.

```js
const transformer = (ast) => {
  const transformedAst = {
    type: 'Program',
    body: [],
  }

  let position = transformedAst.body

  const NODE_TRANSFORMERS = {
    FunctionDeclaration(node) {
      const transformedNode = {
        type: 'FunctionDeclaration',
        id: {
          type: 'Identifier',
          name: node.name,
        },
        params: [],
        body: [],
      }
      position.push(transformedNode)
      position = transformedNode.params
    },
    Identifier(node) {
      const transformedNode = {
        type: 'Identifier',
        name: node.value,
      }
      position.push(transformedNode)
    },
  }

  const transform = (node, parent) => {
    const mapper = NODE_TRANSFORMERS[node.type]

    if (mapper) mapper(node, parent)

    if (node.type === 'Program') {
      node.body.forEach((childNode) => transform(childNode, node))
    }

    if (node.type === 'FunctionDeclaration') {
      node.params.forEach((childNode) => transform(childNode, node))
      node.body.forEach((childNode) => transform(childNode, node))
    }
  }

  transform(ast, null)

  return transformedAst
}
```

The transformer is essentially traversing through AST that is received as input and generates a node on the new transformed AST based on the node being traversed. We first define a new AST that will be the result of this function.

Next we define the position, which is where we want to start adding new nodes in the AST. Initially we want to start on the body of the root node, since all children nodes will exist here.

We then define a map of methods that will be used to create a new node based on the node currently being traversed and then append it to the new AST.

Next we have our _transform_ function. This is a recursive function that will essentially walk our input AST and call the correct node mapper method for each node. We will detect if the current node being traversed has any children nodes based on the node type and then it recursively call itself for each child node to correctly map it to the new AST.

The last step is to start our _transform_ function passing it the input AST and start the traversing at the root program node.

Now when we call our _transformer_ passing it our AST generated from our _parser_, we can see how it is now a new AST that is better represented to be turned into Javascript.

```js
// Before
{
  type: 'Program',
  body: [
    {
      type: 'FunctionDeclaration',
      name: 'test',
      params: [{ type: 'Identifier', value: 'arg' }],
      body: [],
    },
  ],
}

// After
{
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: { type: "Identifier", name: "test" },
      params: [{ type: "Identifier", name: "arg" }],
      body: [],
    },
  ],
};
```

Now let's add the _transformer_ to our _compiler_.

```js
const compiler = (input) => {
  const tokens = lexer(input)
  const ast = parser(tokens)
  const transformedAst = transformer(ast)
}
```

Now that we have generated our intermediate code into an AST that represnts our program, we now need to generate actual Javascript, since that is our targeted language, from it.

Let's create a _generator_ function that will handle this for us.

```js
const generator = (node) => {
  if (node.type === 'Program') {
    return node.body.map((childNode) => generator(childNode)).join('\n')
  }

  if (node.type === 'Identifier') {
    return node.name
  }

  if (node.type === 'FunctionDeclaration') {
    return `function ${generator(node.id)}(${node.params
      .map((paramNode) => generator(paramNode))
      .join(',')}){${node.body.map((bodyNode) => generator(bodyNode))}}`
  }
}
```

The _generator_ function is going to be another recursive function that will traverse our intermediate AST created from the _transformer_ and it will determine which type of node is being traversed and map the nodes values to the correct Javascript syntax needed.

If we take a look, the first thing _generator_ does is check to see if the node being traversed is the root node, if so then it will map through all of the children nodes and call itself for each node. It then returns the output of the mapped result as a string seperated by new lines. In our case, there will only be a single line because our example is so simple.

Next we need to check for the other types of node that we could possibly run into and correctly handle creating Javascript syntax based on that node data and structure.

Now if we were to execute the _generator_ and pass it the intermediate AST, we should expect to see the correct Javascript syntax for a function declaration as the output.

```js
// Before
fn test(arg){}

// After
function test(arg){}
```

Let's go ahead and add the _generator_ to our _compiler_ and return the generated code.

```js
const compiler = (input) => {
  const tokens = lexer(input)
  const ast = parser(tokens)
  const transformedAst = transformer(ast)
  const generatedCode = generator(transformedAst)

  return generatedCode
}
```

Boom, we now have a mini compiler! Maybe it's easier to just type out the word _function_ instead...

## Resources

Resources used to help construct this blog post and further my understanding around the topic.

[AST Explorer](https://astexplorer.net/)

[Geeks For Geeks - Phases of a compiler](https://www.geeksforgeeks.org/phases-of-a-compiler/)

[Scaler - Phases of compiler](https://www.scaler.com/topics/phases-of-compiler/)

[Github - jamiebuilds/the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/tree/master)

[Caught In The Web - Create Your Own Compiler](https://citw.dev/tutorial/create-your-own-compiler?p=1)
