<template>
  <div>
    <h1>Posts</h1>
    <input
      type="text"
      v-model="title"
      class="title-input"
      placeholder="Title"
    />
    <input type="text"
      v-model="body"
      class="body-input"
      placeholder="Body"
    />
    <button v-if="isEditing" @click="updatePost">Update</button>
    <button v-if="isEditing" @click="cancelEdit">Cancel</button>
    <button v-else @click="createPost">Create</button>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <button @click="editPost(post.id)">Edit</button>
      <button @click="deletePost(post.id)">Delete</button>
    </div>
  </div>
</template>

<script setup >
  import { ref, onMounted } from 'vue'
  const API_URL = '/posts'
  const title = ref('')
  const body = ref('')
  const post_id = ref(0)
  const isEditing = ref(false)
  const posts = ref([])
  
  onMounted(async() => {
    const response = await fetch(API_URL)
    posts.value = await response.json()
  })
  const createPost = async() => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value
      })
    })
    const data = await response.json()
    posts.value.push(data)
    title.value = ''
    body.value = ''
  }


  const editPost = (postId) => {
    const post = posts.value.find(p => p.id == postId)
    title.value = post.title
    body.value = post.body
    post_id.value = post.id
    isEditing.value = true
  }
  const deletePost = async(id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    posts.value = posts.value.filter(post => post.id !== id)
  }
  const updatePost = async() => {
    const response = await fetch(
      `${API_URL}/${post_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title.value,
          body: body.value
        })
      }
    )
    const data = await response.json()
    console.log(data)
    const index = posts.value.findIndex(post => post.id == data.id)
    posts.value[index] = data
      title.value = ''
    body.value = ''
    isEditing.value = false
  }
  const cancelEdit = () => {
    title.value = ''
    body.value = ''
    isEditing.value = false
  }

</script>

<style scoped>
.title-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  background-color: #f8f8f8;
  color: #111;
  border-radius: 4px;
  resize: vertical;
}
.body-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  background-color: #f8f8f8;
  color: #111;
  border-radius: 4px;
  resize: vertical;
}
</style>
