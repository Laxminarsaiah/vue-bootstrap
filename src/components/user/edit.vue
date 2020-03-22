<template>
  <div class="container">
    <div class="row"></div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class>
          <form class="form-signin" method="PUT">
            <h3 class="form-signin-heading">Edit User</h3>
            <span id="reauth-email" class="reauth-email"></span>

            <input
              type="text"
              v-model="user.username"
              name="username"
              id="username"
              class="form-control"
              placeholder="Username"
              required
              readonly
            />
            <br />
            <input
              type="text"
              v-model="user.firstname"
              name="firstname"
              id="firstname"
              class="form-control"
              placeholder="Firstname"
              required
              autofocus
            />
            <br />
            <input
              type="text"
              v-model="user.lastname"
              name="lastname"
              id="lastname"
              class="form-control"
              placeholder="Lastname"
              required
              autofocus
            />
            <br />
            <input
              type="text"
              v-model="user.phone"
              name="phone"
              id="phone"
              class="form-control"
              placeholder="Phone"
              required
              autofocus
            />
            <br />
            <input
              type="email"
              v-model="user.email"
              name="email"
              id="email"
              class="form-control"
              placeholder="Email"
              required
              autofocus
            />
            <br />
            <div>
              <button
                class="btn btn-md btn-warning btn-signin"
                type="button"
                @click="cancel()"
              >Don't</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                class="btn btn-md btn-success btn-signin"
                type="button"
                @click="updateUser"
              >Save Changes</button>
            </div>
          </form>
          <!-- /form -->
        </div>
        <!-- /card-container -->
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
export default {
  name: "edituser",
  mounted() {
    this.getUserByName();
  },
  data() {
    return {
      user: {
        id: null,
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: ""
      },
      userid: null
    };
  },
  methods: {
    cancel() {
      window.location.href = "/listuser";
    },
    getUserByName() {
      //   alert(this.$route.params.id)
      UserDataService.findByName(this.$route.params.id)
        .then(res => {
          if (res) {
            this.user.id = res.data[0].id;
            this.user.username = res.data[0].username;
            this.user.firstname = res.data[0].firstname;
            this.user.lastname = res.data[0].lastname;
            this.user.phone = res.data[0].phone;
            this.user.email = res.data[0].email;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateUser() {
      var indata = {
        username: this.user.username,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone
      };
      UserDataService.updateUser(this.user.id, indata)
        .then(res => {
          if (res) {
            alert(res.data.message);
            window.location.href = "/listuser";
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.wrapper {
  margin-top: 80px;
  margin-bottom: 20px;
}

.form-signin {
  max-width: 420px;
  padding: 40px 38px 66px;
  margin: 0 auto;
  /* background-color: #eee; */
  /* border: 3px dotted rgba(0, 0, 0, 0.1); */
}

.form-signin-heading {
  text-align: center;
  margin-bottom: 30px;
}

/* .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
} */

input[type="text"] {
  margin-bottom: 0px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

input[type="password"] {
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>