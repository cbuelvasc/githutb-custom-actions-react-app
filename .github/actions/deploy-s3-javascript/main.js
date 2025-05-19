const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    // 1)  Get some inputs values
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // 2)  Upload the files to the S3 bucket
    const s3Uri = `s3://${bucket}`;
    const upload = await exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    core.notice(`Uploaded ${distFolder} to ${s3Uri}`);

    core.notice('Hello from my custom JavaScript action!');
}

run();