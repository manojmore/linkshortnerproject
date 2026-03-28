# AI PR Reviewer Tool

## Tool Name

**Copilot PR Reviewer Lite**

---

## 📌 Overview

This is a lightweight local tool designed to assist in code reviews using GitHub Copilot.
It generates a structured prompt by combining:

* Code differences between two branches
* Story requirements and acceptance criteria

This prompt can then be pasted into Copilot Chat to perform a detailed code review and get structured feedback.

---

## ⚙️ Steps to Use the Tool

1. Download **DevTools.rar** from:
   https://github.com/manojmore/linkshortnerproject/tree/feature/code_review_test

2. Unzip the file to a local directory (e.g., `C:\DevTools\AI-PR-Reviewer`)

3. Update file paths in:

   ```
   scripts\generate-review.ps1
   ```

4. Update the story content in:

   ```
   input\story.txt
   ```

   Include:

   * Story description
   * Acceptance criteria

5. Open **PowerShell ISE**

6. Navigate to your project repository:

   ```
   cd C:\projects\project1
   ```

7. Run the script: Change the branch names here.

   ```
   C:\DevTools\AI-PR-Reviewer\scripts\generate-review.ps1 "master" "feature/code_review_test" "C:\DevTools\AI-PR-Reviewer\input\story.txt"
   ```

8. Copy the generated prompt from:

   ```
   output\copilot_prompt.txt
   ```

9. Paste it into Copilot Chat and execute

---

## 🧠 What This Tool Does

This tool:

### Takes:

* Base branch
* Feature branch
* Story file

### Generates:

* Git diff between branches
* A structured, ready-to-use Copilot prompt

### Output:

* Prompt saved to file
* Prompt copied to clipboard

---

## ✅ When to Use

This approach works best for:

* Small PRs
* Limited file changes
* Focused feature implementations

It helps quickly validate:

* Requirement coverage
* Code quality
* Bugs and edge cases

---

## ⚠️ Limitations

* Not suitable for large PRs
* Large diffs may exceed Copilot input limits
* Prompt size can become too large, reducing accuracy
* Manual copy-paste required

---

## 🚀 Next Approach (For Large PRs)

Handling large PRs requires improving this approach.

### Problem:

Large PRs produce very large diffs → poor Copilot performance

### Solution:

Evolve into a **chunked review strategy**

### Enhancements:

* Modify script to get changed files
* Process:

  * File-by-file OR
  * Batch multiple files
* Generate smaller, focused prompts

### Benefits:

* Better accuracy
* Avoid token limits
* Scalable for large PRs

---

## 📈 Future Improvements

* Batch processing of files
* Intelligent file grouping
* Automated prompt generation per chunk
* Potential integration with PR systems

---

## 📌 Summary

This tool provides a **quick, low-effort way to leverage Copilot for PR reviews** without any infrastructure setup. It is ideal as a starting point and can be extended to support larger and more complex pull requests.

---
