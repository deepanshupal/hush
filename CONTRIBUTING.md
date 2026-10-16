# Contributing to Hush

Thanks for wanting to help! Hush is a small, friendly project and every kind of
contribution is welcome: bug reports, fixes, translations, docs, design
feedback and new ideas.

## Ways to help

- **Report a bug.** [Open an issue](https://github.com/DeepanshuPal/hush/issues)
  with your Hush and macOS versions, what you did, and what happened. Logs are in
  _Settings → About → Log directory_ (`hush.log`); check them for anything
  private before attaching.
- **Suggest an idea.** Open an issue describing the problem you want solved.
  Explaining _why_ helps more than a finished design.
- **Translate.** See [CONTRIBUTING_TRANSLATIONS.md](CONTRIBUTING_TRANSLATIONS.md).
- **Send a pull request.** Small, focused PRs are easiest to review. For larger
  changes, open an issue first so we can agree on the approach.

## Development setup

See [BUILD.md](BUILD.md). In short:

```bash
git clone https://github.com/DeepanshuPal/hush.git
cd hush
bun install
CMAKE_POLICY_VERSION_MINIMUM=3.5 bun run tauri dev
```

## Before you open a PR

```bash
bun run lint                # ESLint (also catches untranslated UI strings)
bunx tsc --noEmit           # TypeScript
bun run check:translations  # every locale has every key
bun run format              # Prettier + cargo fmt
cd src-tauri && cargo clippy && cargo test --lib
```

- **UI text** goes through i18next: add the English string to
  `src/i18n/locales/en/translation.json` and use `t("key")`. If you can't
  translate a new key, copy the English text into the other locales so
  `check:translations` passes, and say so in the PR.
- **Colors** come from the design tokens in `src/styles/theme.css` (`bg-surface`,
  `text-text-muted`, `bg-accent`, …). Don't hard-code hex values in components,
  and check both light and dark mode.
- **Privacy:** never log transcript text in release builds (use
  `utils::redact_text`), never log settings or API keys, and don't add network
  calls the user didn't ask for.
- Use American English in UI text and docs.
- Commit messages: say _why_ the change is needed, not just what changed.

## Code of conduct

Be kind and assume good intent. Harassment or personal attacks aren't welcome
in issues, PRs or anywhere else in the project.

## License

By contributing you agree that your contributions are released under the
[MIT License](LICENSE).
