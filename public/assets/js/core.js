new Vue({
    el: '#projects',

    data: {
        projects: [],
        project: { id: '', name: '', goal: '', percentage: 0 }
    },

    ready: function(){
        this.fetchAllProjects();
    },

    methods: {

        fetchAllProjects: function () {
            this.$http.get('/api/projects')
                .success(function (projects) {
                    this.$set('projects', projects);
                })
                .error(function (error) {
                    console.error(error);
                });
        },

        addProject: function () {
            if (this.project.name) {
                this.$http.post('/api/projects', this.project)
                    .success(function (response) {
                        this.projects.push(this.project);
                        this.project = {}
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
        },

        updateProject: function (project) {
            console.log(project);

            this.$http.put('/api/projects/' + project.id, project)
                .success(function (res) {

                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
});
