<template>
  <div class="home">
    <div class="container d-flex justify-center align-center">
      <v-row>
        <v-col
          class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3"
        >
          <v-card
            dark
            color="#1a1c20"
            :style="
              $vuetify.breakpoint.width > 600
                ? 'padding: 70px 100px;'
                : 'padding: 60px 30px;'
            "
            class="wrapper d-flex justify-center flex-column align-center"
            rounded="xl"
          >
            <v-card-title class="title align-center flex-column">
              <h2 v-if="$vuetify.breakpoint.width > 960">
                Body Mass Index Calculator
              </h2>
              <h3 v-else-if="$vuetify.breakpoint.width > 600">
                Body Mass Index Calculator
              </h3>
              <h4 v-else>Body Mass Index Calculator</h4>
              <div class="text-center subtitle">
                <div class="nama">
                  <span>Muhammad Naufal Arkan Rafii</span>
                </div>
                <div class="nim">
                  <span>18/424193/PA/18298</span>
                </div>
              </div>
            </v-card-title>
            <v-card-text class="form">
              <div class="input-wrapper">
                <v-text-field
                  ref="height"
                  v-model="form_data.height"
                  min="1"
                  max="999"
                  onkeydown="javascript: return event.keyCode == 69 ? false : true"
                  :rules="rules.number"
                  type="number"
                  label="Height (cm)"
                ></v-text-field>
              </div>
              <div class="input-wrapper">
                <v-text-field
                  ref="weight"
                  v-model="form_data.weight"
                  min="1"
                  max="999"
                  onkeydown="javascript: return event.keyCode == 69 ? false : true"
                  :rules="rules.number"
                  type="number"
                  label="Weight (kg)"
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="findBMI" color="#cf7500" large class="button"
                >submit</v-btn
              >
            </v-card-actions>
            <v-expand-transition>
              <div class="result-wrapper" v-if="result">
                <hr class="hr" />
                <v-card-text class="text-center result">
                  <div class="result-title-wrapper">
                    <span class="result-title"
                      ><b><i>Your BMI is:</i></b></span
                    >
                  </div>
                  <div>
                    <span class="result-bmi"
                      >{{ result.bmi.toFixed(2) }} ({{ result.category }})</span
                    >
                  </div>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="loader" width="250px" persistent>
      <v-card rounded="xl" class="loader-card" color="#f4f4f4">
        <v-card-text>
          <v-row class="justify-center">
            <v-col class="col-12 text-center">
              <span class="headline">Please wait...</span>\
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

export default {
  data() {
    return {
      form_data: {
        height: "",
        weight: "",
      },
      result: null,
      rules: {
        number: [
          (v) => !!v || "Field is required",
          (v) =>
            (!isNaN(parseFloat(v)) && v >= 1 && v <= 999) ||
            "Value can't be less than 1 and more than 999",
        ],
      },
      loader: false,
    };
  },
  methods: {
    async findBMI() {
      this.loader = true;
      let notFoundInvalid = true;
      Object.keys(this.form).forEach((f) => {
        let inputValid = this.$refs[f].validate(true);
        if (!inputValid) {
          notFoundInvalid = false;
        }
      });
      if (notFoundInvalid) {
        let result;
        try {
          result = await axios.post("/calculate", {
            weight: Number(this.form_data.weight),
            height: Number(this.form_data.height),
          });
          this.result = result.data;
        } catch (error) {
          if (error.response.status == 400 || error.response.status == 403) {
            console.error(
              error.response.status + ": " + error.response.data.message
            );
          } else {
            console.error(error.message);
          }
          alert(error.message + ", please try to refresh the page!");
        }
      }
      this.loader = false;
    },
  },
  computed: {
    form() {
      return this.form_data;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  background: #f4f4f4;
}

.home .container {
  height: 100vh;
}

.wrapper {
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 2px 4px 30px 0px rgba(26, 28, 32, 0.3) !important;
}

.title {
  margin-bottom: 30px;
}

.subtitle span {
  font-size: 14px;
  font-weight: 300;
  line-height: 1;
}

.nim {
  margin-top: -10px;
}

.form {
  margin-bottom: 10px;
}

.button {
  padding: 16px 28px !important;
  font-size: 14px !important;
}

.hr {
  width: 80%;
  color: #f4f4f4;
  opacity: 0.3;
  margin-left: 10%;
}

.result-wrapper {
  width: 100%;
  margin-top: 30px;
}

.result-title-wrapper {
  margin-top: 0px;
  margin-bottom: 5px;
}

.result-title {
  font-size: 18px;
  color: #f4f4f4;
}

.loader-card {
  padding-top: 20px !important;
}

.loader-card span {
  color: #1a1c20;
}
</style>
