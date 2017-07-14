'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the minimal ' + chalk.red('TypeScript Service') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'First off, how would you like to name this project?',
        default: _.kebabCase(path.basename(process.cwd()))
      },
      {
        type: 'input',
        name: 'organizationName',
        message: 'Name of your organization (or user) at Docker Hub?',
        default: _.kebabCase(path.basename(path.dirname(process.cwd())))
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('src/index.ts'),
      this.destinationPath('src/index.ts'),
      {appname: this.props.projectName, orgname: this.props.organizationName}
    );
    this.fs.copyTpl(
      this.templatePath('test/index-spec.ts'),
      this.destinationPath('test/index-spec.ts'),
      {appname: this.props.projectName, orgname: this.props.organizationName}
    );

    this.fs.copy(
      this.templatePath('_vscode/tasks.json'),
      this.destinationPath('.vscode/tasks.json')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {appname: this.props.projectName, orgname: this.props.organizationName}
    );

    this.fs.copy(
      this.templatePath('_vscode/settings.json'),
      this.destinationPath('.vscode/settings.json')
    );
    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copy(
      this.templatePath('_tslint.json'),
      this.destinationPath('tslint.json')
    );
    this.fs.copy(
      this.templatePath('_jasmine.json'),
      this.destinationPath('jasmine.json')
    );
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('dockerignore'),
      this.destinationPath('.dockerignore')
    );
    this.fs.copy(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile')
    );

    // This.fs.copy(
    //   this.templatePath('README.md'),
    //   this.destinationPath('README.md')
    // );
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true,
    });
  }
};
