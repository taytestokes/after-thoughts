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

## Resources

[Babel](https://babeljs.io/docs)
