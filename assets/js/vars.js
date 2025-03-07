import { Octokit } from "https://esm.sh/octokit";

async function getVars() {
  const octokit = new Octokit({ 
    auth: atob(atob(github.auth)),
  });
  const vars = await octokit.request('GET /repos/{owner}/{repo}/actions/variables', { owner: github.owner_name, repo: github.repository_name });
  return vars.data.variables.reduce((acc, curr) => {
    acc[curr.name] = curr.value;
    return acc;
  }, {});
}

document.addEventListener('DOMContentLoaded', async function() {
  const variables = await getVars();
  const elements = document.querySelectorAll('[data-variable]');
    elements.forEach(element => {
      const variableName = element.getAttribute('data-variable');
      if (variables[variableName]) {
        if (element.hasAttribute('value') || typeof element.value !== 'undefined') {
          element.value = variables[variableName];
        } else {
          element.innerText = variables[variableName];
        }
      }
    });
  });
