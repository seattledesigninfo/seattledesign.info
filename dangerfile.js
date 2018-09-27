import { danger, warn } from "danger";

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn("Please include a description of your PR changes.");
}

// Check that someone has been assigned to this PR
if (danger.github.pr.assignee === null) {
  warn(
    "Please assign someone to merge this PR, and optionally include people who should review."
  );
}

// Request changes to src also include changes to tests.
const allFiles = danger.git.modified_files.concat(danger.git.created_files);
const hasAppChanges = allFiles.some(p => includes(p, "src/"));
const hasTestChanges = allFiles.some(p => includes(p, "__tests__/"));

if (hasAppChanges && !hasTestChanges) {
  warn(
    "This PR does not include changes to tests, even though it affects app code."
  );
}
