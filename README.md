# Add a message to the body of a PR via GitHub Action

A GitHub action for automatically adding a message to the end of a PR's body

## Usage

- Requires the `GITHUB_TOKEN` secret.
- Requires the message int the `msg` parameter.

### Sample workflow

```yml
name: add-message-to-pr

on: pull_request

jobs:
  add_msg:
    runs-on: ubuntu-latest
    steps:
    - uses:jenspetur94/add-message-to-body-pr@v1
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
        msg: 'message to be added'
```
