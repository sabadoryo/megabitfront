<template>
  <div class="hello">
    <router-link class="table1" to="/table">table</router-link>
    <div class="div1">
      <div class="header">
        <div class="logoh">
          <img alt="logo" src="../assets/Union.png" class="logo">
          <img class="logotitle" alt="logo-title" src="../assets/pineapple..png">
        </div>
        <div class="header-list">
          <ul class="header-ul">
            <li>
              <a class="link" href="#">About</a>
            </li>
            <li>
              <a class="link" href="#">
                How it works
              </a>
            </li>
            <li>
              <a class="link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="responsive-outer">
        <div class="responsive-inner">
          <div class="main">
            <img alt="cup" src="../assets/cup.png" v-if="success">
            <h3 class="main-text">{{ mainText }}</h3>
            <p class="main-content">{{ mainContent }}</p>
          </div>
          <form class="form" v-if="!success">
            <input type="text" v-model="email" v-on:keyup="validateEmail" name="email"
                   placeholder="Type your email address here…"
                   class="form-input">

            <button type="button"  class="submit-button" @click="submit" :disabled="error">
              <svg class="submit-icon" width="24" height="14" viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3"
                      d="M17.7071 0.2929C17.3166 -0.0976334 16.6834 -0.0976334 16.2929 0.2929C15.9023 0.683403 15.9023 1.31658 16.2929 1.70708L20.5858 5.99999H1C0.447693 5.99999 0 6.44772 0 6.99999C0 7.55227 0.447693 7.99999 1 7.99999H20.5858L16.2929 12.2929C15.9023 12.6834 15.9023 13.3166 16.2929 13.7071C16.6834 14.0976 17.3166 14.0976 17.7071 13.7071L23.7071 7.70708C24.0977 7.31658 24.0977 6.6834 23.7071 6.2929L17.7071 0.2929Z"/>
              </svg>
            </button>
            <div class="error-message" v-if="error">
              {{ errorMessage }}
            </div>
            <br>
            <input type="checkbox" name="termsAgreed" class="checkbox" v-model="termsAgreed" @click="error = false">
            <label class="checkbox-label">I agree to <a class="link-terms" href="#">terms of service</a></label>
          </form>
          <div class="line-break">
          </div>
          <div class="footer">
            <ul class="footer-list">
              <li>
                <img alt="facebook" src="../assets/fb.png">
              </li>
              <li>
                <img alt="facebook" src="../assets/ic.png">
              </li>
              <li>
                <img alt="facebook" src="../assets/tw.png">
              </li>
              <li>
                <img alt="facebook" src="../assets/yt.png">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="div2">
      <img alt="background" class="background" src="../assets/image_summer.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      email: "",
      mainText: "Subscribe to newsletter",
      mainContent: "Subscribe to our newsletter and get 10% discount on pineapple glasses.",
      success: false,
      isValid: false,
      error: false,
      errorMessage: "Input is empty!",
      termsAgreed: false,
    }
  },
  methods: {
    submit() {
      if (!this.isValid) {
        this.error = true;
        this.errorMessage = "Email address is required"
        return;
      }

      if (!this.termsAgreed) {
        this.error = true;
        this.errorMessage = "You must accept the terms and conditions"
        return;
      }

      let length = this.email.length;
      if (this.email.substring(length - 3, length) === '.co') {
        this.error = true;
        this.errorMessage = "We are not accepting subscriptions from Colombia emails."
        return;
      }

      this.axios.post('http://yernar-abilbay.magebithr.com/create.php', {
        email: this.email,
        termsAgreed: this.termsAgreed
      }).then(resp => {
        if (resp.data.status === 201) {
          this.success = true;
          this.mainText = "Thanks for subscribing!";
          this.mainContent = "You have successfully subscribed to our email listing. Check your email for the discount code.";
          console.log(resp.data)
        } else {
          this.success = false;
          this.error = true;
          this.errorMessage = resp.data.message;
        }
      })
    },
    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(re.test(this.email));
      if (!re.test(String(this.email).toLowerCase())) {
        this.error = true;
        this.errorMessage = "Please provide valid email address!"
      } else {
        this.error = false;
        this.isValid = true;
        this.errorMessage = "";
      }
    }
  }
}
</script>

