const core = require('@actions/core');
const github = require('@actions/github');

exports.run = async function (token, regex){
	const request = {
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: github.context.payload.pull_request.number
	}
	const currentTitle = github.context.payload.pull_request.title;
	const titleIsValid = regex.test(currentTitle);
	if(!titleIsValid){
		core.error(`Title did not match patter: ${regex.toString()}`);
	}
	core.endGroup();
}
