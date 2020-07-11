<template>
  <div id="app" class="bg-gray-100 mx-auto w-full bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
    <form>
      <div class="md:w-1/2 px-3 mb-6 md:mb-0">
        <div>
          <label
            for="field1"
            class="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >Field 1</label>
        </div>
        <div>
          <input
            type="text"
            id="field1"
            v-model="newWebsite.data1"
            class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
            @change="sendData()"
          />
        </div>
        <div>
          <label
            for="field2"
            class="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >Field 2</label>
        </div>
        <div>
          <input type="text" id="field2"
          class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
          v-model="newWebsite.data2" @change="sendData()" />
        </div>
        <div>
          <label
            for="field3"
            class="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >Field 3</label>
        </div>
        <div>
          <input type="text" id="field3"
          class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
          v-model="newWebsite.data3" @change="sendData()" />
        </div>
        <div>
          <label
            for="field4"
            class="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >Field 4</label>
        </div>
        <div>
          <input type="text" id="field4"
          class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
          v-model="newWebsite.data4" @change="sendData()" />
        </div>
        <div>
          <label
            for="field5"
            class="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >Field 5</label>
        </div>
        <div>
          <input type="text" id="field5"
          class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
          v-model="newWebsite.data5" @change="sendData()" />
          <input type="hidden" v-model="newWebsite.uniqueId" />
        </div>
        <label
            class="uppercase tracking-wide text-black text-xs font-bold mb-2"
          >Advance</label>
        <div class="healthbar">
        <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="styleBarUser"
        >{{ advance }}%</div>
        </div>
      </div>
        
    </form>
    
  </div>
</template>

<script>
import Firebase from "firebase";
import config from "./config";
let app = Firebase.initializeApp(config);
let db = app.database();
let postdata = db.ref("posts");

export default {
  name: "App",
  firebase: function() {
    return {
      websites: postdata
    };
  },
  computed: {
    styleBarUser: function() {
      return {
        width: this.advance + "%"
      };
    }
  },
  data() {
    return {
      datas: [],
      newWebsite: {
        data1: "",
        data2: "",
        data3: "",
        data4: "",
        data5: "",
        uniqueId: ""
      },
      first: 1,
      fireKey: "",
      uniqueId: "",
      advance: 0
    };
  },
  methods: {
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    sendData() {
      console.log(this.newWebsite);
      this.checkTotal();
      if (this.first == 1) {
        this.newWebsite.uniqueId = this.makeid(25);
        this.fireKey = postdata.push(this.newWebsite).getKey();
        this.first = 0;
      } else {
        let updateweb = { ...this.newWebsite };
        delete updateweb[".key"];
        let updates = {};
        updates["/posts/" + this.newWebsite.uniqueId] = updateweb;
        db.ref("posts/" + this.uniqueId).set(updateweb);
      }
    },
    checkTotal() {
      this.advance = 0;
      this.advance += this.newWebsite.data1 == "" ? 0 : 20;
      this.advance += this.newWebsite.data2 == "" ? 0 : 20;
      this.advance += this.newWebsite.data3 == "" ? 0 : 20;
      this.advance += this.newWebsite.data4 == "" ? 0 : 20;
      this.advance += this.newWebsite.data5 == "" ? 0 : 20;
    }
  },
  created() {
    //this.$bindAsArray('datas', postdata);
  }
};
</script>

<style>
#app {
}
</style>
