<template>
  <div class="container">
    <div style="float:right;">
      <router-link v-bind:to="'/register'">Add User  </router-link>             
    </div>
    <div class="form-signin-heading"></div>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="table-responsive">
          <table id="mytable" class="table table-sm table-condensed table-hover">
            <div>
              <tr v-if="users.length==0">
                <p style="text-align: center;">No User data found.</p>
              </tr>
            </div>
            <thead class="thead-dark">
              <th>User Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </thead>
            <tbody>
              <tr v-for="user in users" v-bind:key="user.id">
                <td>{{user.username}}</td>
                <td>{{user.firstname}}</td>
                <td>{{user.lastname}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.email}}</td>
                <td>
                  <button class="btn btn-sm btn-default" @click="redirectToEdit(user.username)">
                    <i class="fa fa-edit"></i>
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    class="btn btn-sm btn-default"
                    @click="showDeleteModal(user.id,showDelModal=true)"
                  >
                    <i class="fas fa-archive"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <div v-if="showDelModal">
              <transition name="modal">
                <div class="modal-mask">
                  <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Delete User:</h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true" @click="showDelModal=false">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">Are you sure you want to delete this user?</div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary btn-sm"
                            @click="showDelModal=false"
                          >Don't</button>
                          <button
                            type="button"
                            class="btn btn-sm btn-primary"
                            @click="deleteConfirm"
                          >Confirm</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-1"></div>
  </div>
</template>
<script>
import UserDataService from "../../services/UserDataService";
export default {
  name: "userlist",
  mounted() {
    this.getAllUsers();
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      showDelModal: false,
      deletableUserid: null
    };
  },
  methods: {
    getAllUsers() {
      UserDataService.findAll()
        .then(res => {
          this.users = res.data;
          console.log(this.users);
        })
        .catch(err => {
          console.log(err);
        });
    },
    redirectToEdit(id) {
      this.selectedUser = id;
      this.$router.push("/edituser/" + this.selectedUser);
    },
    showDeleteModal(id) {
      this.deletableUserid = id;
    },
    deleteConfirm() {
      UserDataService.deleteUser(this.deletableUserid)
        .then(res => {
          this.showDelModal = false;
          setTimeout(function() {
            alert(res.data.message);
          }, 1000);
          this.getAllUsers();
        })
        .catch(err => {
          console.log("Something went wrong...." + err);
        });
    }
  }
};
</script>

<style>
.form-signin-heading {
  text-align: center;
  margin-bottom: 30px;
}
.wrapper {
  margin-top: 80px;
  margin-bottom: 20px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-header {
  padding: 9px 9px;
  border-radius: 1px;
  border-bottom: 1px solid #eee;
  background-color: #0480be;
  -webkit-border-top-left-radius: 3px;
  -webkit-border-top-right-radius: 3px;
  -moz-border-radius-topleft: 3px;
  -moz-border-radius-topright: 3px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
</style>