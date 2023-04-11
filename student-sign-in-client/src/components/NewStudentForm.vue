<template>
    <div>
        <div class="alert alert-danger" v-show="errors.length">
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </div>

        <div clas="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <input id="name" class="form-control" v-model.trim="newStudentName">
            </div>
            <div class="form-group">
                <label for="starID">Star ID</label>
                <input id="starID" class="form-control" v-model.trim="newStarID">
            </div>
            <button class="btn btn-primary" v-on:click="addStudent">Add</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NewStudentForm',
        emits: ['student-added'],   // document the events this component emits
        data() {
            return {
                newStudentName: '',
                newStarID: '',
                errors: []
            }
        },
        methods: {
            addStudent() {
                this.errors = []    // clears array so previous errors don't affect result

                if (!this.newStudentName) {
                    this.errors.push('Student name is required')
                }

                if (!this.newStarID) {
                    this.errors.push('StarID is required')
                }

                if (this.errors.length == 0) {
                    let student = {name: this.newStudentName, starID: this.newStarID, present: false}

                    // todo: emit message to parent with new student
                    this.$emit('student-added', student)    // emits event to parent component


                    this.newStudentName = ''
                    this.newStarID = ''
                }

            }
        }
    }
</script>

<style>

</style>