const core = require('@actions/core');
const github = require('@actions/github');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const reg = /(?<=\{)(.*?)(?=\})/g;

try {
    const webhook = core.getInput('webhook');
    const message = core.getInput('message');

    fetch(webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: message.match(reg) ? message : JSON.stringify({ content: message })
    }).then(async (res) => {
        if(res.status === 204) {
            core.setOutput("result", "Payload sent successfully");
        } else {
            core.setFailed(await res.text())
        }
    })
} catch (error) {
  core.setFailed(error.message);
}