# Grammar Practice Update Plan

## Objective
Enhance the Grammar tab’s “Multiple Choice” section by:
- Introducing additional sets of questions categorized into **easy**, **medium**, and **advanced**.
- Implementing a **randomization mechanism** so users encounter different sequences of questions each time.

## Proposed Changes

### 1. Update Question Data Structure
- **Modify the existing questions array** in the GrammarPractice component.
- **Add additional questions** for each difficulty level:
  - **Easy**: Questions that follow basic Swedish grammar rules.
  - **Medium**: Questions with intermediate complexity.
  - **Advanced**: Questions that require more in-depth knowledge and analysis.
- **Update the difficulty field** for new and existing questions to use the new categories (e.g., change `'beginner'` to appropriate levels like `'easy'`).

### 2. Modify Filtering Logic
- Replace the hard-coded filtering `q.difficulty === 'beginner'` with a mechanism that:
  - **Allows users to select the desired difficulty level**.
  - **Filters questions** based on the selected category (easy, medium, advanced).

### 3. Implement Randomization
- Create a **shuffle function** to randomize the order of questions displayed.
- **Integrate the shuffle** in the component so every new session or upon loading, the filtered questions are presented in a random order.

### 4. Testing and Validation
- **Verify** that only questions adhering strictly to Swedish grammar rules are included.
- **Test** the randomization mechanism across multiple sessions to ensure a varied sequence.
- **Ensure** navigation (Next Question button) functions properly with the new data and order.

## Next Steps
- **Switch to Code Mode**: Proceed to implement the required changes in the actual TSX files.
- **Update** the questions list and logic in the GrammarPractice component accordingly.
  
This plan outlines the necessary steps to achieve the task requirements.