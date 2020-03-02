import { compareRegex } from './src/compareRegex';
import { messageToDescription } from './src/messageToDescription;'

const core = require('@actions/core');
const github = require('@actions/github');


async function run(){
	try{
		const inputs = {
			token: core.getInput('repo-token', {required: true}),
			msg: core.getInput('msg', {required: true}),
			regex: core.getInput('regex', {required: false})
		};

		core.group('addMessage', messageToDescription(inputs.token, inputs.msg));
		core.startGroup('addMessage')

		if(regex !== ''){
			core.group('compareRegex', compareRegex(inputs.token, inputs.regex))
		}

	}
}
