# 📘 TypeScript Deep Dive & Practical Learning Lab

Welcome to the ultimate TypeScript Learning Repository! This repository contains a structured compilation of core TypeScript principles, advanced type mechanics, and practical implementations. It serves as both a step-by-step learning path and a high-utility reference handbook.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your local machine.

### 2. Installation
Clone the repository and install the development dependencies:
```bash
git clone <your-repository-url>
cd <repository-folder-name>
npm install
```

### 3. Execution & Compilation
To run or experiment with any specific TypeScript file without manually compiling it to JavaScript, use `ts-node`:
```bash
# Run a specific learning module
npx ts-node src/files/variables_and_basic_types.ts
```

To continuously compile files in watch mode:
```bash
npx tsc --watch
```

---

## 🗺️ Learning Path & File Directory

The source material inside `src/files/` is categorized below by conceptual progression, moving from absolute fundamentals to advanced metaprogramming.

### 1. Fundamentals & Core Types
*   `Intro.ts` — High-level architecture overview, compiler design, and engine setup.
*   `variables_and_basic_types.ts` — Primitive assignments (`string`, `number`, `boolean`).
*   `explicit_or_inference_types.ts` — Type checking differences between manual annotations vs. contextual inference.
*   `special_dtypes.ts` — Safely interacting with unstable shapes using `any`, `unknown`, and `never`.

### 2. Data Structures & Object Typing
*   `object.ts` — Structural typing, optional keys, and inline schemas.
*   `array.ts` — Typed lists, array methods constraints, and multidimensional definitions.
*   `tuple.ts` — Fixed-length, strictly ordered arrays for deterministic signatures.
*   `enum.ts` — Numeric and string-based constant maps.

### 3. Functions & Modern Evaluation
*   `function.ts` — Type signatures, optional params, rest elements, and explicit return boundaries.
*   `null_undefined_values_handling.ts` — Defensive patterns, optional chaining (`?.`), and nullish coalescing (`??`).
*   `promise.ts` — Handling asynchronous flows, `async/await` mechanics, and typed resolution handlers.

### 4. Custom Model Definitions
*   `type_alias_and_interfaces.ts` — Schema creation, comparing primitive extensions vs. declaration merging.
*   `union_and_intersection.ts` — Combining types using logical OR (`|`) and logical AND (`&`).
*   `index_signature.ts` — Typing highly dynamic, arbitrary key-value objects.

### 5. Object-Oriented Programming (OOP)
*   `classes.ts` — Constructors, access modifiers (`public`, `private`, `protected`), and type parameter initialization.
*   `static.ts` — Class-level properties, shared utilities, and global factories.
*   `namespace.ts` — Scoping code modules, bundling execution fragments, and preventing global footprint collision.

### 6. Advanced Typings & Metaprogramming
*   `casting.ts` — Manual assertion over-rides using `as` and `<type>` parameters.
*   `keyof_operator.ts` — Extracting public object keys to create literal type unions.
*   `generics.ts` — Designing component logic abstractions, dynamic functions, and parametric constraints.
*   `utility_types.ts` — Advanced type transforms (`Partial`, `Pick`, `Omit`, `Readonly`, `Record`).
*   `decorators.ts` — Metaprogramming annotations for classes, accessors, methods, and properties.

### 7. Real-world Integration
*   `UsingTSwithHtmlInputs/` — DOM element casting, managing `HTMLInputElement` properties, and type-safe browser event handling.

---

## 🛠️ Recommended Extension Setup

To optimize your developer experience while using this workspace, install the following extensions in **VS Code**:
*   **TypeScript Hero** — Optimized imports and file structural parsing.
*   **Error Lens** — Surface type validation errors inline right at the code breaking point.
*   **Prettier** — Automated code formatting using standard repository stylistic configuration rules.

---

## 📝 License
This project is open-source and free to use for personal educational tracking and local code experimentation.
