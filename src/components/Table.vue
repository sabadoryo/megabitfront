<template>
  <div>
    <div class="header">
      <form class="form">
        <input name="email" v-model="email" type="text" placeholder="search by email">
        <select v-model="ext">
          <option value="" :selected="true">Choose provider</option>
          <option v-for="provider in providers" :key="provider.provider">{{provider.provider}}</option>
        </select>
        <select v-model="page">
          <option value="" :selected="true">Select page</option>
          <option v-for="pg in pages" :key="pg">{{pg}}</option>
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
      </tr>
      <tr v-for="user in items" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.created_at }}</td>
      </tr>
      <tr v-if="items.length === 0">
        <td colspan="3">not found</td>
      </tr>
    </table>
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
      total: 0
    }
  },
  methods: {
    getUsers() {
      this.axios.get('http://yernar-abilbay.magebithr.com/api/read.php', {
        params: {
          sortDir: this.sortDir,
          sortBy: this.sortBy,
          filter: this.filter,
          email: this.email,
          ext : this.ext,
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
    }
  },
  mounted() {
    this.getUsers();
  },
  computed: {
    pages : function() {
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