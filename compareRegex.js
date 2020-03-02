const core = require('@actions/core');
const github = require('@actions/github');

async function run(){
	try{
		const inputs = {
			token:core.getInput('repo-token', {required: true}),
			regex: new Regex(core.getInput('regex', {required: true}))
		};

		const request = {
			owner: github.context.repo.owner,
			repo: github.context.repo.repo,
			pull_number: github.context.payload.pull_request.number
		}
		const currentTitle = github.context.payload.pull_request.title;
		const titleIsValid = inputs.regex.test(currentTitle);
		if(!titleIsValid){
			core.error(`Title did not match patter: ${inputs.regex.toString()}`);
		}

	}
	catch(error){
		core.error(error);
		core.setFailed(error.message);
	}
}

run()
