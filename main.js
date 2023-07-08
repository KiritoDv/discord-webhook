const core = require('@actions/core');
const github = require('@actions/github');
const reg = /(?<=\{)(.*?)(?=\})/g;

try {
    const webhook = core.getInput('webhook');
    const message = core.getInput('message');

    fetch(webhook, {
        method: 'POST',
        body: message.match(reg) ? message : JSON.stringify({ content: message })
    }).then(res => res.json()).then(res => {
        core.setOutput("result", JSON.stringify(res));

        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
    })
} catch (error) {
  core.setFailed(error.message);
}