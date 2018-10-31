module.exports = {
  apps: [{
    name: "app",
    script: "dist/src/index.js",
    watch: false
  }],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      key: "/home/vadim/.ssh/id_rsa.pub",
      // SSH user
      user: "root",
      // SSH host
      host: ["31.184.252.42"],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: ["ForwardAgent=yes"],
      // GIT remote/branch
      ref: "origin/master",
      // GIT remote
      repo: "git@gitlab.com:ivadik05/concordia-server.git",
      // path in the server
      path: "/home/apps",
      // Pre-setup command or path to a script on your local machine
      'pre-setup': "apt-get install git  -y; ls -la",
      // // Post-setup commands or path to a script on the host machine
      // // eg: placing configurations in the shared dir etc
      // 'post-setup': "ls -la",
      // pre-deploy action
      'pre-deploy-local': "echo 'This is a local executed command'",
      // post-deploy action
      'post-deploy': "npm install",
    },
  }
};
