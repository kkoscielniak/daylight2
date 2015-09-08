new Vue({
    el: '#projects',

    data: {
        projects: [],
        project: { name: '', goal: '' }
    },

    ready: function(){
        this.fetchAllProjects();
    },

    methods: {

        fetchAllProjects: function() {
            this.$http.get('/api/projects')
                .success(function(projects){
                    this.$set('projects', projects);
                })
                .error(function(error){
                    console.error(error);
                });
        },

        addProject: function() {
            if(this.project.name) {

                this.$http.post('/api/projects', this.project)
                    .success(function(response){
                        this.projects.push(this.project);
                    })
                    .error(function(error){
                        console.log(error);
                    });
            }
        }
    }
});
