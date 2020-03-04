
const core = require('@actions/core');
const github = require('@actions/github');
const compareRegex = require('./src/compareRegex');
const messageToDescription = require('./src/messageToDescription');


async function run(){
	try{
		const inputs = {
			token: core.getInput('repo-token', {required: true}),
			msg: core.getInput('msg', {required: true}),
			regex: core.getInput('regex', {required: false})
		};

		core.group('addMessage', messageToDescription.run(inputs.token, inputs.msg));
		core.group('compareRegex', compareRegex.run(inputs.token, inputs.regex));
		core.startGroup('addMessage');

		if(regex !== ''){
			core.startGroup('compareRegex');
		}

	}
	catch(error){
		core.error(error);
		core.setFailed(error.message);
	}
}

run()
