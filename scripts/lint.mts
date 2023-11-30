import { $, lintScript } from "isaacscript-common-node";

await lintScript(async () => {
  const promises: Array<Promise<unknown>> = [];

  promises.push(
    // Use Prettier to check formatting.
    // - "--log-level=warn" makes it only output errors.
    $`prettier --log-level=warn --check .`,

    // Use ESLint to lint the TypeScript.
    // - "--max-warnings 0" makes warnings fail, since we set all ESLint errors to warnings.
    $`eslint --max-warnings 0 .`,

    // Spell check every file using CSpell.
    // - "--no-progress" and "--no-summary" make it only output errors.
    $`cspell --no-progress --no-summary .`,

    // Check for unused CSpell words.
    $`cspell-check-unused-words`,

    // @template-customization-start

    // Check template files.
    $`isaacscript check-ts --ignore .eslintrc.cjs,build.ts,knip.jsonc,LICENSE,lint.ts,tsconfig.eslint.json,tsconfig.json`,

    // Check for invalid YAML files.
    $`bash ./image-generator/check_valid.sh`,

    // Check for unused YAML files.
    $`python ./image-generator/check_unused.py`,

    // @template-customization-end
  );

  await Promise.all(promises);
});
