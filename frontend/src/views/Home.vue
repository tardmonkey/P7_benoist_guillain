<template>
  <div class="homepage__onLoad"></div>
  <Nav />
  <!-- home page -->
  <div class="homepage__container">
    <div class="homepage__wrapper">
      <!-- create post component -->
      <Post-create
        @reloadOnClick="refreshPosts"
        :loggedUsername="loggedUsername"
        :loggedFirstname="loggedFirstname"
        v-on:postUpdated="handlePostUpdated"
      />
      <!-- create post component -->

      <!-- Post component -->
      <div class="post__wrapper">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        class="post__container profile__contentContainer--animation"
        v-on:postUpdated="handlePostUpdated"
      />
      </div>
      <!-- Post component -->
    </div>
  </div>
  <!-- home page -->
  <div class="responsiveSpacer"></div>
</template>

<script>
// => Plugins
import axios from "axios";

// => Components
import Nav from "@/components/Nav";
import Post from "@/components/Post";
import PostCreate from "@/components/Post-create";

export default {
  data() {
    const loggedUser = localStorage.getItem("userId");
    const loggedUsername = localStorage.getItem("username");

    const splittedUser = loggedUsername.split(" ");
    const loggedFirstname = splittedUser[0];

    return {
      posts: [],
      errors: [],
      loggedUser: loggedUser,
      loggedUsername: loggedUsername,
      loggedFirstname: loggedFirstname,
    };
  },
  components: {
    Nav,
    Post,
    PostCreate,
  },
  methods: {
    handlePostUpdated: async function() {
      console.log("handle post updated");

      await this.loadPosts();
    },
    loadPosts: async function() {
      const API_SERVER = "http://localhost:3000";

      try {
        const response = await axios.get(API_SERVER + `/posts`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.posts = response.data;
      } catch (error) {
        this.errors.push(error);
      }
    },
  },
  async mounted() {
    await this.loadPosts();
  },
};
</script>

<style  lang="scss">

@import "../variables.scss";

.homepage__onLoad {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 9999;
  animation: slidesIn 1s forwards ease-in-out;
}
@keyframes slidesIn {
  0% {
    visibility: visible;
    background: black;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 3;
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

.homepage__container {
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:0;
  margin:0;
}
.homepage__wrapper {
  width: 50vw;
}


.post__wrapper{
  
}

.post__container {
  background: $white;
  border-radius: 20px;
  box-shadow: 5px 5px 16px 0 rgba(0, 0, 0, 0.15),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.1);
  margin-top: $spaceMed;
}
.post__container:first-child {
  margin-top: 0px;
}

.profile__contentContainer--animation {
  opacity: 0;
  animation: blendIn 0.3s forwards cubic-bezier(0.77, 0, 0.18, 1);
  animation-delay: 0.5s;
  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: $i * 0.1s;
    }
  }
}

//Animation des cartes de commentaires
@keyframes blendIn {
  0% {
    transform: translateY(500px);
    opacity: 0;
  }
  
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}



@media (max-width: 800px) {
  .homepage__container {
    margin: 0px 0px 0px 0px;
  }

  .homepage__wrapper {
    width: 100vw;
  }

  .post__container {
    border-radius: 0px;
    box-shadow: none;
    border-top: 5px solid $light;
    margin-top: 0px;
  }

  .responsiveSpacer {
    display: block;
    width: 100vw;
    background: $white;
    height: calc(60px + 20px);
  }
}
</style>
