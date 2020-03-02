const core = require('@actions/core');
const github = require('@actions/github');

async function run(){
	try {
		const inputs = {
			token: core.getInput('repo-token', {required: true}),
			msg: core.getInput('msg', {required: true})
		};

		const request = {
			owner: github.context.repo.owner,
			repo: github.context.repo.repo,
			pull_number: github.context.payload.pull_request.number
		}
		const currentBody = github.context.payload.pull_request.body;
		const shouldUpdateBody = !currentBody.includes(inputs.msg);
		
		if(shouldUpdateBody){
			request.body = currentBody.concat('\n\n', inputs.msg);
			core.debug(`Added ${inputs.msg} to end of body.`)
		}else{
			core.warning('Body contains message. Body was not updated');
			return;
		}

		const client = new github.GitHub(inputs.token);
		const response = await client.pulls.update(request);
		
		core.info(`response: ${response.status}`);
		if(response.status !== 200){
			core.error('Failed to update pull request');
		}
	}
	catch(error){
		core.error(error);
		core.setFailed(error.message);
	}
}

run()
