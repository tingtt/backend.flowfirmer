var users = [
    {
      user: "test",
      pwd: "test",
      roles: [
        {
          role: "dbOwner",
          db: "test"
        }
      ]
    }
  ];
  
  for (var i = 0, length = users.length; i < length; ++i) {
    db.createUser(users[i]);
  }

  //mongo test -u test -p test