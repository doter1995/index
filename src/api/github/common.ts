import {Octokit} from "@octokit/core";

import config from "../../config";
const octokit = new Octokit({ auth: config.github.token });

export default octokit;
