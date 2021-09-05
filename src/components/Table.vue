<template>
  <div>
    <div class="header">
      <form class="form">
        <input name="email" v-model="email" type="text" placeholder="search by email">
        <select v-model="ext">
          <option value="" :selected="true">Choose provider</option>
          <option v-for="provider in providers" :key="provider.provider">{{ provider.provider }}</option>
        </select>
        <select v-model="page">
          <option value="" :selected="true">Select page</option>
          <option v-for="pg in pages" :key="pg">{{ pg }}</option>
        </select>
        <select v-model="perPage">
          <option value="1" :selected="true">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <button type="button" class="search" @click="triggerGetUsers('id')">search</button>
      </form>
    </div>
    <table>
      <tr>
        <th>ID
          <button type="button" @click="triggerGetUsers('id')">&varr;</button>
        </th>
        <th>Email
          <button @click="triggerGetUsers('email')">&#8597;</button>
        </th>
        <th>Created at
          <button @click="triggerGetUsers('created_at')">&#8597;</button>
        </th>
        <th>DELETE</th>
        <th>DOWNLOAD</th>
      </tr>
      <tr v-for="user in items" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.created_at }}</td>
        <td>
          <button type="button" @click="deleteUser(user.id)">delete</button>
        </td>
        <td><input type="checkbox" @click="triggerSelected(user.id)"></td>
      </tr>
      <tr v-if="items.length === 0">
        <td colspan="3">not found</td>
      </tr>
    </table>
    <button @click="download" :disabled="selected.length === 0">download</button>
  </div>
</template>

<script>
export default {
  name: 'table',
  data() {
    return {
      items: [],
      sortBy: 'email',
      sortDir: 'asc',
      filter: '',
      email: null,
      ext: "",
      providers: [],
      page: 1,
      perPage: 10,
      total: 0,
      selected: [],
      linkReady: false
    }
  },
  methods: {
    getUsers() {
      console.log(process.env.VUE_APP_API_URL)
      this.axios.get(process.env.VUE_APP_API_URL + 'read.php', {
        params: {
          sortDir: this.sortDir,
          sortBy: this.sortBy,
          filter: this.filter,
          email: this.email,
          ext: this.ext,
          page: this.page,
          perPage: this.perPage
        }
      }).then(resp => {
        this.items = resp.data.users.body;
        this.total = resp.data.users.itemCount;
        this.providers = resp.data.providers;
      })
    },
    triggerGetUsers(nSortBy) {
      this.sortBy = nSortBy;

      if (this.sortDir === 'asc') {
        this.sortDir = 'desc';
      } else {
        this.sortDir = 'asc'
      }

      this.getUsers();
    },
    deleteUser(id) {
      this.axios.post(process.env.VUE_APP_API_URL + 'delete.php', {
        id: id
      }).then(resp => {
        console.log(resp)
        this.triggerGetUsers()
      })
    },
    download() {
      this.axios.post(process.env.VUE_APP_API_URL + 'download.php', {
        ids: this.selected
      }).then(resp => {
        let link = document.createElement('a');
        link.href = process.env.VUE_APP_API_URL + resp.data.filename;
        link.download = resp.data.filename;
        link.click();
      })
    },
    triggerSelected(id) {
      if (!this.selected.includes(id)) {
        this.selected.push(id);
      } else {
        const index = this.selected.indexOf(id);
        if (index > -1) {
          this.selected.splice(index, 1);
        }
      }
    }
  },
  mounted() {
    this.getUsers();
  },
  computed: {
    pages: function () {
      console.log(this.total, this.perPage)
      return Math.ceil(this.total / this.perPage);
    }
  }
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.header {
  margin-top: 50px;
  margin-left: 50px;
  margin-bottom: 50px;
}

.form {
  display: flex;
  justify-content: space-between;
  width: 700px;
}
</style>