new Vue({
    el: '#projects',

    data: {
        projects: []
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
        }
    }
});
