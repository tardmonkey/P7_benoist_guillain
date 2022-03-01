<template>
  <div class="homepage__onLoad"></div>

  <!-- nav -->
  <div class="profilepage__nav__container">
    <div class="profilepage__nav__wrapper">
      <div class="profilepage__nav--icon">
        <router-link to="/home" class=""
          ><svg
            class="nav__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="8.4667mm"
            height="8.4667mm"
            viewBox="0 0 24 24"
          >
            <path
              d="M15,20.67a.7467.7467,0,0,1-.53-.22L7.95,13.93a2.7349,2.7349,0,0,1,0-3.86l6.52-6.52A.75.75,0,1,1,15.53,4.61L9.01,11.13a1.2354,1.2354,0,0,0,0,1.7393L15.53,19.39A.75.75,0,0,1,15,20.67Z"
            />
          </svg>
        </router-link>
      </div>
      <input
        v-model="searchText"
        class="searchUser"
        placeholder="Chercher un utilisateur"
      />
    </div>
  </div>
  <!-- nav -->

  <div class="homepage__container">
    <div class="user__profileContainer">
      <div v-for="user in itemsSearched" :key="user.id" class="user__profile">
        <router-link :to="{ name: 'Profile', params: { id: user.id } }">
          <div class="user__pictureContainer">
            <img :src="user.picture" class="user__picture" alt="photo de profil" />
            <div class="user__username">{{ user.username }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// => Plugins
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      searchText: "",
    };
  },
  components: {},
  computed: {
    itemsSearched: function() {
      var self = this;
      if (this.searchText == "") {
        return this.users;
      }
      return this.users.filter(function(user) {
        return user.username.toLowerCase().indexOf(self.searchText) >= 0;
      });
    },
  },
  methods: {
    loadUsers: async function() {
      const API_SERVER = "http://localhost:3000";

      try {
        const response = await axios.get(API_SERVER + `/users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.users = response.data;
        console.log(this.users);
      } catch (error) {
        this.errors.push(error);
      }
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style scoped lang="scss">

@import "../variables.scss";

.homepage__onLoad {
  position: fixed;
  width: 100%;
  height: 100%;
  background: $greenLight;
  z-index: 9999;
  animation: slidesIn 1s forwards ease-in-out;
}
@keyframes slidesIn {
  0% {
    visibility: visible;
    background: $greenLight;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 9999999;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }

  99% {
    opacity: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    background: $greenLight;
  }
  100% {
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    overflow-x: hidden;
    overflow-y: visible;
    background: $greenLight;
  }
}

/* NAV */
.profilepage__nav__container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.profilepage__nav__wrapper {
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profilepage__nav--icon {
  transition: opacity 0.2s ease-in-out;
}

.nav__icon {
  fill: $light;
  height: 30px;
}

.profilepage__nav--icon:hover {
  opacity: 0.75;
}

.searchUser {
  min-width: 100px;
  height: 40px;
  background: $light;
  font-weight: 600;
  color: $greenLight;
  font-size: $body-firstFont;
  border: none;
  border-radius: 25px;
  padding: 16px;
}

.searchUser::placeholder {
  font-weight: 500;
  color: $darkgrey;
  opacity: 0.5;
}

.searchUser:focus {
  opacity: 1;
}

.homepage__container {
  width: 100vw;
  min-height: 100vh;
  background: $greenLight;
  padding-top: 100px;
}

.user__profileContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  
}

.user__profile,
.user__pictureContainer {
  overflow:hidden;


}

.user__profile {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: opacity 0.3s ease-in-out;
  border-radius:1rem;
}

.user__profile:hover {
}

.user__pictureContainer {
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in;
  
  
}

.user__picture {
  width: 30vw;
  height: 30vh;
  object-fit:cover;
}
.user__pictureContainer:hover {
  img{
    filter: brightness(1.2)
  }
  
  .user__username{
    color:red;
    transform:scale(1.5);

  }
  
}

.user__username {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: $firstFont;
  font-weight: 600;
  color: $light;
  margin-bottom: $spaceMed;
  margin-left: $spaceMed;
  z-index: 1000;
  transition: all 0.2s ease-in;
  color:black;
}

@media (max-width: 541px) {
}
</style>
