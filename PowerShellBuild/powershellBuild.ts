
import fs = require('fs');
import path = require('path');
import os = require('os');
import tl = require('vsts-task-lib/task');
import tr = require('vsts-task-lib/toolrunner');


async function run() {
    try {
        tl.setResourcePath(path.join(__dirname, 'task.json'));
        let buildScriptPath = path.join(__dirname, 'build.ps1');
        let actionType = tl.getInput('actionType', false);
        let powershell = tl.tool(tl.which('powershell', true))
            .arg('-NoLogo')
            .arg('-NoProfile')
            .arg('-NonInteractive')
            .arg('-Command')
            .arg(`. '${buildScriptPath.replace("'", "''")}' -${actionType}`);
        let options = <tr.IExecOptions>{
            cwd: '',
            env: {},
            silent: false,
            failOnStdErr: false,
            ignoreReturnCode: true,
            errStream: process.stdout, // Direct all output to STDOUT, otherwise the output may appear out
            outStream: process.stdout, // of order since Node buffers it's own STDOUT but not STDERR.
            windowsVerbatimArguments: false
        };

        // Listen for stderr.
        let stderrFailure = false;
        if (true) {
            powershell.on('stderr', (data) => {
                stderrFailure = true;
            });
        }

        // Run bash.
        let exitCode: number = await powershell.exec(options);

        // Fail on exit code.
        if (exitCode !== 0) {
            tl.setResult(tl.TaskResult.Failed, `Exited with a ${exitCode}`);
        }

        // Fail on stderr.
        if (stderrFailure) {
            tl.setResult(tl.TaskResult.Failed, 'Task failed.');
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message || 'run() failed');
    }
}

run();
