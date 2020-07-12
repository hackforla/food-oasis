## Static Code Analysis (eslint)

This project uses Husky and Lint-Staged to automatically perform static analysis tasks on all added / modified files. Each time you try to commit it will run the `lint-staged` command and report any issues. Be warned, all "errors" reported by eslint will not allow the commit until they are resolved. Developers can opt to pass `--no-verify` flag to git commit to bypass these rules but it is not advised. If for whatever reason you want to ignore certain rules in a specific situation you can use comments like this: `//eslint-disable-next-line` or `//eslint-disable-line`.

1.  Run `npm install` on root
2.  Configure your IDE to use the `.eslintrc.js` and `.prettierc` file on root. (For VSCode editor, the .vscode/.settings.json file from the repo will set up Prettier as your default formatter, enable format on save, and disable format on paste.)
