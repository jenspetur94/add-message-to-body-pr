const core = require('@actions/core');
const github = require('@actions/github');

exports.run = async function (token, msg){
	try{
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
		core.endGroup();
	}catch(error){
		core.error(error);
		core.setFailed(error.message);
	}
}
