$(document).ready(function(){
   $('#searchUser').on('keyup', function(e){
       let username = e.target.value;

       //make request to Github
       $.ajax({
           url:'https://api.github.com/users/'+username,
           data:{
               client_id:'457bcac9b0fc38cbbd57',
               client_secret:'ea4e4c683c187bb1bec6bb5e968a650bfb01ac78'
           }
       }).done(function(user){
           $.ajax({
            url:'https://api.github.com/users/'+username+'/repos',
            data:{
                client_id:'457bcac9b0fc38cbbd57',
                client_secret:'ea4e4c683c187bb1bec6bb5e968a650bfb01ac78',
                sort: 'created: asc',
                per_page: 5

            }
           }).done(function(repos){
               $.each(repos, function(index, repo){
                   $('#repos').append(`
                   <div class="well">
                   <div class="row">
                   <div class="col-md-6">
                   <strong>${repo.name}</strong>: ${repo.description}
                   </div>
                   <div class="col-md-4">
                   <button type="button" class="btn btn-danger">Forks: ${repo.forks_count}</button>
                   <button type="button" class="btn btn-primary">Watchers: ${repo.watchers_count}</button>
                   <button type="button" class="btn btn-success">Stars: ${repos.stargazers_count}</button>
                   </div>
                   <div class="col-md-2">
                   <a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo Page</a>
                   </div>
                   </div>
                   </div>
                   `);
               });
           });

           $('#profile').html(`
           <div class="panel panel-default">
              <div class="panel-heading">
              <h3 class="panel-title">${user.name}</h3>
              </div>
              <div class="panel-body">
              <div class="row">
              <div class="col-md-3">
              <img class="thumbnail avatar" src="${user.avatar_url}">
              <br><br>
              <a target="_blank" class="btn btn-warning btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <button type="button" class="btn btn-danger">Public Repos: ${user.public_repos}</button>
              <button type="button" class="btn btn-primary">Public Gists: ${user.public_gists}</button>
              <button type="button" class="btn btn-success">Followers: ${user.followers}</button>
              <button type="button" class="btn btn-info">Following: ${user.following}</button>
              <br><br>
              <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
              </div>
              </div>
           </div>
           <br><br>
           <h2 class="page-header">Latest Repos</h2><hr>
           <div id="repos"></div>
           `);
       });
   });
});