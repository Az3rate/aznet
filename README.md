## 2024-06-09
- Fixed major terminal bugs: input focus, prompt duplication, and autocomplete now work reliably.
- Refactored prompt/input handling: event listeners are re-attached after each prompt, and printPrompt was removed (was undefined).
- If you experience input issues, ensure you are using the latest code and that appendPrompt is called for every new prompt. 