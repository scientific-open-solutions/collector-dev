window.onload=function(){
  const ipc      = require('electron').ipcRenderer;

  wait_for_collector = setInterval(function(){
    if(typeof(Collector) !== "undefined"){
      clearInterval(wait_for_collector);
      Collector.electron = {
        fs: {
          delete_experiment: function(
            exp_name,
            file_action
          ){
            delete_response = ipc.sendSync('fs_delete_project',{
              "exp_name" : exp_name
            });
            file_action(delete_response);
          },
          delete_file: function(
            file_path
          ){
            return ipc.sendSync(
              'fs_delete_file',{
                "file_path": file_path
              }
            );
          },
          delete_survey: function(
            survey_name,
            file_action
          ){
            return ipc.sendSync('fs_delete_survey',{
              "survey_name" : survey_name
            });
          },
          delete_code: function(
            exp_name,
            file_action
          ){
            delete_response = ipc.sendSync('fs_delete_code',{
              "trialtype_name" : exp_name
            });
            file_action(delete_response);
          },
          list_code: function(){
            return ipc.sendSync('fs_list_code');
          },
          list_projects: function(){
            var projects = JSON.parse(ipc.sendSync(
              'fs_list_projects'
            ));
            projects = projects.filter(
              item => item.indexOf(".json") == -1
            )
            return projects;
          },
          home_dir: function(){
            return ipc.sendSync('fs_home_dir')
          },
          read_default: function(
            user_folder,
            this_file
          ){
            file_content = ipc.sendSync('fs_read_default',{
              "user_folder" : user_folder,
              "this_file"   : this_file
            });
            return file_content;
          },
          read_file: function(
            user_folder,
            this_file
          ){
            file_content = ipc.sendSync('fs_read_file',{
              "user_folder" : user_folder,
              "this_file"   : this_file
            });
            return file_content;
          },
          write_data: function(
            project_folder,
            this_file,
            file_content
          ){
            write_response = ipc.sendSync('fs_write_data',{
              "project_folder"  : project_folder,
              "this_file"          : this_file,
              "file_content"       : file_content
            });
            return write_response;
          },
          write_project: function(
            this_project,
            file_content,
            file_action
          ){
            write_response = ipc.sendSync('fs_write_project',{
              "this_project" : this_project,
              "file_content"    : file_content
            });
            file_action(write_response);
          },
          write_file: function(
            user_folder,
            this_file,
            file_content
          ){
            write_response = ipc.sendSync('fs_write_file',{
              "user_folder"  : user_folder,
              "this_file"    : this_file,
              "file_content" : file_content
            });
            return write_response;
          }
        },
        git:{
          add_changes: function(repo_info){
            return ipc.sendSync(
              'git_add_changes',
              repo_info
            );
          },
          add_repo: function(repo_info){
            return ipc.sendSync(
              'git_add_repo',
              repo_info
            );
          },
          add_token: function(auth_token){
            return ipc.sendSync(
              'git_add_token',{
              "auth_token": auth_token
            });
          },
          delete_org: function(org_info){
            return ipc.sendSync(
              'git_delete_org',
              org_info
            )
            return this_response;
          },
          delete_repo: function(repo_info){
            return ipc.sendSync(
              'git_delete_repo',
              repo_info
            )
            return this_response;
          },
          exists: function(){
            return ipc.sendSync('git_exists');
          },
          list_repos: function(){
            return ipc.sendSync('git_list_repos');
          },
          pages: function(repo_info){
            return ipc.sendSync(
              'git_pages',
              repo_info
            );
          },
          pull: function(repo_info){
            return ipc.sendSync(
              'git_pull',
              repo_info
            );
          },
          push: function(repo_info){
            return ipc.sendSync(
              'git_push',
              repo_info
            );
          },
          set_email: function(email){
            return ipc.sendSync(
              'git_set_email',
              {
                email: email
              }
            )
          },
          set_name: function(name){
            return ipc.sendSync(
              'git_set_name',
              {
                name: name
              }
            )
          },
          status: function(repo_info){
            return ipc.sendSync('git_status', {
              organization: repo_info.organization,
              repository: repo_info.repository
            });
          },
          switch_repo: function(repo_info){
            return ipc.sendSync(
              'git_switch_repo',
              repo_info
            )
          },
          token_exists: function(){
            return ipc.sendSync(
              'git_token_exists',
              {}
            )
          },
          valid_org: function(repo_info){
            return ipc.sendSync(
              'git_valid_org',
              repo_info
            )
          }
        },
        open_folder: function(folder){
          return ipc.sendSync(
            'open_folder',
            {
              folder: folder
            }
          );
        }
      }
    }
  },100);
}