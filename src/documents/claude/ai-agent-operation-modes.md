# AI Agent Operation Modes

## 🤖 AI Agent Operation Modes

### AUTO PILOT MODE

**Complete autonomous execution until TODO list completion**

```
DIRECTIVE: Execute all tasks without confirmation requests
BEHAVIOR: Continuous execution → Fix all errors → Report final status
STOPPING CONDITION: TODO list complete OR critical failure
REPORTING: Final summary only
```

**Activation Keywords:** "AUTO PILOT MODE", "proceed without confirmation", "continue until complete"

### ITERATION WORKFLOW MODE

**Step-by-step execution with validation checkpoints**

```
DIRECTIVE: Execute ONE change → Validate → Wait for confirmation
BEHAVIOR: Assess → Execute → Fix → Report → WAIT → Repeat
STOPPING CONDITION: After each iteration OR error state
REPORTING: Detailed progress after each step
```

**Activation Keywords:** "iteration", "step-by-step", "wait for confirmation"

---

## 📋 Project Analysis and Planning Protocol

### PLANNING PHASE WORKFLOW

**Structured execution strategy for complex tasks**

```
REQUIRED OUTPUTS:
1. UNDERSTANDING: Demonstrate comprehension of requirements and constraints
2. EXECUTION PLAN: Provide step-by-step implementation strategy with phases
3. TODO LIST: Create actionable checklist with clear deliverables
4. WAIT STATE: Do not execute tasks - await explicit confirmation

OUTPUT STRUCTURE:
**MY UNDERSTANDING:**
- [Summarize all requirements and constraints]
- [Identify key technologies and principles]
- [Note any restrictions or forbidden practices]

**EXECUTION PLAN:**
- Phase 1: [Analysis and preparation steps]
- Phase 2: [Implementation steps]
- Phase 3: [Quality assurance steps]
- Phase 4: [Documentation and completion steps]

**TODO CHECKLIST:**
- [ ] Task 1: [Specific actionable item]
- [ ] Task 2: [Specific actionable item]
- [ ] Task N: [Specific actionable item]

**STATUS:**
AWAITING CONFIRMATION OR DIRECTIVE TO PROCEED

AGENT BEHAVIOR:
- Do NOT begin implementation
- Do NOT make assumptions about next steps
- Do NOT execute any file operations
- WAIT for explicit "PROCEED" or modified instructions
- Respond ONLY with analysis and planning information
```

### SYSTEMATIC ENGINEERING APPROACH

**Code with deterministic precision, not trial-and-error**

**PROBLEM CLASSIFICATION FRAMEWORK:**

**Type A: Well-Defined Problems (Single-Pass Approach)**

- Characteristics: Clear requirements, known patterns, established solutions
- Examples: CRUD operations, standard integrations, documented APIs
- Approach: Deep analysis → Complete implementation → Validation

**Type B: Complex Problems (Structured Iteration)**

- Characteristics: Multiple unknowns, integration complexity, performance constraints
- Examples: System architecture, optimization, multi-service integration
- Approach: Analysis → Prototype → Validate → Refine → Complete

**Type C: Exploratory Problems (Research-First Approach)**

- Characteristics: New technologies, unclear requirements, proof-of-concept
- Examples: New framework adoption, algorithm development, experimental features
- Approach: Research → Spike → Learn → Design → Implement

**REQUIREMENTS:**

- Analyze problem completely before coding
- Predict outcomes before implementation
- Apply engineering principles systematically
- Solve problems in single iteration when possible

**EXECUTION:**

- Deep inspection → Deep analysis → Appropriate solution approach
- No ad-hoc development
- No iterative guessing without purpose
- Deliver complete, working solutions

**EXPECTATION:** Right amount of analysis for problem complexity

---

## 🎯 Core Development Principles

### Systematic Engineering Approach

- **No Trial-and-Error**: Analyze completely before coding
- **Predict Outcomes**: Know expected results before implementation
- **One-Shot Solutions**: Solve problems in single execution
- **Deterministic Code**: Same inputs produce consistent outputs

### SOLID Principles Application

- **Single Responsibility**: Each file has one clear purpose
- **Open/Closed**: Extend functionality without modifying existing code
- **Liskov Substitution**: Derived classes must be substitutable
- **Interface Segregation**: Create focused, client-specific interfaces
- **Dependency Inversion**: Depend on abstractions, not implementations

### Testability First Methodology

- **Pure Functions**: Create functions without side effects
- **Injectable Dependencies**: Make all dependencies explicit
- **Small, Focused Units**: Single responsibility per function/class
- **Clear Contracts**: Define explicit input/output interfaces

---

## 🔄 Mode-Specific Execution Protocols

### AUTO PILOT MODE Protocol

```
EXECUTION SEQUENCE:
1. Read complete TODO list
2. Execute all tasks systematically
3. Apply quality standards automatically
4. Fix all errors without stopping
5. Run complete validation suite
6. Report final status with summary

QUALITY GATES (Applied Automatically):
✅ All TypeScript errors resolved
✅ All ESLint violations fixed
✅ All Prettier formatting applied
✅ All tests passing
✅ Coverage requirements met
```

### ITERATION WORKFLOW MODE Protocol

```
SINGLE ITERATION SEQUENCE:
1. PRE-ASSESSMENT: State what, why, expectations, risks
2. ONE CHANGE RULE: Single file modification OR single new file
3. QUALITY VALIDATION: Fix TypeScript/ESLint/Prettier errors
4. VERIFICATION: Secondary check of all fixes
5. PROGRESS REPORT: Files modified, errors fixed, next task
6. WAIT: Stop and await confirmation

THE ONE CHANGE RULE:
- ADD: Create ONE new file only
- EDIT: Modify ONE file only
- NEVER: Multiple changes in single iteration
```
