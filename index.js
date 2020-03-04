const core = require('@actions/core');
const github = require('@actions/github');


async function run(){
	try{
		const inputs = {
			token: core.getInput('repo-token', {required: true}),
			msg: core.getInput('msg', {required: true}),
			regex: new Regex(core.getInput('regex', {required: false}))
		};
		await messageToDescription(token, msg);
		if(regex !== ''){
			await compareRegex(regex);
		}
	}
	catch(error){
		core.error(error.message);
		core.setFailed(error.message);
	}
}

async function messageToDescription(token, msg){
	const request = {
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: github.context.payload.pull_request.number
	}
	const currentBody = github.context.payload.pull_request.body;
	const shouldUpdateBody = !currentBody.includes(msg);
	
	if(shouldUpdateBody){
		request.body = currentBody.concat('\n\n', msg);
		core.debug(`Added ${msg} to end of body.`)
	}else{
		core.warning('Body contains message. Body was not updated');
		return;
	}
	
	const client = new github.GitHub(token);
	const response = await client.pulls.update(request);
	
	core.info(`response: ${response.status}`);
	if(response.status !== 200){
		core.error('Failed to update pull request');
	}
	core.debug('description was updated successfully!');
	return;
}

async function compareRegex(token, regex){
	const request = {
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		pull_number: github.context.payload.pull_request.number
	}
	const currentTitle = github.context.payload.pull_request.title;
	const titleIsValid = regex.test(currentTitle);
	if(!titleIsValid){
		core.error(`Title did not match patter: ${regex.toString()}`);
		throw new Error(`Title did not match patter: ${regex.toString()}`);
	}
	core.debug('Title matched the pattern!');
	return;
}

run();
