<template>
  <div class="container">
    <div class="row"></div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class>
          <form class="form-signin" method="POST">
            <h3 class="form-signin-heading">Registration Form</h3>
            <input
              type="text"
              v-model="user.username"
              name="username"
              id="username"
              class="form-control"
              placeholder="Username"
              required
              autofocus
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
            <input
              type="password"
              v-model="user.password"
              name="password"
              id="password"
              class="form-control"
              placeholder="Password"
              required
              autofocus
            />
            <br />
            <button
              class="btn btn-md btn-primary btn-block btn-signin"
              type="button"
              @click="saveUser"
            >Register</button>
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
  name: "register",
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
    checkUser(username) {
      return UserDataService.findByName(username);
    },

    createUser() {
      var indata = {
        username: this.user.username,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone,
        password: this.user.password
      };
      return UserDataService.createUser(indata);
    },
    async saveUser() {
      const response = await this.checkUser(this.user.username);
      if (response.data[0]) {
        alert(`User  with [${this.user.username}] is already exists!!!`);
        return;
      } else {
        const saveresp = await this.createUser();
        if (saveresp) {
          alert("User has been created successfully.");
          window.location.href = "/listuser";
        }
      }
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
}

input[type="text"] {
  margin-bottom: 0px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

input[type="password"] {
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
} */
</style>