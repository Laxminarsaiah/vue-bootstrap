<template>
  <div class="container">
    <form method="POST" name="Login_Form" class="form-signin" @submit="login">
      <h3 class="form-signin-heading">Login</h3>
      <br />
      <input
        type="text"
        v-model="logindata.username"
        class="form-control"
        name="Username"
        placeholder="Username"
        required
        autofocus
      />
      <br />
      <input
        type="password"
        v-model="logindata.password"
        class="form-control"
        name="Password"
        placeholder="Password"
        required
      />
      <br />
      <button
        class="btn btn-md btn-primary btn-block"
        name="Submit"
        value="Login"
        type="Submit"
      >Login</button>
    </form>
    <a>
      <center>
        <p>
          Not regisstered?
          <span class>
            <router-link v-bind:to="'/register'">Create an account</router-link>
          </span>
        </p>
      </center>
    </a>
  </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
export default {
  name: "login",
  data() {
    return {
      logindata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      var indata = {
        username: this.logindata.username,
        password: this.logindata.password
      };
      UserDataService.login(indata)
        .then(data => {
          if (data.data.status == "OK") {
            window.location.href = "/listuser";
          } else {
            alert("Invalid username/password");
            window.location.href = "/";
          }
        })
        .catch(err => {
          alert("Invalid username/password");
          window.location.href = "/";
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
  padding: 30px 38px 66px;
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

/* input[type="text"] {
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