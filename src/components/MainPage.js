const faker = require('faker');


function FakeContacts() {
  let arrContacts = [];
  for(let i = 0; i < 500; i++) {
    let fakeContact = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(1),
      company: faker.random.word(),
    };

    arrContacts = [...arrContacts, fakeContact];
  }

  return arrContacts;
};

let contacts = FakeContacts();

export default {
  data() {
    return {
      dialog: false,
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'E-mail',
          align: 'left',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Phone',
          align: 'left',
          sortable: false,
          value: 'phone',
        },
        {
          text: 'Company',
          align: 'left',
          sortable: false,
          value: 'company',
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
        },
      ],
      contacts: contacts,
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        phone: '',
        company: '',
      },
      defaultItem: {
        name: '',
        email: '',
        phone: '',
        company: '',
      },
    };
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },

    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.contacts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.contacts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.contacts.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.contacts[this.editedIndex], this.editedItem)
      } else {
        this.contacts.push(this.editedItem)
      }
      this.close()
    },
  },
};