<style scoped>
.hello {
  /*  height: 100vh;*/
  overflow: hidden;
}

.div1 {
  width: 680px;
  z-index: 1;
  background: linear-gradient(180deg, #FFFFFF 0%, #F2F5FA 100%);
}

.hello {
  display: flex;
}

.header {
  margin-top: 120px;
  display: flex;
  align-items: center;
}

.logo {
  width: 25px;
  height: 40px;
  margin-left: 100px;
  margin-bottom: 10px;
}

.logoh {
  display: flex;
  align-items: center;
}

.logotitle {
  margin-left: 15px;
  width: 78px;
  font-size: 16px;
  color: #131821;
}

.header-ul {
  list-style-type: none;
  display: flex;
  gap: 30px;
  margin-left: 113px;
}

.link {
  text-decoration: none;
  color: #6A707B;
  font-size: 16px;
  line-height: 26px;
  font-family: Arial sans-serif serif;
}

.main {
  margin-top: 131px;
  margin-left: 140px;
  justify-content: start;
}

.main-text {
  font-family: Georgia sans-serif;
  font-weight: 400;
  font-size: 32px;
  margin-top: 32px;
  line-height: 44px;
}

.main-content {
  margin-top: 15px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #6A707B;
  width: 400px;
}

.form {
  margin-top: 50px;
  margin-left: 100px;
}

.form-input {
  width: 663px;
  height: 70px;
  left: 100px;
  top: 539px;

  background: #FFFFFF;
  border: 1px solid #E3E3E4;
  box-sizing: border-box;
  border-left: 4px solid #4066A5;
  outline: none;
  padding-left: 44px;
}

::placeholder {
  font-family: Arial serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #6A707B;
}

.submit-button {
  position: absolute;
  top: 495px;
  left: 710px;
}

.form-input:hover {
  box-shadow: 0px 30px 40px rgba(19, 24, 33, 0.06);
  border: 1px solid #4066A5;
  border-left: 4px solid #4066A5;
}

.submit-button {
  padding: 0;
  border: none;
  background: none;
  fill: #131821;
}

.form-input:hover ~ .submit-button {
  fill: #3800ff;
  opacity: 10;
}

.error-message {
  margin-left: 42px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  color: red;
  margin-top: 12px;
  font-size: 12px;
}

.checkbox {
  width: 14px;
  height: 11px;
  margin-left: 42px;
  margin-top: 41px;
  background: #4066A5;
  border-radius: 3px;
}

.checkbox-label {
  margin-left: 15px;
  font-family: Arial;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: #6A707B;
}

/*.submit-button:hover .submit-icon{*/
/*  fill: #4066A5;*/
/*}*/
.link-terms {
  color: #131821;
}

.line-break {
  width: 400px;
  height: 1px;

  margin-top: 50px;
  margin-left: 140px;

  background: #E3E3E4;
}

.footer {
  margin-top: 50px;
  margin-left: 218px;
}

.footer-list {
  list-style-type: none;
  display: flex;
  gap: 20px;
}

.footer-list li {
  width: 46px;
  height: 46px;

  border: 2px solid #E3E3E4;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

button[disabled]{
  cursor: not-allowed;
}

@media only screen and (max-width: 1200px) {
  .div1 {
    width: 500px;
    z-index: 1;
    background: linear-gradient(180deg, #FFFFFF 0%, #F2F5FA 100%);
  }

  .header {
    margin-top: 120px;
    display: flex;
    align-items: center;
  }

  .logo {
    width: 15px;
    height: 30px;
    margin-left: 40px;
    margin-bottom: 10px;
  }

  .logoh {
    display: flex;
    align-items: center;
  }

  .logotitle {
    margin-left: 15px;
    width: 68px;
    font-size: 12px;
    color: #131821;
  }

  .header-ul {
    list-style-type: none;
    display: flex;
    gap: 30px;
    margin-left: 50px;
  }

  .link {
    text-decoration: none;
    color: #6A707B;
    font-size: 16px;
    line-height: 26px;
    font-family: Arial sans-serif serif;
  }

  .main {
    margin-top: 131px;
    margin-left: 50px;
    justify-content: start;
  }

  .main-text {
    font-family: Georgia sans-serif;
    font-weight: 400;
    font-size: 28px;
    margin-top: 32px;
    line-height: 40px;
  }

  .main-content {
    margin-top: 15px;
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    color: #6A707B;
    width: 400px;
  }

  .form {
    margin-top: 50px;
    margin-left: 50px;
  }

  .form-input {
    width: 550px;
    height: 70px;
    left: 50px;
    top: 539px;

    background: #FFFFFF;
    border: 1px solid #E3E3E4;
    box-sizing: border-box;
    border-left: 4px solid #4066A5;
    outline: none;
    padding-left: 44px;
  }

  ::placeholder {
    font-family: Arial serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #6A707B;
  }

  .submit-button {
    position: absolute;
    top: 480px;
    left: 549px;
  }

  .form-input:hover {
    box-shadow: 0px 30px 40px rgba(19, 24, 33, 0.06);
    border: 1px solid #4066A5;
    border-left: 4px solid #4066A5;
  }

  .submit-button {
    fill: #131821;
  }

  .form-input:hover ~ .submit-button {
    fill: #3800ff;
    opacity: 10;
  }

  .checkbox {
    width: 14px;
    height: 11px;
    margin-left: 5px;
    margin-top: 53px;
    background: #4066A5;
    border-radius: 3px;
  }

  .checkbox-label {
    margin-left: 15px;
    font-family: Arial;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #6A707B;
  }

  /*.submit-button:hover .submit-icon{*/
  /*  fill: #4066A5;*/
  /*}*/
  .link-terms {
    color: #131821;
  }

  .line-break {
    width: 400px;
    height: 1px;

    margin-top: 50px;
    margin-left: 50px;

    background: #E3E3E4;
  }

  .footer {
    margin-top: 50px;
    margin-left: 120px;
  }

  .footer-list {
    list-style-type: none;
    display: flex;
    gap: 20px;
  }

  .footer-list li {
    width: 46px;
    height: 46px;

    border: 2px solid #E3E3E4;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media only screen and (max-width: 600px) {
  .div1 {
    width: 300px;
    z-index: 1;
    background: linear-gradient(180deg, #FFFFFF 0%, #F2F5FA 100%);
  }

  .header {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }

  .logo {
    width: 10px;
    height: 20px;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .logoh {
    display: flex;
    align-items: center;
  }

  .logotitle {
    margin-left: 10px;
    width: 45px;
    font-size: 6px;
    color: #131821;
  }

  .header-ul {
    list-style-type: none;
    display: flex;
    gap: 20px;
    margin-left: 50px;
  }

  .link {
    text-decoration: none;
    color: #6A707B;
    font-size: 10px;
    line-height: 20px;
    font-family: Arial sans-serif serif;
  }

  .main {
    margin-top: 100px;
    margin-left: 25px;
    justify-content: start;
  }

  .main-text {
    font-family: Georgia sans-serif;
    font-weight: 800;
    font-size: 20px;
    margin-top: 32px;
    line-height: 40px;
  }

  .main-content {
    margin-top: 15px;
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px;
    color: #6A707B;
    width: 200px;
  }

  .form {
    margin-top: 50px;
    margin-left: 25px;
  }

  .form-input {
    width: 350px;
    height: 40px;
    left: 50px;
    top: 539px;

    background: #FFFFFF;
    border: 1px solid #E3E3E4;
    box-sizing: border-box;
    border-left: 4px solid #4066A5;
    outline: none;
    padding-left: 44px;
  }

  ::placeholder {
    font-family: Arial serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    color: #6A707B;
  }

  .submit-button {
    position: absolute;
    top: 298px;
    left: 325px;
  }

  .form-input:hover {
    box-shadow: 0px 30px 40px rgba(19, 24, 33, 0.06);
    border: 1px solid #4066A5;
    border-left: 4px solid #4066A5;
  }

  .submit-button {
    fill: #131821;
  }

  .form-input:hover ~ .submit-button {
    fill: #3800ff;
    opacity: 10;
  }

  .checkbox {
    width: 14px;
    height: 11px;
    margin-left: 5px;
    margin-top: 25px;
    background: #4066A5;
    border-radius: 3px;
  }

  .checkbox-label {
    margin-left: 15px;
    font-family: Arial;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #6A707B;
  }

  /*.submit-button:hover .submit-icon{*/
  /*  fill: #4066A5;*/
  /*}*/
  .link-terms {
    color: #131821;
  }

  .line-break {
    width: 200px;
    height: 1px;

    margin-top: 30px;
    margin-left: 50px;

    background: #E3E3E4;
  }

  .footer {
    margin-top: 50px;
    margin-left: 70px;
  }

  .footer-list {
    list-style-type: none;
    display: flex;
    gap: 10px;
  }

  .footer-list li {
    width: 30px;
    height: 32px;

    border: 1px solid #E3E3E4;
    border-radius: 40%;
    -moz-border-radius: 40%;
    -webkit-border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.background {
  height: 100vh;
}

@media only screen and (max-width: 375px) {
  .div1 {
    width: 100vh;
    z-index: 1;
  }

  .div2 {
    display: none;
  }

  .header {
    margin-top: 10px;
    display: flex;
    align-items: center;
    background: #FFFFFF;
  }

  .logo {
    width: 24px;
    height: 40px;
    margin-left: 20px;
    margin-bottom: 10px;
    padding: 0 0 0 0;
  }

  .logoh {
    display: flex;
    align-items: center;
  }

  .logotitle {
    display: none;
  }

  .header-ul {
    padding: 0 0 0 0;
    list-style-type: none;
    display: flex;
    gap: 20px;
    margin-left: 104px;
  }

  .link {
    text-decoration: none;
    color: #6A707B;
    font-size: 14px;
    line-height: 24px;
    font-family: Arial sans-serif serif;
  }

  .main {
    margin-top: 188px;
    margin-left: 20px;
    justify-content: start;
  }

  .main-text {
    font-family: Georgia;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    margin-top: 20px;
    padding-top: 20px;
    line-height: 34px;
  }

  .main-content {
    margin-top: 10px;
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 26px;
    color: #6A707B;
    width: 295px;
  }

  .form {
    margin-top: 20px;
    margin-left: 20px;
  }

  .form-input {
    width: 295px;
    height: 60px;
    left: 40px;
    top: 400px;

    background: #FFFFFF;
    border: 1px solid #E3E3E4;
    box-sizing: border-box;
    border-left: 4px solid #4066A5;
    outline: none;
    padding-left: 19px;
  }

  ::placeholder {
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #6A707B;
  }

  .submit-button {
    position: absolute;
    top: 350px;
    left: 295px;
  }

  .form-input:hover {
    box-shadow: 0px 30px 40px rgba(19, 24, 33, 0.06);
    border: 1px solid #4066A5;
    border-left: 4px solid #4066A5;
  }

  .submit-button {
    fill: #131821;
  }

  .form-input:hover ~ .submit-button {
    fill: #3800ff;
    opacity: 10;
  }

  .checkbox {
    width: 14px;
    height: 11px;
    margin-left: 5px;
    margin-top: 35px;
    background: #4066A5;
    border-radius: 3px;
  }

  .checkbox-label {
    margin-left: 15px;
    font-family: Arial;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #6A707B;
  }

  /*.submit-button:hover .submit-icon{*/
  /*  fill: #4066A5;*/
  /*}*/
  .link-terms {
    color: #131821;
  }

  .line-break {
    width: 295px;
    height: 1px;

    margin-top: 20px;
    margin-left: 20px;

    background: #E3E3E4;
  }

  .footer {
    margin-top: 20px;
    margin-left: 53px;
  }

  .footer-list {
    list-style-type: none;
    display: flex;
    gap: 10px;
  }

  .footer-list li {
    width: 46px;
    height: 46px;

    border: 1px solid #E3E3E4;
    border-radius: 40%;
    -moz-border-radius: 40%;
    -webkit-border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .responsive-outer {
    position: absolute;
    background: url("../assets/image_summer.png") no-repeat;
    height: 100vh;
  }

  .responsive-inner {
    background: linear-gradient(180deg, #FFFFFF 0%, #F2F5FA 100%);
    width: 335px;
    height: 371px;
    margin-left: 20px;
    margin-right: 20px;
  }
}

</style>
