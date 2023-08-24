---
title: 'Building A Compiler With Javascript'
publishedAt: '2023-08-24'
author: 'Tayte Stokes'
excerpt: 'Whats a compiler and how can we build one?'
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

This isi the second phase of the compilation process.

## Resources

[Babel](https://babeljs.io/docs)
