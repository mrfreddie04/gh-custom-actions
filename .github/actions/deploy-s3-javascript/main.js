const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  //1) Get input values - information about deployment target
  //required throws an error if not input is provided
  const bucket = core.getInput("bucket", {
    required: true
  });
  const bucketRegion = core.getInput("bucket-region", {
    required: true
  });
  const distFolder = core.getInput("dist-folder", {
    required: true
  });

  //github.getOctokit() - use to make requests to GA REST API
  //github.context - access to some context objects

  //2) Upload deployment files to AWS S3
  //- we can use AWS SDK
  //- we can use exec package to run a cmd command, ubuntu image contains AWS CLI
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  core.notice("Website deployed to AWS S3");
}

run();