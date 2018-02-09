# VSTS Build Extensions from the League

## Description

This project exists to add common build and release tasks to support workflows that are encouraged by [the League](http://aka.ms/theleague).

There are language specific tasks, as well as general purpose tasks.  These tasks also augment and support pipelines built by the [Yo Team](https://github.com/darquewarrior/generator-team) generator.

## Contributing

### CI

This project is being built in VSTS.  The build definition is in `.vsts-ci.yml`.

### Common

* Create a Branch (or fork the project and create a branch).

### Fixing a bug

* If you are not changing the behavior of a task, you can dig right in and fix the bug (making sure all tests pass).

### Modifying an existing task

* We start with the documentation. Edit the `overview.md` document to add the documentation for the task you want to add, including any inputs it may take.
* Start a pull request with those edits to the `overview.md` and after the documentation looks good to the maintainers, we can start updating the task itself.
* Continue to update the pull request with the changes to the task.
* NEED MORE STEPS HERE

### Creating a new task

* We start with the documentation. Edit the `overview.md` document to add the documentation for the task you want to add, including any inputs it may take.
* Start a pull request with those edits to the `overview.md` and after the documentation looks good to the maintainers, we can start adding the task itself.
* Create a folder for your task.  This folder must have a [`task.json` file](https://docs.microsoft.com/en-us/vsts/extend/develop/build-task-schema).
* NEED MORE STEPS HERE
